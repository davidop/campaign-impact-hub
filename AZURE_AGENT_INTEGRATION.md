# Azure AI Agent Integration

This integration connects the Foundry Workflow component to an Azure AI Agent using the `azure.ai.projects` Python SDK.

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Foundry        │      │  Python Backend  │      │  Azure AI       │
│  Workflow       │─────▶│  (Flask Server)  │─────▶│  Agent          │
│  (TypeScript)   │      │  Port 5001       │      │  (Cloud)        │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

## Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create or update your `.env` file:

```env
# Azure AI Agent Configuration
AZURE_AIPROJECT_ENDPOINT=https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter
AZURE_AGENT_ID=asst_nJy3ICZrtfnUcpcldqpiEBTQ
AZURE_AGENT_PORT=5001

# Frontend Configuration
VITE_USE_AZURE_AGENT=true
VITE_AZURE_AGENT_BACKEND=http://localhost:5001
```

### 3. Azure Authentication

The Python backend uses `DefaultAzureCredential` which supports multiple authentication methods:

**Option A: Azure CLI (Recommended for Development)**
```bash
az login
```

**Option B: Environment Variables**
```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
```

**Option C: Managed Identity (For Production)**
- Automatically works when deployed to Azure (App Service, Functions, etc.)

## Running the Integration

### Start the Python Backend

```bash
python3 azure_agent_server.py
```

You should see:
```
🚀 Starting Azure AI Agent Server on port 5001
   Endpoint: https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter
   Agent ID: asst_nJy3ICZrtfnUcpcldqpiEBTQ
✅ Connected to Azure AI Project: ...
```

### Start the Frontend

In a separate terminal:
```bash
npm run dev
```

### Using Azure Agent Mode

Set the environment variable to enable Azure Agent mode:
```bash
export VITE_USE_AZURE_AGENT=true
```

Or set it in your `.env` file and restart the frontend.

## API Endpoints

The Python backend provides the following endpoints:

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "azure_connected": true,
  "endpoint": "https://...",
  "agent_id": "asst_..."
}
```

### Create Thread
```
POST /api/azure-agent/thread/create
```

Response:
```json
{
  "thread_id": "thread_abc123",
  "created_at": "2024-01-01T12:00:00"
}
```

### Send Message
```
POST /api/azure-agent/message/send
{
  "thread_id": "thread_abc123",
  "content": "Hi Marketing Orchestrator"
}
```

Response:
```json
{
  "thread_id": "thread_abc123",
  "run_id": "run_xyz789",
  "run_status": "completed",
  "messages": [
    {
      "role": "user",
      "content": "Hi Marketing Orchestrator"
    },
    {
      "role": "assistant",
      "content": "Hello! How can I help..."
    }
  ]
}
```

### List Messages
```
POST /api/azure-agent/messages/list
{
  "thread_id": "thread_abc123"
}
```

## Code Example

The provided Python code from the problem statement has been integrated into `azure_agent_server.py`:

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder

project = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint="https://tenerife-winter-resource.services.ai.azure.com/api/projects/tenerife-winter"
)

agent = project.agents.get_agent("asst_nJy3ICZrtfnUcpcldqpiEBTQ")

thread = project.agents.threads.create()
print(f"Created thread, ID: {thread.id}")

message = project.agents.messages.create(
    thread_id=thread.id,
    role="user",
    content="Hi Marketing Orchestrator"
)

run = project.agents.runs.create_and_process(
    thread_id=thread.id,
    agent_id=agent.id
)

if run.status == "failed":
    print(f"Run failed: {run.last_error}")
else:
    messages = project.agents.messages.list(
        thread_id=thread.id, 
        order=ListSortOrder.ASCENDING
    )

    for message in messages:
        if message.text_messages:
            print(f"{message.role}: {message.text_messages[-1].text.value}")
```

## TypeScript Client Usage

The Foundry Workflow component automatically uses the Azure Agent when `VITE_USE_AZURE_AGENT=true`:

```typescript
import { runCampaignFlow } from '@/lib/foundryClient'

// This will automatically use Azure Agent if VITE_USE_AZURE_AGENT=true
const response = await runCampaignFlow({
  messages: [
    {
      role: 'user',
      content: 'Create a marketing campaign for Product X'
    }
  ],
  context: {
    campaignContext: {
      product: 'Product X',
      target: 'Young adults',
      channels: ['instagram', 'tiktok'],
    }
  }
})

console.log(response.summary)
```

## Troubleshooting

### "Azure AI client not initialized"
- Check that Azure credentials are configured (run `az login` or set environment variables)
- Verify the endpoint URL is correct
- Ensure you have access to the Azure AI project

### "Cannot connect to Azure Agent backend"
- Make sure the Python backend is running on port 5001
- Check that `VITE_AZURE_AGENT_BACKEND` points to the correct URL
- For production, update the backend URL to your deployed server

### "Run failed"
- Check the agent ID is correct
- Verify the agent exists in Azure AI Studio
- Review Azure logs for detailed error information

## Deployment

### Backend (Python)

Deploy the `azure_agent_server.py` to:
- **Azure App Service**: Use Python runtime
- **Azure Functions**: Use Python HTTP trigger
- **Azure Container Apps**: Use Docker container
- **Any Python hosting**: Ensure Flask and azure-ai-projects are installed

Set environment variables in your deployment platform.

### Frontend (TypeScript)

Update `VITE_AZURE_AGENT_BACKEND` to point to your deployed Python backend:
```env
VITE_AZURE_AGENT_BACKEND=https://your-backend.azurewebsites.net
```

## Security Considerations

1. **Never expose Azure credentials in frontend code**
   - All Azure authentication happens in the Python backend
   - The frontend only communicates with the backend

2. **Use HTTPS in production**
   - Update backend URL to use HTTPS
   - Enable SSL/TLS on your backend server

3. **Implement authentication**
   - Add API keys or OAuth to secure the backend endpoints
   - Validate requests in the Flask app

4. **CORS Configuration**
   - Configure CORS to only allow your frontend domain
   - Don't use `*` in production

## Files

- `azure_agent_server.py` - Python Flask backend server
- `requirements.txt` - Python dependencies
- `src/lib/azureAgentClient.ts` - TypeScript client library
- `src/lib/foundryClient.ts` - Updated with Azure Agent support
- `AZURE_AGENT_INTEGRATION.md` - This documentation

## Next Steps

1. Test the integration with the Foundry Workflow UI
2. Add error handling and retry logic
3. Implement conversation history persistence
4. Add streaming responses for real-time feedback
5. Deploy to production environment
