/**
 * Azure AI Agent Client
 * Connects to the Azure AI Agent via Python backend
 */

export interface AzureAgentConfig {
  backendUrl?: string
}

export interface ThreadResponse {
  thread_id: string
  created_at?: string
}

export interface MessageResponse {
  thread_id: string
  run_id: string
  run_status: string
  messages: Array<{
    role: string
    content: string
  }>
}

export interface ListMessagesResponse {
  thread_id: string
  messages: Array<{
    id: string
    role: string
    content: string
    created_at?: string
  }>
}

export class AzureAgentClient {
  private backendUrl: string

  constructor(config?: AzureAgentConfig) {
    this.backendUrl = config?.backendUrl || 
      import.meta.env.VITE_AZURE_AGENT_BACKEND || 
      'http://localhost:5001'
  }

  /**
   * Create a new conversation thread with the Azure AI Agent
   */
  async createThread(): Promise<ThreadResponse> {
    const response = await fetch(`${this.backendUrl}/api/azure-agent/thread/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create thread')
    }

    return response.json()
  }

  /**
   * Send a message to the Azure AI Agent and get a response
   */
  async sendMessage(threadId: string, content: string): Promise<MessageResponse> {
    const response = await fetch(`${this.backendUrl}/api/azure-agent/message/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thread_id: threadId,
        content,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to send message')
    }

    return response.json()
  }

  /**
   * List all messages in a thread
   */
  async listMessages(threadId: string): Promise<ListMessagesResponse> {
    const response = await fetch(`${this.backendUrl}/api/azure-agent/messages/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        thread_id: threadId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to list messages')
    }

    return response.json()
  }

  /**
   * Check if the backend is healthy and connected to Azure
   */
  async healthCheck(): Promise<{
    status: string
    azure_connected: boolean
    endpoint: string
    agent_id: string
  }> {
    const response = await fetch(`${this.backendUrl}/health`)
    
    if (!response.ok) {
      throw new Error('Health check failed')
    }

    return response.json()
  }
}
