# Microsoft Foundry Agent Orchestrator - Browser Implementation

This is a browser-compatible TypeScript/React implementation that replicates the Microsoft Foundry (Azure AI Agents) conversation pattern using the Spark runtime's LLM capabilities.

## Overview

The original C# code uses Azure AI's persistent agents SDK which isn't available in browser environments. This implementation provides the same conceptual interface using:
- **Spark Runtime LLM API** - For AI responses
- **In-memory thread management** - For conversation state
- **React hooks** - For easy component integration

## Architecture

```
┌─────────────────────────────────────────┐
│   React Component (UI)                  │
│   - OrchestratorDemo                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   React Hook                            │
│   - useOrchestrator()                   │
│   - State management                    │
│   - Error handling                      │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   Orchestrator Client (Core Logic)      │
│   - orchestratorClient                  │
│   - Thread lifecycle                    │
│   - Message routing                     │
│   - Run execution                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│   Spark Runtime                         │
│   - spark.llm()                         │
│   - GPT-4 / GPT-4-mini                  │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Orchestrator Client (`src/lib/orchestrator.ts`)

The main service class that manages agents, threads, messages, and runs.

**Key Methods:**

```typescript
// Agent management
getAgent(agentId: string): Agent | undefined
registerAgent(agent: Agent): void

// Thread lifecycle
createThread(metadata?: Record<string, unknown>): AgentThread
getThread(threadId: string): AgentThread | undefined
deleteThread(threadId: string): void

// Message operations
createMessage(threadId: string, role: MessageRole, content: string): ThreadMessage
getMessages(threadId: string, order?: 'ascending' | 'descending'): ThreadMessage[]

// Run execution
createRun(threadId: string, agentId: string): Promise<ThreadRun>
getRun(threadId: string, runId: string): ThreadRun | undefined
waitForCompletion(threadId: string, runId: string, pollIntervalMs?: number): Promise<ThreadRun>
```

**Default Agent:**

The system includes a pre-configured Marketing Orchestrator agent:
- **ID:** `asst_marketing_orchestrator`
- **Model:** `gpt-4o`
- **Purpose:** Strategic marketing campaign planning and execution

### 2. React Hook (`src/hooks/use-orchestrator.ts`)

A convenient hook for React components that abstracts the orchestrator client.

**Usage:**

```typescript
const {
  thread,          // Current active thread
  messages,        // Array of all messages in thread
  isProcessing,    // Boolean: is AI generating response?
  error,           // Error object if something failed
  createThread,    // Function: start new conversation
  sendMessage,     // Function: send message and get AI response
  loadThread,      // Function: resume existing thread
  clearThread,     // Function: delete current thread
  resetError       // Function: clear error state
} = useOrchestrator({
  agentId: 'asst_marketing_orchestrator',
  onMessageReceived: (message) => {
    console.log('New response:', message.content)
  },
  onError: (error) => {
    console.error('Error:', error.message)
  }
})
```

### 3. Demo Component (`src/components/OrchestratorDemo.tsx`)

A full-featured chat interface demonstrating all orchestrator capabilities.

**Features:**
- Thread creation/deletion
- Message history with role-based styling
- Real-time typing indicators
- Error display
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Code examples

## Type Definitions

### MessageRole
```typescript
type MessageRole = 'user' | 'assistant' | 'system'
```

### RunStatus
```typescript
type RunStatus = 
  | 'queued'        // Waiting to execute
  | 'in_progress'   // Currently processing
  | 'requires_action' // (Reserved for future tool use)
  | 'completed'     // Successfully finished
  | 'failed'        // Error occurred
  | 'cancelled'     // Manually cancelled
```

### ThreadMessage
```typescript
interface ThreadMessage {
  id: string
  threadId: string
  role: MessageRole
  content: string
  createdAt: Date
}
```

### AgentThread
```typescript
interface AgentThread {
  id: string
  createdAt: Date
  metadata?: Record<string, unknown>
}
```

### ThreadRun
```typescript
interface ThreadRun {
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
```

### Agent
```typescript
interface Agent {
  id: string
  name: string
  instructions: string  // System prompt
  model: string         // 'gpt-4o' | 'gpt-4o-mini'
  tools?: unknown[]     // Reserved for future extensions
}
```

## Comparison: Azure SDK vs Spark Implementation

| Feature | Azure AI Agents | Spark Orchestrator |
|---------|----------------|-------------------|
| **Authentication** | DefaultAzureCredential | No auth needed (built-in) |
| **Persistence** | Server-side database | In-memory (session only) |
| **Agent Definition** | Created in Azure portal | Code-based registration |
| **Message Polling** | Required (async operations) | Required (same pattern) |
| **Run Execution** | Serverless Azure compute | Spark runtime LLM API |
| **Thread Storage** | Persistent across sessions | Cleared on page refresh |
| **Cost** | Azure pricing per token | Included in Spark runtime |
| **Deployment** | Requires Azure account | Runs in browser |

## Usage Examples

### Example 1: Basic Conversation

```typescript
import { useOrchestrator } from '@/hooks/use-orchestrator'

function ChatInterface() {
  const { createThread, sendMessage, messages, isProcessing } = 
    useOrchestrator()

  useEffect(() => {
    createThread()
  }, [])

  const handleSend = async () => {
    await sendMessage('How do I create a Facebook ad campaign?')
  }

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
      <button onClick={handleSend} disabled={isProcessing}>
        Ask Question
      </button>
    </div>
  )
}
```

### Example 2: Custom Agent

```typescript
import { orchestratorClient } from '@/lib/orchestrator'

// Register a custom agent
orchestratorClient.registerAgent({
  id: 'asst_content_creator',
  name: 'Content Creator',
  instructions: `You are an expert copywriter specialized in creating 
    compelling ad copy, email campaigns, and social media content.
    Always ask clarifying questions before generating content.`,
  model: 'gpt-4o',
  tools: []
})

// Use the custom agent
const { sendMessage } = useOrchestrator({
  agentId: 'asst_content_creator'
})

await sendMessage('Write a Facebook ad for a fitness app')
```

### Example 3: Error Handling

```typescript
const { sendMessage, error, resetError } = useOrchestrator({
  onError: (err) => {
    console.error('Orchestrator error:', err.message)
    // Show toast notification
    toast.error('Failed to get response', {
      description: err.message
    })
  }
})

if (error) {
  return (
    <div className="error-banner">
      <p>Error: {error.message}</p>
      <button onClick={resetError}>Retry</button>
    </div>
  )
}
```

### Example 4: Thread Metadata

```typescript
const { createThread } = useOrchestrator()

// Store context with thread
createThread({
  campaignId: 'camp_12345',
  userId: 'user_abc',
  source: 'campaign_builder',
  createdAt: new Date().toISOString()
})
```

### Example 5: Message History

```typescript
import { orchestratorClient } from '@/lib/orchestrator'

// Get messages from a specific thread
const threadId = 'thread_1234567890_abc123'
const messages = orchestratorClient.getMessages(threadId, 'descending')

// Display in reverse chronological order
messages.forEach(msg => {
  console.log(`[${msg.createdAt.toISOString()}] ${msg.role}: ${msg.content}`)
})
```

## Integration with Existing App

To integrate the orchestrator into the Campaign Impact Hub:

### Option 1: Replace WarRoomChat Component

```typescript
// In src/App.tsx, replace WarRoomChat with OrchestratorDemo
import { OrchestratorDemo } from '@/components/OrchestratorDemo'

// In the render:
<div className="lg:col-span-3">
  <OrchestratorDemo />
</div>
```

### Option 2: Create Hybrid Component

```typescript
import { useOrchestrator } from '@/hooks/use-orchestrator'

function EnhancedWarRoom({ language, currentBrief }) {
  const { createThread, sendMessage, messages, isProcessing } = 
    useOrchestrator({
      agentId: 'asst_marketing_orchestrator'
    })

  useEffect(() => {
    if (currentBrief) {
      createThread({
        briefData: currentBrief,
        language
      })
      
      // Auto-send context
      sendMessage(`I have a campaign brief for: ${currentBrief.product}. 
        Target audience: ${currentBrief.audience}. 
        Budget: ${currentBrief.budget}. 
        What recommendations do you have?`)
    }
  }, [currentBrief])

  // Render chat interface with messages...
}
```

## Advanced Features

### Custom Agent Instructions with Brand Kit

```typescript
import { useKV } from '@github/spark/hooks'

function BrandAwareOrchestrator() {
  const [brandKit] = useKV('brand-kit-v2', {})
  
  useEffect(() => {
    const brandInstructions = `
      Brand Tone: ${brandKit.tone}
      Formality Level: ${brandKit.formality}/5
      Forbidden Words: ${brandKit.forbiddenWords.join(', ')}
      Preferred Words: ${brandKit.preferredWords.join(', ')}
    `
    
    orchestratorClient.registerAgent({
      id: 'asst_branded_marketer',
      name: 'Brand-Aligned Marketer',
      instructions: `You are a marketing strategist. Follow these brand guidelines:
        ${brandInstructions}
        
        Always respect the brand voice in all recommendations.`,
      model: 'gpt-4o'
    })
  }, [brandKit])
  
  const { sendMessage } = useOrchestrator({
    agentId: 'asst_branded_marketer'
  })
  
  // Use as normal...
}
```

### Multi-Agent System

```typescript
// Register multiple agents for different tasks
orchestratorClient.registerAgent({
  id: 'asst_strategist',
  name: 'Campaign Strategist',
  instructions: 'You plan high-level campaign strategies...',
  model: 'gpt-4o'
})

orchestratorClient.registerAgent({
  id: 'asst_copywriter',
  name: 'Ad Copywriter',
  instructions: 'You write compelling ad copy...',
  model: 'gpt-4o-mini'
})

orchestratorClient.registerAgent({
  id: 'asst_analyst',
  name: 'Analytics Expert',
  instructions: 'You analyze campaign data and KPIs...',
  model: 'gpt-4o'
})

// Use different agents for different tasks
const { sendMessage: askStrategist } = useOrchestrator({ agentId: 'asst_strategist' })
const { sendMessage: askCopywriter } = useOrchestrator({ agentId: 'asst_copywriter' })
const { sendMessage: askAnalyst } = useOrchestrator({ agentId: 'asst_analyst' })
```

## Limitations & Future Enhancements

### Current Limitations
- **No Persistence:** Threads are lost on page refresh (could be fixed with useKV)
- **No Tool Calling:** Azure agents support function calling; this would need custom implementation
- **In-Memory Only:** All data stored in browser memory
- **Single Model:** Each agent uses one model (could support model switching per run)

### Possible Enhancements
1. **Add Persistence:** Store threads/messages in Spark KV storage
2. **Streaming Responses:** Implement real-time token streaming
3. **File Attachments:** Support image/document uploads
4. **Multi-Agent Coordination:** Agent handoffs and delegation
5. **RAG Integration:** Vector search over campaign data
6. **Export/Import:** Download/upload conversation histories

## API Reference

See inline TypeScript documentation in:
- `src/lib/orchestrator.ts`
- `src/hooks/use-orchestrator.ts`

## Testing

```typescript
// Manual test in browser console
import { orchestratorClient } from '@/lib/orchestrator'

const thread = orchestratorClient.createThread()
console.log('Thread created:', thread.id)

orchestratorClient.createMessage(thread.id, 'user', 'Hello!')
const run = await orchestratorClient.createRun(thread.id, 'asst_marketing_orchestrator')
await orchestratorClient.waitForCompletion(thread.id, run.id)

const messages = orchestratorClient.getMessages(thread.id)
console.log('Messages:', messages)
```

## License

Same as parent project (Campaign Impact Hub).
