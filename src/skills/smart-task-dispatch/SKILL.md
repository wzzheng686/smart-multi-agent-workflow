# Smart Task Dispatch Skill

This skill enables standardized task distribution from main agents to subagents using SMART principles.

## Purpose

Transform SMART task definitions into actionable prompts for subagents, ensuring clear communication of requirements, acceptance criteria, and constraints.

## Dispatch Workflow

### Step 1: Task Preparation
Before dispatching:
- [ ] Task has been defined with SMART framework (use smart-task-definition skill)
- [ ] All required resources are identified
- [ ] Dependencies are resolved or documented
- [ ] Acceptance criteria are clear and testable

### Step 2: Generate Dispatch Prompt
Create a structured prompt for the subagent:

```
## Task: [task_id]

### What to Do
[specific description]

### Why It Matters
[relevant context]

### Deliverables
1. [deliverable 1]
2. [deliverable 2]
...

### Acceptance Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]
...

### Resources
- [resource 1]
- [resource 2]
...

### Constraints
- Time: [time_bound]
- Scope: [scope limitations]
- Quality: [quality requirements]

### When Done
1. Run self-check using smart-self-check skill
2. Generate completion report
3. Submit for review
```

### Step 3: Dispatch Configuration
Set dispatch parameters:

```typescript
interface DispatchConfig {
  taskId: string;
  subagentType: 'quick' | 'deep' | 'visual-engineering' | 'ultrabrain';
  loadSkills: string[];  // Skills to inject into subagent
  runInBackground: boolean;
  timeout?: number;  // ms
  retryCount?: number;
}
```

### Step 4: Execute Dispatch
Use the platform's task tool:

```typescript
// Example for OpenCode
task(
  category: config.subagentType,
  load_skills: config.loadSkills,
  run_in_background: config.runInBackground,
  prompt: dispatchPrompt,
  description: taskSummary
)
```

## Platform Adaptations

### OpenCode
```typescript
task(
  category: "quick",  // or "deep", "visual-engineering", etc.
  load_skills: ["smart-self-check", "verification-before-completion"],
  run_in_background: false,
  prompt: smartPrompt,
  description: "Implement auth middleware"
)
```

### Claude Code
```markdown
Use the Task tool with:
- Type: Specify based on complexity
- Instructions: Include full SMART prompt
- Skills: Load smart-self-check for self-assessment
```

### Codex
```typescript
task({
  type: "quick",
  prompt: smartPrompt,
  tools: ["read", "write", "edit", "bash"]
})
```

## Task Dependencies

Handle task relationships:

```typescript
interface TaskDependency {
  taskId: string;
  type: 'blocks' | 'blocked-by' | 'related-to';
  description: string;
}

// Before dispatching, ensure:
// 1. All 'blocked-by' dependencies are complete
// 2. Tasks that 'blocks' this one are notified
// 3. Related tasks have context
```

## Error Handling

### Dispatch Failures
- **Timeout**: Retry with increased timeout or simplified scope
- **Resource Unavailable**: Document and defer task
- **Ambiguous Requirements**: Pause and clarify before retry

### Recovery
```typescript
interface RecoveryPlan {
  taskId: string;
  failureReason: string;
  retryCount: number;
  maxRetries: number;
  nextAction: 'retry' | 'escalate' | 'defer' | 'cancel';
}
```

## Monitoring

Track dispatched tasks:
- Status: pending → in_progress → completed → accepted/failed
- Duration: time spent vs estimated
- Quality: self-check score vs acceptance result

## Integration

This skill integrates with:
- **smart-task-definition**: Source of SMART task definitions
- **smart-self-check**: Subagent uses for self-assessment
- **smart-acceptance**: Main agent uses for verification

## Best Practices

1. **One task, one focus**: Each dispatch should have a single clear objective
2. **Include context**: Don't assume subagent knows project history
3. **Be specific about deliverables**: File paths, function names, test cases
4. **Set realistic timeouts**: Better to succeed slowly than fail fast
5. **Use appropriate subagent type**: Match complexity to capability