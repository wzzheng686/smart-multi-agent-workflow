# Getting Started

This guide will help you get started with the Smart Multi-Agent Workflow system.

## Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- TypeScript 5.0.0 or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-multi-agent-workflow.git

# Navigate to the directory
cd smart-multi-agent-workflow

# Install dependencies
npm install
```

## Quick Start

### 1. Create a SMART Task

```typescript
import { generateSmartTask } from './src/workflow';

const task = generateSmartTask({
  specific: 'Implement user authentication system',
  measurable: 'All tests pass, coverage > 90%',
  achievable: 'Using established patterns and libraries',
  relevant: 'Core security feature required by users',
  time_bound: 'Complete within 2 hours'
});

console.log(task);
```

### 2. Get Platform Adapter

```typescript
import { adapterFactory } from './src/skills/multi-platform-adapter';

const adapter = adapterFactory.getAdapter();
if (adapter) {
  console.log(`Detected platform: ${adapter.name}`);
}
```

### 3. Dispatch Task

```typescript
const result = adapter.dispatchTask(task, {});
console.log(result.prompt);
```

### 4. Run Self-Check

```typescript
import { generateSelfCheck } from './src/workflow';

const selfCheck = generateSelfCheck(task, 'Task completed successfully');
console.log(selfCheck);
```

### 5. Verify Acceptance

```typescript
import { verifyAcceptance } from './src/workflow';

const acceptance = verifyAcceptance(task, selfCheck, {
  specific: { passed: true, evidence: 'Implemented' },
  measurable: { passed: true, evidence: 'Tests passing' },
  achievable: { passed: true, evidence: 'Solution practical' },
  relevant: { passed: true, evidence: 'Aligns with goals' },
  time_bound: { passed: true, evidence: 'Completed on time' }
});

console.log(acceptance.decision); // 'accepted'
```

## Next Steps

- Read the [Architecture Guide](./architecture.md) for detailed system design
- Check the [API Reference](./api-reference.md) for complete API documentation
- Explore [Examples](../examples/) for more usage patterns
- Read the [Contributing Guide](../CONTRIBUTING.md) to contribute to the project