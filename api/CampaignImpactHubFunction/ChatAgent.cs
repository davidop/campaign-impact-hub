using Azure;
using Azure.AI.Agents.Persistent;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace CampaignImpactHubFunction
{
    public class ChatAgent
    {
        private readonly ILogger _logger;

        public ChatAgent(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<ChatAgent>();
        }

        private record ChatRequest(string? message, string? threadId);
        private record ChatResponse(string threadId, string? answer, string status, string? error);

        [Function("chat")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "chat")] HttpRequestData req)
        {
            var endpoint = Environment.GetEnvironmentVariable("AI_PROJECT_ENDPOINT");
            var agentId = Environment.GetEnvironmentVariable("AI_AGENT_ID");

            if (string.IsNullOrWhiteSpace(endpoint) || string.IsNullOrWhiteSpace(agentId))
            {
                var bad = req.CreateResponse(HttpStatusCode.InternalServerError);
                await bad.WriteStringAsync("Missing AI_PROJECT_ENDPOINT or AI_AGENT_ID configuration.");
                return bad;
            }

            ChatRequest? payload;
            try
            {
                payload = await JsonSerializer.DeserializeAsync<ChatRequest>(req.Body, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            catch
            {
                var bad = req.CreateResponse(HttpStatusCode.BadRequest);
                await bad.WriteStringAsync("Invalid JSON body.");
                return bad;
            }

            var userText = string.IsNullOrWhiteSpace(payload?.message) ? "Hi" : payload!.message!;
            var incomingThreadId = payload?.threadId;

            try
            {
                // Auth server-side (Managed Identity en Azure / az login en local)
                var projectEndpoint = new Uri(endpoint);
                var projectClient = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
                PersistentAgentsClient agentsClient = projectClient.GetPersistentAgentsClient();

                // Obtener agente
                PersistentAgent agent = agentsClient.Administration.GetAgent(agentId);

                // Reutilizar thread si te lo pasan; si no, crear uno nuevo
                PersistentAgentThread thread;
                if (!string.IsNullOrWhiteSpace(incomingThreadId))
                {
                    // Nota: el SDK puede variar; si tu versión no expone GetThread, crea siempre nuevo.
                    // Para compatibilidad máxima, intentamos crear nuevo si no hay soporte.
                    thread = agentsClient.Threads.GetThread(incomingThreadId);
                }
                else
                {
                    thread = agentsClient.Threads.CreateThread();
                }

                // Crear mensaje usuario
                agentsClient.Messages.CreateMessage(
                    thread.Id,
                    MessageRole.User,
                    userText);

                // Crear run
                ThreadRun run = agentsClient.Runs.CreateRun(thread.Id, agent.Id);

                // Poll hasta terminal
                do
                {
                    await Task.Delay(TimeSpan.FromMilliseconds(500));
                    run = agentsClient.Runs.GetRun(thread.Id, run.Id);
                }
                while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress);

                if (run.Status != RunStatus.Completed)
                {
                    var respFail = req.CreateResponse(HttpStatusCode.BadGateway);
                    await respFail.WriteAsJsonAsync(new ChatResponse(
                        thread.Id,
                        null,
                        run.Status.ToString(),
                        run.LastError?.Message ?? "Run did not complete"));
                    return respFail;
                }

                // Leer mensajes ASC y quedarnos con el último del assistant
                Pageable<PersistentThreadMessage> messages =
                    agentsClient.Messages.GetMessages(thread.Id, order: ListSortOrder.Ascending);

                string? lastAssistantText = null;

                foreach (var m in messages)
                {
                    if (m.Role != MessageRole.Agent) continue;

                    foreach (var content in m.ContentItems)
                    {
                        if (content is MessageTextContent textItem)
                        {
                            lastAssistantText = textItem.Text; // se va quedando el último
                        }
                    }
                }

                var ok = req.CreateResponse(HttpStatusCode.OK);
                await ok.WriteAsJsonAsync(new ChatResponse(thread.Id, lastAssistantText, run.Status.ToString(), null));
                return ok;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error running agent conversation");
                var err = req.CreateResponse(HttpStatusCode.InternalServerError);
                await err.WriteAsJsonAsync(new ChatResponse(incomingThreadId ?? "", null, "error", ex.Message));
                return err;
            }
        }
    }
}
