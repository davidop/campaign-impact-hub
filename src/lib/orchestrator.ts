export type MessageRole = 'user' | 'assistant' | 'system'

export type ThreadRunStatus = 
  | 'queued'
  | 'completed'
  | 'requires_action'
  | 'completed'
  | 'failed'
}

  threadId: string
  createdAt:
  lastError?: {
    code?: string
}
export interface 
}

export interface ThreadRun {
  id: string
  threadId: string
  status: ThreadRunStatus
  createdAt: Date
  completedAt?: Date
  lastError?: {
    message: string
    code?: string
  }
}

Tu misión es ayudar a crear, o
Capacidades:
2. Crear estrateg
4. Crear calendarios de contenido


    this.agents.set(defa

    const thre
      id: threadId,
      metadata,
    this.threads.se
 

    return this.threads.ge

    threadId: string,
    content: string
    const message: ThreadMessage = {

      content,
    }
   


    threadId: string,
  ): ThreadMessage[] {
    if (order === 'descending') {
    }

  createRun(threadId: string, assistantId: string): ThreadRun {

      thread
      createdAt: new Date(),
    
3. Optimizar presupuestos y canales
4. Crear calendarios de contenido
5. Generar copy efectivo para diferentes plataformas

Responde de forma clara, estructurada y accionable.`,
      model: 'gpt-4o',
    }
    this.agents.set(defaultAgent.id, defaultAgent)
   

  createThread(metadata?: Record<string, unknown>): AgentThread {
    const threadId = `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const thread: AgentThread = {
      id: threadId,
      createdAt: new Date(),
      metadata,
    }
    this.threads.set(threadId, thread)
      runData.completedAt = new Dat
    } catch (erro
  }

  createMessage(
  }
    role: MessageRole,
    content: string
  ): ThreadMessage {
  }
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    runId: stri
      role,
      content,
      createdAt: new Date(),
    }

    const threadMessages = this.messages.get(threadId) || []
    this.messages.set(threadId, [...threadMessages, message])
    return message
  }

  listMessages(
    threadId: string,
    order: 'ascending' | 'descending' = 'ascending'
  ): ThreadMessage[] {
    }
  }
      return [...messages].reverse()
    }
    const threadRun
  }

  createRun(threadId: string, assistantId: string): ThreadRun {
    const runId = `run_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const run: ThreadRun = {
      id: runId,
      threadId,
      status: 'queued',
      createdAt: new Date(),

    


    this.processRun(run, assistantId)
    

  }

  private async processRun(run: ThreadRun, assistantId: string) {
    const runData = this.runs.get(run.id)
    if (!runData) return

    runData.status = 'in_progress'


    try {
      const agent = this.agents.get(assistantId)
      if (!agent) {
        throw new Error(`Agent ${assistantId} not found`)
      }

      const threadMessages = this.listMessages(run.threadId)
      const conversationHistory = threadMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n')

      const prompt = spark.llmPrompt`${agent.instructions}




Por favor, responde al último mensaje del usuario.`

      const response = await spark.llm(prompt, 'gpt-4o')
      
      this.createMessage(run.threadId, 'assistant', response)
      
      runData.status = 'completed'
      runData.completedAt = new Date()
      this.runs.set(run.id, runData)
    } catch (error) {
      runData.status = 'failed'

        message: error instanceof Error ? error.message : 'Unknown error',
        code: 'processing_error',
      }
      this.runs.set(run.id, runData)
    }


  getRun(threadId: string, runId: string): ThreadRun | undefined {
    const run = this.runs.get(runId)

      return run
    }
    return undefined


  async waitForRun(
    threadId: string,
    runId: string,
    pollIntervalMs = 500

    return new Promise((resolve, reject) => {

        const run = this.getRun(threadId, runId)
        if (!run) {
          reject(new Error(`Run ${runId} not found`))
          return


        if (run.status === 'completed') {
          resolve(run)
        } else if (run.status === 'failed' || run.status === 'cancelled') {
          reject(new Error(run.lastError?.message || 'Run failed'))
        } else {
          setTimeout(checkStatus, pollIntervalMs)
        }
      }

      checkStatus()
    })


  cancelRun(threadId: string, runId: string): ThreadRun | undefined {
    const run = this.getRun(threadId, runId)
    if (run && (run.status === 'queued' || run.status === 'in_progress')) {
      run.status = 'cancelled'
      this.runs.set(runId, run)
      return run
    }
    return undefined
  }

  deleteThread(threadId: string): boolean {
    this.threads.delete(threadId)
    this.messages.delete(threadId)

    const threadRuns = Array.from(this.runs.values())
      .filter(run => run.threadId === threadId)
    threadRuns.forEach(run => this.runs.delete(run.id))

    return true
  }
}

export const orchestrator = new OrchestratorClient()
