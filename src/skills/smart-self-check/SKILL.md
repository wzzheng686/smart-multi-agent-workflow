# Smart Self-Check Skill

This skill enables subagents to assess their own work completion against SMART criteria before submitting for review.

## Purpose

Provide a structured self-assessment mechanism that ensures deliverables meet all acceptance criteria and quality standards.

## Self-Check Workflow

### Step 1: Load Task Definition
Read the original SMART task to understand:
- What was requested (specific)
- How to verify completion (measurable)
- Why it matters (relevant)
- When it's due (time-bound)

### Step 2: Check Each SMART Dimension

#### S - Specific Check
- [ ] All requested functionality implemented
- [ ] No scope creep (didn't add unrequested features)
- [ ] Code follows project conventions

#### M - Measurable Check
- [ ] All deliverables created
- [ ] Tests written and passing
- [ ] Metrics meet thresholds (coverage, performance)
- [ ] Documentation complete

#### A - Achievable Check
- [ ] Solution is practical and maintainable
- [ ] No technical debt introduced
- [ ] Dependencies properly handled

#### R - Relevant Check
- [ ] Aligns with project goals
- [ ] Doesn't conflict with other components
- [ ] Follows architectural patterns

#### T - Time-bound Check
- [ ] Completed within time constraints
- [ ] No outstanding blockers

### Step 3: Generate Self-Check Report

```json
{
  "task_id": "string",
  "subagent_id": "string",
  "check_timestamp": "ISO-8601",
  "completion_percentage": 100,
  "smart_scores": {
    "specific": {
      "score": 0-100,
      "evidence": "description of what was implemented",
      "issues": ["list of any gaps"]
    },
    "measurable": {
      "score": 0-100,
      "evidence": "test results, metrics, deliverables",
      "issues": ["list of any gaps"]
    },
    "achievable": {
      "score": 0-100,
      "evidence": "solution quality assessment",
      "issues": ["list of any concerns"]
    },
    "relevant": {
      "score": 0-100,
      "evidence": "alignment with goals",
      "issues": ["list of any misalignment"]
    },
    "time_bound": {
      "score": 0-100,
      "evidence": "timeline adherence",
      "issues": ["list of any delays"]
    }
  },
  "overall_score": 0-100,
  "deliverables_completed": [
    {
      "name": "deliverable name",
      "path": "file path",
      "status": "complete|partial|missing",
      "evidence": "description or test output"
    }
  ],
  "acceptance_criteria_met": [
    {
      "criterion": "criterion text",
      "met": true|false,
      "evidence": "proof of completion"
    }
  ],
  "issues_found": [
    {
      "severity": "critical|major|minor",
      "description": "issue description",
      "resolution": "how it was resolved or plan to resolve"
    }
  ],
  "confidence_level": "high|medium|low",
  "notes": "additional context or concerns"
}
```

### Step 4: Run Verification Commands

Execute these to gather evidence:

```bash
# Test execution
npm test
# or
pytest
# or
go test ./...

# Code quality
npm run lint
# or
ruff check .
# or
golangci-lint run

# Type checking
npm run typecheck
# or
mypy .
# or
tsc --noEmit

# Build verification
npm run build
```

### Step 5: Attach Evidence

For each deliverable, provide:
- File path and content summary
- Test output showing it works
- Any relevant logs or metrics

## Self-Check Template

```markdown
## Self-Check Report

**Task ID**: [task_id]
**Checked At**: [timestamp]
**Overall Score**: [score]/100

### Deliverables Status
| Deliverable | Status | Evidence |
|-------------|--------|----------|
| [name] | ✅/⚠️/❌ | [proof] |

### Acceptance Criteria
- [ ] [criterion 1]: [met/not met] - [evidence]
- [ ] [criterion 2]: [met/not met] - [evidence]
...

### SMART Scores
- **Specific**: [score]/100
- **Measurable**: [score]/100
- **Achievable**: [score]/100
- **Relevant**: [score]/100
- **Time-bound**: [score]/100

### Issues Found
| Severity | Description | Resolution |
|----------|-------------|------------|
| [level] | [issue] | [fix] |

### Confidence
[High/Medium/Low] - [reasoning]

### Recommendation
[Ready for review / Needs revision / Blocked]
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

## Integration

This skill integrates with:
- **smart-task-definition**: Provides the criteria to check against
- **smart-task-dispatch**: Used after task execution
- **smart-acceptance**: Main agent uses this report for verification

## Tips

1. **Be honest**: Overestimating completion leads to rejection
2. **Provide evidence**: Claims without proof are worthless
3. **List issues**: Better to surface problems now than have them found later
4. **Set realistic confidence**: Don't claim "high" if you're unsure
5. **Include test output**: Raw output is more可信 than summaries