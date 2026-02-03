export type MessageRole = 'user' | 'assistant' | 'system'

export type RunStatus = 
  | 'queued'
  | 'in_progress'
  | 'requires_action'
  | 'completed'
  | 'failed'
  | 'cancelled'

export interface ThreadMessage {
  id: string
  threadId: string
  role: MessageRole
  content: string
  createdAt: Date
}

export interface AgentThread {
  id: string
  createdAt: Date
  metadata?: Record<string, unknown>
}

export interface ThreadRun {
  id: string
  threadId: string
  agentId: string
  status: RunStatus
  createdAt: Date
  completedAt?: Date
  lastError?: {
    message: string
    code?: string
  }
}

export interface Agent {
  id: string
  name: string
  instructions: string
  model: string
  tools?: unknown[]
}

class OrchestratorClient {
  private threads: Map<string, AgentThread> = new Map()
  private messages: Map<string, ThreadMessage[]> = new Map()
  private runs: Map<string, ThreadRun> = new Map()
  private agents: Map<string, Agent> = new Map()

  constructor() {
    this.registerDefaultAgent()
  }

  private registerDefaultAgent() {
    const defaultAgent: Agent = {
      id: 'asst_marketing_orchestrator',
      name: 'Marketing Orchestrator',
      instructions: `Eres un asistente experto en marketing estratégico y gestión de campañas digitales.

Tu rol es ayudar a los usuarios a:
1. Planificar campañas de marketing completas
2. Definir estrategias de contenido
3. Crear mensajes persuasivos alineados con la marca
4. Estructurar funnels de conversión
5. Optimizar presupuestos y KPIs

Siempre responde de forma estratégica, ejecutable y específica. No uses generalidades.
Si falta información crítica, pregunta antes de proponer soluciones.
Mantén coherencia con las directrices de marca del usuario si las proporciona.`,
      model: 'gpt-4o',
      tools: []
    }

    this.agents.set(defaultAgent.id, defaultAgent)
  }

  getAgent(agentId: string): Agent | undefined {
    return this.agents.get(agentId)
  }

  registerAgent(agent: Agent): void {
    this.agents.set(agent.id, agent)
  }

  createThread(metadata?: Record<string, unknown>): AgentThread {
    const threadId = `thread_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    
    const thread: AgentThread = {
      id: threadId,
      createdAt: new Date(),
      metadata
    }

    this.threads.set(threadId, thread)
    this.messages.set(threadId, [])
    
    return thread
  }

  getThread(threadId: string): AgentThread | undefined {
    return this.threads.get(threadId)
  }

  createMessage(
    threadId: string,
    role: MessageRole,
    content: string
  ): ThreadMessage {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    
    const message: ThreadMessage = {
      id: messageId,
      threadId,
      role,
      content,
      createdAt: new Date()
    }

    const threadMessages = this.messages.get(threadId) || []
    threadMessages.push(message)
    this.messages.set(threadId, threadMessages)

    return message
  }

  getMessages(threadId: string, order: 'ascending' | 'descending' = 'ascending'): ThreadMessage[] {
    const messages = this.messages.get(threadId) || []
    
    if (order === 'descending') {
      return [...messages].reverse()
    }
    
    return [...messages]
  }

  async createRun(threadId: string, agentId: string): Promise<ThreadRun> {
    const runId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    
    const run: ThreadRun = {
      id: runId,
      threadId,
      agentId,
      status: 'queued',
      createdAt: new Date()
    }

    this.runs.set(runId, run)

    this.processRun(run)

    return run
  }

  private async processRun(run: ThreadRun): Promise<void> {
    const runData = this.runs.get(run.id)
    if (!runData) return

    runData.status = 'in_progress'
    this.runs.set(run.id, runData)

    try {
      const agent = this.agents.get(run.agentId)
      if (!agent) {
        throw new Error(`Agent ${run.agentId} not found`)
      }

      const threadMessages = this.messages.get(run.threadId) || []
      const conversationHistory = threadMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n')

      const promptText = `${agent.instructions}

Historial de conversación:
${conversationHistory}

Por favor, genera una respuesta como asistente que continúe esta conversación de forma natural y útil.`

      const response = await spark.llm(promptText, agent.model as 'gpt-4o' | 'gpt-4o-mini')

      this.createMessage(run.threadId, 'assistant', response)

      runData.status = 'completed'
      runData.completedAt = new Date()
      this.runs.set(run.id, runData)

    } catch (error) {
      runData.status = 'failed'
      runData.lastError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'execution_error'
      }
      this.runs.set(run.id, runData)
    }
  }

  getRun(threadId: string, runId: string): ThreadRun | undefined {
    const run = this.runs.get(runId)
    if (run && run.threadId === threadId) {
      return run
    }
    return undefined
  }

  async waitForCompletion(
    threadId: string,
    runId: string,
    pollIntervalMs: number = 500
  ): Promise<ThreadRun> {
    return new Promise((resolve, reject) => {
      const checkStatus = () => {
        const run = this.getRun(threadId, runId)
        
        if (!run) {
          reject(new Error(`Run ${runId} not found`))
          return
        }

        if (run.status === 'completed') {
          resolve(run)
          return
        }

        if (run.status === 'failed' || run.status === 'cancelled') {
          reject(new Error(run.lastError?.message || `Run ${run.status}`))
          return
        }

        setTimeout(checkStatus, pollIntervalMs)
      }

      checkStatus()
    })
  }

  deleteThread(threadId: string): void {
    this.threads.delete(threadId)
    this.messages.delete(threadId)
    
    const threadRuns = Array.from(this.runs.values())
      .filter(run => run.threadId === threadId)
    
    threadRuns.forEach(run => this.runs.delete(run.id))
  }

  clearAllThreads(): void {
    this.threads.clear()
    this.messages.clear()
    this.runs.clear()
    this.registerDefaultAgent()
  }
}

export const orchestratorClient = new OrchestratorClient()
