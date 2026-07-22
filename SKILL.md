---
name: smart-agent
description: "SMART principles-based workflow for AI agents. Use when you need to decompose a vague request into a verifiable task, dispatch work to a subagent with clear criteria, self-check output against requirements, or accept/reject delivered work against structured criteria. Triggers on: task definition, task dispatch, self-check, acceptance verification, multi-step work breakdown."
---

# Smart Agent — SMART Workflow for AI Agents

A structured workflow that helps AI agents decompose vague requests into verifiable tasks, execute them through subagents, and verify the results.

## When to Use

- **Task definition**: Turn a fuzzy request into a concrete, verifiable task
- **Task dispatch**: Hand off work to a subagent with complete context
- **Self-check**: Verify your own output before declaring done
- **Acceptance**: Review delivered work against original requirements

## SMART for AI Agent

| Dimension | Meaning for AI Agents |
|-----------|----------------------|
| **S**pecific | Precise file paths, interface signatures, output format. Not "add auth" but "add `src/middleware/auth.ts` that exports `requireAuth` middleware checking JWT in `Authorization: Bearer` header." |
| **M**easurable | Concrete verification commands. Not "tests pass" but "`npm test` exits 0, `tsc --noEmit` has 0 errors, `curl localhost:3000/api/me` returns 401 without token." |
| **A**chievable | The task fits in context window / token budget. Dependencies are available. You have the tools and access needed. |
| **R**elevant | Why this task now? What does it unblock? What existing code does it connect to? |
| **T**ime-bound | Token budget or subagent round limit for this task. Not "2 hours" but "3 subagent rounds max" or "under 8K tokens of output." |

## Workflow

### 1. Define

When given a vague task, turn it into a structured definition before acting.

```
## SMART Task: <task-name>

**S - Specific**
What exactly needs to be produced?
- Files to create/modify with paths
- Functions/interfaces with signatures
- Expected output format

**M - Measurable**
How will you verify completion?
- Build/test/lint commands
- Expected exit codes
- Behavioral assertions

**A - Achievable**
What resources are needed?
- Existing code to reference
- Libraries/tools available
- Context window assessment

**R - Relevant**
Why this task now?
- What it enables next
- Connection to current codebase

**T - Time-bound**
What's the budget?
- Max subagent rounds: <N>
- Max output tokens: <N>

**Deliverables:**
- [ ] <file/result 1>
- [ ] <file/result 2>

**Acceptance Criteria:**
- [ ] <criterion 1>
- [ ] <criterion 2>
```

### 2. Dispatch

When handing work to a subagent, wrap the SMART task into the subagent's instructions. The template below is for you (the dispatching agent) to fill in as the subagent's prompt:

```
[CONTEXT]: <the codebase context the subagent needs>
[TASK]: <paste the full SMART task definition from step 1>
[SCOPE]: <what's in scope, what's out>
[CONSTRAINTS]: <time/quality constraints>
[WHEN DONE]: 
1. Run self-check against each acceptance criterion
2. Report results with evidence
```

### 3. Self-Check

Before submitting work, verify each SMART dimension:

```
## Self-Check Report

**Task:** <task-name>

| Criterion | Status | Evidence |
|-----------|--------|----------|
| S - All required files produced? | [PASS/FAIL] | <file listing> |
| M - Verification commands pass? | [PASS/FAIL] | <command output> |
| A - Within budget/tools? | [PASS/FAIL] | <assessment> |
| R - Properly connected? | [PASS/FAIL] | <dependencies satisfied> |
| T - Within round limit? | [PASS/FAIL] | <rounds used> |

**Overall:** <PASS / REVISE>

**If REVISE:** <what needs fixing>
```

### 4. Acceptance

When reviewing delivered work, independently verify:

```
## Acceptance Verification

**Task:** <task-name>

### S - Specific
- [ ] All required files exist at expected paths
- [ ] Interfaces match the spec
- [ ] Output format matches requirements

### M - Measurable
- [ ] Build succeeds (tsc --noEmit / cargo check / etc.)
- [ ] Tests pass
- [ ] Manual verification confirms behavior

### A - Achievable
- [ ] No unnecessary dependencies added
- [ ] Solution fits project patterns

### R - Relevant
- [ ] Integration points are correct
- [ ] Follows existing architecture

### T - Time-bound
- [ ] Completed within budget

**Decision:** <ACCEPT / REVISE (round <N+1>)>

**If REVISE:** <specific issues to fix>
**If ACCEPT:** <confirmation of completion>
```

## Tips

- **Be ruthless with S**: Vague Specific leads to the most rework. Include exact file paths and signatures.
- **Verifiable M**: If you can't write a command to check it, it's not measurable.
- **A is often the bottleneck**: If the task requires reading 50 files, it probably exceeds context. Break it down.
- **Keep T realistic**: 2-3 subagent rounds max. Beyond that, decompose into smaller tasks.
- **Revise, don't restart**: Acceptance failures should send clear, actionable feedback — not "start over."
