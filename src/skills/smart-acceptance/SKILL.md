# Smart Acceptance Skill

This skill enables main agents to verify subagent deliverables against SMART criteria and make structured acceptance decisions.

## Purpose

Provide a systematic verification process that ensures completed work meets all requirements before being accepted into the project.

## Acceptance Workflow

### Step 1: Receive Deliverables
When a subagent completes a task:
- Review the self-check report
- Note any flagged issues
- Understand the confidence level

### Step 2: Load Original Requirements
Read the original SMART task definition:
- What was requested (specific)
- How to verify (measurable)
- Why it matters (relevant)
- When it's due (time-bound)

### Step 3: Independent Verification

#### Verify Specificity
- [ ] All requested functionality exists
- [ ] Implementation matches requirements exactly
- [ ] No unrequested additions (scope creep)

#### Verify Measurability
- [ ] All deliverables present at specified paths
- [ ] Tests pass with required coverage
- [ ] Metrics meet thresholds
- [ ] Documentation complete

#### Verify Achievability
- [ ] Code quality is acceptable
- [ ] No technical debt introduced
- [ ] Solution is maintainable

#### Verify Relevance
- [ ] Aligns with project architecture
- [ ] Follows coding standards
- [ ] Doesn't break existing functionality

#### Verify Time-bound
- [ ] Completed within deadline
- [ ] No outstanding blockers

### Step 4: Generate Acceptance Report

```json
{
  "task_id": "string",
  "acceptance_id": "unique-identifier",
  "acceptance_timestamp": "ISO-8601",
  "decision": "accepted|rejected|conditional",
  "verifier": "agent identifier",
  "original_task": {
    "task_id": "string",
    "smart_definition": "reference to original task"
  },
  "verification_results": {
    "specific": {
      "passed": true|false,
      "evidence": "what was checked",
      "issues": ["any problems found"]
    },
    "measurable": {
      "passed": true|false,
      "evidence": "metrics, test results",
      "issues": ["any problems found"]
    },
    "achievable": {
      "passed": true|false,
      "evidence": "quality assessment",
      "issues": ["any problems found"]
    },
    "relevant": {
      "passed": true|false,
      "evidence": "alignment check",
      "issues": ["any problems found"]
    },
    "time_bound": {
      "passed": true|false,
      "evidence": "timeline check",
      "issues": ["any problems found"]
    }
  },
  "acceptance_criteria": [
    {
      "criterion": "criterion text",
      "met": true|false,
      "evidence": "proof of verification"
    }
  ],
  "overall_score": 0-100,
  "decision_rationale": "explanation of acceptance decision",
  "conditions": [
    "only for conditional acceptance"
  ],
  "feedback": [
    {
      "type": "praise|improvement|critical",
      "message": "feedback text"
    }
  ],
  "next_steps": [
    "actions to take after acceptance"
  ]
}
```

### Step 5: Verification Commands

Run these independently to verify:

```bash
# Test verification
npm test -- --coverage
# or
pytest --cov
# or
go test -cover ./...

# Build verification
npm run build
# or
cargo build
# or
go build ./...

# Lint verification
npm run lint
# or
ruff check .
# or
golangci-lint run

# Type check
npm run typecheck
# or
mypy .
# or
tsc --noEmit
```

### Step 6: Make Decision

#### Accept
- All criteria met
- No critical issues
- Ready for integration

#### Reject
- Critical criteria not met
- Major quality issues
- Requires significant rework

#### Conditional
- Minor issues that can be fixed
- Accept with required changes
- Set deadline for fixes

## Acceptance Template

```markdown
## Acceptance Report

**Task ID**: [task_id]
**Decision**: ✅ Accepted / ⚠️ Conditional / ❌ Rejected
**Verified By**: [agent identifier]
**Verified At**: [timestamp]

### Verification Summary

| SMART Dimension | Status | Evidence |
|-----------------|--------|----------|
| Specific | ✅/❌ | [evidence] |
| Measurable | ✅/❌ | [evidence] |
| Achievable | ✅/❌ | [evidence] |
| Relevant | ✅/❌ | [evidence] |
| Time-bound | ✅/❌ | [evidence] |

### Deliverables Verified
| Deliverable | Path | Status | Notes |
|-------------|------|--------|-------|
| [name] | [path] | ✅/❌ | [notes] |

### Acceptance Criteria
- [ ] [criterion 1]: ✅/❌ - [evidence]
- [ ] [criterion 2]: ✅/❌ - [evidence]
...

### Issues Found
| Severity | Description | Action Required |
|----------|-------------|-----------------|
| [level] | [issue] | [action] |

### Feedback
- **Strengths**: [what was done well]
- **Improvements**: [what could be better]
- **Critical**: [must fix before acceptance]

### Decision Rationale
[Why this decision was made]

### Next Steps
1. [action 1]
2. [action 2]
...
```

## Quality Gates

### Accept (All must pass)
- [ ] All tests passing
- [ ] Code coverage meets threshold
- [ ] No type/lint errors
- [ ] All deliverables present
- [ ] Documentation complete

### Conditional (Minor issues only)
- [ ] Core functionality works
- [ ] Tests mostly passing
- [ ] Fixable issues identified
- [ ] Timeline allows for fixes

### Reject (Any critical issue)
- [ ] Tests failing
- [ ] Major functionality missing
- [ ] Unacceptable code quality
- [ ] Security vulnerabilities

## Integration

This skill integrates with:
- **smart-task-definition**: Original requirements for verification
- **smart-task-dispatch**: Task that was dispatched
- **smart-self-check**: Subagent's self-assessment report

## Tips

1. **Be thorough**: Don't skip verification steps
2. **Be objective**: Focus on evidence, not feelings
3. **Be constructive**: Feedback should help improvement
4. **Be decisive**: Clear decisions prevent confusion
5. **Document everything**: Decisions need rationale