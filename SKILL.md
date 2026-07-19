---
name: smart-agent
description: "SMART principles-based multi-agent workflow for task quality optimization. Use when defining tasks with Specific, Measurable, Achievable, Relevant, Time-bound criteria, dispatching tasks to subagents, running self-checks, verifying acceptance, or archiving workflow configurations. Triggers on: SMART task, task definition, task dispatch, self-check, acceptance verification, workflow archive, multi-agent coordination."
---

# Smart Multi-Agent Workflow

A workflow system for creating high-quality tasks using SMART principles, dispatching them to subagents, and verifying completion.

## When to Use

- **Defining tasks**: Transform vague requests into concrete, measurable, verifiable task definitions
- **Dispatching to subagents**: Generate structured prompts with clear acceptance criteria
- **Self-checking**: Subagents assess their own work before submission
- **Acceptance verification**: Main agents verify deliverables against requirements
- **Archiving**: Package workflow configurations for reuse across environments

## SMART Framework

| Dimension | Question | Example |
|-----------|----------|---------|
| **S**pecific | What exactly needs to be done? | "Implement JWT auth middleware" |
| **M**easurable | How to verify completion? | "All tests pass, coverage > 90%" |
| **A**chievable | Is it realistic given constraints? | "Using existing Express framework" |
| **R**elevant | Why does it matter? | "Required for all protected routes" |
| **T**ime-bound | When is it due? | "Complete within 2 hours" |

## Core Workflow

### 1. Task Definition

Transform abstract requests into structured SMART tasks:

```json
{
  "task_id": "task-abc123",
  "specific": "Implement JWT-based user authentication with login, logout, and token refresh",
  "measurable": "Auth middleware handles 100% of protected routes, tests pass with >90% coverage",
  "achievable": "Using existing Express framework and jsonwebtoken library",
  "relevant": "Required for all user-facing features, blocks profile implementation",
  "time_bound": "Complete within 2 hours",
  "deliverables": [
    { "name": "auth-middleware.ts", "type": "file", "description": "JWT verification middleware" },
    { "name": "auth.test.ts", "type": "test", "description": "Unit tests with 90%+ coverage" }
  ],
  "acceptance_criteria": [
    { "criterion": "POST /api/auth/login returns JWT token", "verifiable": true },
    { "criterion": "Protected routes return 401 without valid token", "verifiable": true }
  ],
  "resources": [
    { "name": "Express.js", "type": "library" },
    { "name": "User model", "type": "file", "path": "src/models/user.ts" }
  ],
  "risks": [
    { "risk": "Token refresh edge cases", "impact": "medium", "mitigation": "Careful state machine implementation" }
  ],
  "metadata": {
    "priority": "high",
    "complexity": "moderate",
    "created_at": "2026-07-19T10:00:00Z"
  }
}
```

### 2. Task Dispatch

Generate structured prompts for subagents using your platform's task dispatch mechanism:

**Generic Task Dispatch Template:**

```markdown
## Task: [task_id]

### What to Do
[specific description from SMART task]

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

**Platform Adaptation:**
- Use your AI agent's native task dispatch mechanism
- Load relevant skills (e.g., `smart-self-check`, `verification-before-completion`)
- Adjust task categories based on your platform's options

### 3. Self-Check (Subagent)

Before submitting, subagents generate a completion report:

```json
{
  "task_id": "task-abc123",
  "subagent_id": "subagent-xyz",
  "check_timestamp": "2026-07-19T11:30:00Z",
  "completion_percentage": 100,
  "smart_scores": {
    "specific": { "score": 95, "evidence": "All requested functionality implemented" },
    "measurable": { "score": 90, "evidence": "Tests passing, coverage at 92%" },
    "achievable": { "score": 95, "evidence": "Solution is practical and maintainable" },
    "relevant": { "score": 100, "evidence": "Directly addresses security requirements" },
    "time_bound": { "score": 95, "evidence": "Completed within time limit" }
  },
  "overall_score": 95,
  "confidence_level": "high"
}
```

### 4. Acceptance Verification (Main Agent)

Verify deliverables independently:

```json
{
  "task_id": "task-abc123",
  "acceptance_id": "acc-task-abc123-xyz",
  "decision": "accepted",
  "verifier": "main-agent",
  "verification_results": {
    "specific": { "passed": true, "evidence": "All functionality matches requirements" },
    "measurable": { "passed": true, "evidence": "Tests pass, coverage >90%" },
    "achievable": { "passed": true, "evidence": "Code quality is acceptable" },
    "relevant": { "passed": true, "evidence": "Aligns with project architecture" },
    "time_bound": { "passed": true, "evidence": "Completed within deadline" }
  },
  "overall_score": 100,
  "decision_rationale": "All acceptance criteria met"
}
```

## Quality Gates

### Must Pass (Critical)
- All tests passing
- No type errors
- No lint errors
- Core functionality working

### Should Pass (Major)
- Code coverage > 80%
- Documentation complete
- No TODO/FIXME in new code

### Nice to Have (Minor)
- Performance benchmarks met
- Edge cases handled
- Error messages clear

## Platform Adaptation Guide

This skill is designed to work with any AI agent that supports task dispatch and skill loading. To adapt to your platform:

### Task Dispatch
- Use your platform's native task dispatch mechanism
- Map the generic task template to your platform's format
- Adjust task categories based on your platform's options

### Skill Loading
- Load `smart-self-check` skill for subagent self-assessment
- Load `verification-before-completion` skill for verification
- Adjust skill names based on your platform's naming conventions

### Common Platforms
- **OpenCode**: Use `task()` with category and load_skills parameters
- **Claude Code**: Use Task tool with instructions and skill loading
- **Codex**: Use task with type and tools parameters
- **Hermes**: Use task with type and tools parameters

## Example: Complete Workflow

```markdown
1. Define SMART task using the template above
2. Dispatch to subagent using your platform's task mechanism
3. Subagent executes and generates self-check report
4. Main agent verifies acceptance
5. Archive workflow configuration if needed
```

## Archive Operations

Package workflow configurations for reuse:

```markdown
1. Collect workflow configuration files
2. Create archive with metadata (version, description, author)
3. Include platform compatibility information
4. Store in reusable format
```

## Tips

1. **Be specific**: Vague tasks lead to vague results
2. **Include test criteria**: If you can't test it, you can't verify it
3. **Document risks**: Anticipating problems helps subagents prepare
4. **Use evidence**: Claims without proof are worthless
5. **One task, one focus**: Each dispatch should have a single clear objective
