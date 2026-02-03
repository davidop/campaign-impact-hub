# Quick Start: Microsoft Foundry-Style Agent Orchestrator

## What is this?

A browser-compatible implementation of the Microsoft Foundry (Azure AI Agents) conversation pattern. It provides the same interface as the Azure SDK but runs entirely in the browser using Spark's LLM runtime.

## 5-Minute Quick Start

### 1. Import the Hook

```typescript
import { useOrchestrator } from '@/hooks/use-orchestrator'
```

### 2. Use in Your Component

```typescript
function MyChat() {
  const { createThread, sendMessage, messages, isProcessing } = useOrchestrator()

  useEffect(() => {
    createThread()  // Start a new conversation
  }, [])

  const handleSend = async () => {
    await sendMessage('Hello, Marketing Orchestrator!')
  }

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.role}: {msg.content}</div>
      ))}
      <button onClick={handleSend} disabled={isProcessing}>Send</button>
    </div>
  )
}
```

### 3. See the Full Demo

Navigate to the **"Orchestrator"** tab in the app to see a complete working example.

## Core Concepts

### Thread
A conversation session with message history.

```typescript
const { createThread } = useOrchestrator()
const thread = createThread({ userId: '123' })  // Optional metadata
```

### Message
A single message from user or AI.

```typescript
const { sendMessage } = useOrchestrator()
await sendMessage('How do I optimize my ad budget?')
```

### Run
The execution of the AI agent processing a message.

```typescript
// Happens automatically when you call sendMessage()
// But you can also use the low-level API:
import { orchestratorClient } from '@/lib/orchestrator'
const run = await orchestratorClient.createRun(threadId, agentId)
await orchestratorClient.waitForCompletion(threadId, run.id)
```

## Common Patterns

### Pattern 1: Simple Q&A Bot

```typescript
function QABot() {
  const { createThread, sendMessage, messages } = useOrchestrator()
  
  useEffect(() => {
    createThread()
  }, [])

  return (
    <div>
      {messages.map(msg => <p key={msg.id}>{msg.content}</p>)}
      <button onClick={() => sendMessage('What is a good CTR?')}>
        Ask Question
      </button>
    </div>
  )
}
```

### Pattern 2: Auto-Context from Brief

```typescript
function ContextualChat({ campaignBrief }) {
  const { createThread, sendMessage } = useOrchestrator()

  useEffect(() => {
    if (campaignBrief) {
      createThread({ briefId: campaignBrief.id })
      
      sendMessage(`I have a campaign for ${campaignBrief.product}. 
        Target: ${campaignBrief.audience}. 
        Budget: ${campaignBrief.budget}.
        What's your recommendation?`)
    }
  }, [campaignBrief])

  // Render messages...
}
```

### Pattern 3: Custom Agent

```typescript
import { orchestratorClient } from '@/lib/orchestrator'

// Register once (e.g., in App.tsx or a utility file)
orchestratorClient.registerAgent({
  id: 'asst_email_expert',
  name: 'Email Marketing Expert',
  instructions: 'You specialize in email campaigns, subject lines, and nurturing flows.',
  model: 'gpt-4o'
})

// Use anywhere
function EmailHelper() {
  const { createThread, sendMessage } = useOrchestrator({
    agentId: 'asst_email_expert'
  })
  
  // Your component...
}
```

### Pattern 4: Error Handling

```typescript
const { sendMessage, error, resetError } = useOrchestrator({
  onError: (err) => {
    console.error('Error:', err.message)
    toast.error('Failed', { description: err.message })
  }
})

if (error) {
  return <div>Error: {error.message} <button onClick={resetError}>Retry</button></div>
}
```

### Pattern 5: Multiple Agents

```typescript
function MultiAgentSystem() {
  const strategist = useOrchestrator({ agentId: 'asst_marketing_orchestrator' })
  const copywriter = useOrchestrator({ agentId: 'asst_copywriter' })
  const analyst = useOrchestrator({ agentId: 'asst_analyst' })

  const askStrategist = () => strategist.sendMessage('Create a campaign plan')
  const askCopywriter = () => copywriter.sendMessage('Write ad copy')
  const askAnalyst = () => analyst.sendMessage('Analyze these metrics')

  // Render three separate chat interfaces...
}
```

## Hook API Reference

```typescript
const {
  thread,          // AgentThread | null - Current conversation
  messages,        // ThreadMessage[] - All messages in thread
  isProcessing,    // boolean - Is AI thinking?
  error,           // Error | null - Last error
  createThread,    // (metadata?) => AgentThread - Start new conversation
  sendMessage,     // (content: string) => Promise<ThreadRun | null> - Send and get response
  loadThread,      // (threadId: string) => AgentThread | null - Resume existing thread
  clearThread,     // () => void - Delete current thread
  resetError       // () => void - Clear error state
} = useOrchestrator({
  agentId: 'asst_marketing_orchestrator',  // Optional, defaults to marketing agent
  onMessageReceived: (msg) => {},          // Optional callback
  onError: (err) => {}                     // Optional error handler
})
```

## Message Object Structure

```typescript
{
  id: 'msg_1234567890_abc123',
  threadId: 'thread_1234567890_xyz789',
  role: 'user' | 'assistant' | 'system',
  content: 'The actual message text',
  createdAt: Date
}
```

## Thread Object Structure

```typescript
{
  id: 'thread_1234567890_xyz789',
  createdAt: Date,
  metadata: {
    // Your custom data
    userId: '123',
    campaignId: 'camp_456'
  }
}
```

## Advanced: Low-Level API

If you need more control, use the orchestrator client directly:

```typescript
import { orchestratorClient } from '@/lib/orchestrator'

// Create thread
const thread = orchestratorClient.createThread({ custom: 'data' })

// Add message
const userMsg = orchestratorClient.createMessage(
  thread.id,
  'user',
  'Hello!'
)

// Create run (triggers AI)
const run = await orchestratorClient.createRun(
  thread.id,
  'asst_marketing_orchestrator'
)

// Wait for completion
await orchestratorClient.waitForCompletion(thread.id, run.id)

// Get all messages
const allMessages = orchestratorClient.getMessages(thread.id)

// Get specific run
const runData = orchestratorClient.getRun(thread.id, run.id)
console.log(runData.status)  // 'completed'

// Delete thread
orchestratorClient.deleteThread(thread.id)
```

## Comparison to Azure Code

**Azure SDK (C#):**
```csharp
var endpoint = new Uri("https://...");
AIProjectClient projectClient = new(endpoint, new DefaultAzureCredential());
PersistentAgentsClient agentsClient = projectClient.GetPersistentAgentsClient();

PersistentAgent agent = agentsClient.Administration.GetAgent("asst_xxx");
PersistentAgentThread thread = agentsClient.Threads.CreateThread();
PersistentThreadMessage msg = agentsClient.Messages.CreateMessage(
    thread.Id, MessageRole.User, "Hi");
ThreadRun run = agentsClient.Runs.CreateRun(thread.Id, agent.Id);

// Poll until complete
while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress) {
    await Task.Delay(500);
    run = agentsClient.Runs.GetRun(thread.Id, run.Id);
}

var messages = agentsClient.Messages.GetMessages(thread.Id);
```

**Spark Implementation (TypeScript):**
```typescript
import { useOrchestrator } from '@/hooks/use-orchestrator'

const { createThread, sendMessage, messages, isProcessing } = useOrchestrator()

createThread()
await sendMessage('Hi')

// Polling happens automatically
// Messages update in real-time via React state
```

## Files to Review

- **`src/lib/orchestrator.ts`** - Core orchestrator logic
- **`src/hooks/use-orchestrator.ts`** - React hook wrapper
- **`src/components/OrchestratorDemo.tsx`** - Full working example
- **`ORCHESTRATOR_DOCS.md`** - Complete documentation

## Next Steps

1. Open the **Orchestrator** tab in the app
2. Click **"New Thread"**
3. Type a message and see the AI respond
4. Review the code example in the demo
5. Integrate into your own components

## Need Help?

- Check `ORCHESTRATOR_DOCS.md` for detailed examples
- Review `OrchestratorDemo.tsx` for a complete implementation
- Look at the TypeScript types in `orchestrator.ts`

---

**Key Difference from Azure:** This runs entirely in the browser using Spark's LLM runtime. No Azure account, credentials, or server required. Perfect for prototyping and client-side AI applications.
