# Task() Tool Integration Guide

This document describes how to integrate SMART workflow into existing agent task() tool calls.

## Overview

The SMART workflow integrates with the standard `task()` tool used in multi-agent systems. The integration point is in the prompt generation and result verification.

## Integration Pattern

### Before (Without SMART)
```typescript
task(
  category: "quick",
  prompt: "Add user authentication",
  run_in_background: false
)
```

### After (With SMART)
```typescript
// 1. Generate SMART task definition
const smartTask = generateSmartTask({
  specific: "Implement JWT-based user authentication with login, logout, and token refresh",
  measurable: "All tests pass with >90% coverage, endpoints work end-to-end",
  achievable: "Using existing Express framework and JWT library",
  relevant: "Required for all user-facing features",
  time_bound: "Complete within 2 hours"
});

// 2. Dispatch with SMART prompt
const smartPrompt = generateDispatchPrompt(smartTask);

task(
  category: "quick",
  load_skills: ["smart-self-check", "verification-before-completion"],
  prompt: smartPrompt,
  run_in_background: false
);

// 3. Verify with SMART acceptance
const acceptance = verifyAcceptance(smartTask, subagentResult);
```

## Prompt Generation

### Input
```typescript
interface SmartTaskInput {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  time_bound: string;
  deliverables?: Deliverable[];
  acceptance_criteria?: Criterion[];
  resources?: Resource[];
  risks?: Risk[];
}
```

### Output
```typescript
function generateDispatchPrompt(task: SmartTask): string {
  return `
## Task: ${task.task_id}

### What to Do
${task.specific}

### Why It Matters
${task.relevant}

### Deliverables
${task.deliverables.map((d, i) => `${i + 1}. ${d.name} - ${d.description}`).join('\n')}

### Acceptance Criteria
${task.acceptance_criteria.map(c => `- [ ] ${c.criterion}`).join('\n')}

### Resources
${task.resources.map(r => `- ${r.name} (${r.path})`).join('\n')}

### Constraints
- Time: ${task.time_bound}
- Quality: Tests must pass, coverage > 90%

### When Done
1. Run self-check using smart-self-check skill
2. Generate completion report
3. Submit for review
`;
}
```

## Verification Integration

### Self-Check Integration
```typescript
function integrateSelfCheck(subagentResult: string): SelfCheckReport {
  // Parse subagent output
  // Run verification commands
  // Generate self-check report
  return {
    task_id: task.task_id,
    smart_scores: calculateSmartScores(task, subagentResult),
    deliverables_completed: verifyDeliverables(task.deliverables),
    acceptance_criteria_met: verifyCriteria(task.acceptance_criteria),
    confidence_level: assessConfidence(subagentResult)
  };
}
```

### Acceptance Integration
```typescript
function integrateAcceptance(
  task: SmartTask,
  selfCheck: SelfCheckReport,
  mainAgentVerification: VerificationResult
): AcceptanceReport {
  // Compare self-check with independent verification
  // Generate acceptance decision
  return {
    task_id: task.task_id,
    decision: makeDecision(selfCheck, mainAgentVerification),
    verification_results: mainAgentVerification,
    overall_score: calculateOverallScore(mainAgentVerification),
    decision_rationale: generateRationale(mainAgentVerification)
  };
}
```

## Platform-Specific Integration

### OpenCode
```typescript
// In OpenCode, skills are loaded via load_skills parameter
task(
  category: "quick",
  load_skills: ["smart-self-check", "verification-before-completion"],
  prompt: smartPrompt,
  description: `SMART task: ${task.specific.substring(0, 50)}...`
);
```

### Claude Code
```typescript
// In Claude Code, include skill instructions in prompt
const promptWithSkills = `
${smartPrompt}

---
Load and follow the smart-self-check skill for self-assessment.
`;
```

### Codex
```typescript
// In Codex, use tool-based approach
task({
  type: "quick",
  prompt: smartPrompt,
  tools: ["read", "write", "edit", "bash"]
});
```

## Error Handling

### Task Definition Errors
```typescript
try {
  const smartTask = generateSmartTask(input);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Invalid SMART task:", error.message);
    // Prompt for clarification
  }
}
```

### Verification Errors
```typescript
try {
  const acceptance = verifyAcceptance(task, result);
} catch (error) {
  if (error instanceof VerificationError) {
    console.error("Verification failed:", error.message);
    // Request re-execution
  }
}
```

## Best Practices

1. **Always validate before dispatch**: Ensure SMART task is complete
2. **Include self-check skill**: Let subagent verify their own work
3. **Run independent verification**: Don't rely solely on self-check
4. **Document decisions**: Record why tasks were accepted/rejected
5. **Iterate on templates**: Improve based on actual usage