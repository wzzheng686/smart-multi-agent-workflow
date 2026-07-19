# Smart Task Definition Skill

This skill helps you create well-defined tasks using the SMART framework for multi-agent workflows.

## Purpose

Transform abstract task descriptions into concrete, measurable, and verifiable task definitions that subagents can execute and main agents can accept.

## SMART Framework

### S - Specific (具体)
The task description must clearly state:
- What exactly needs to be done
- Who is responsible
- Where it applies
- Why it's needed

### M - Measurable (可衡量)
Define quantifiable criteria:
- Concrete deliverables (files, code, tests)
- Quality metrics (coverage, performance)
- Success indicators

### A - Achievable (可达成)
Ensure the task is realistic:
- Within the subagent's capabilities
- Has access to required resources
- Can be completed within constraints

### R - Relevant (相关性)
Connect to larger goals:
- How it contributes to the overall project
- Dependencies and relationships
- Priority level

### T - Time-bound (时限性)
Set clear deadlines:
- Expected completion time
- Milestones if applicable
- Urgency level

## Usage

### Step 1: Input Analysis
When given a task description, analyze:
- Is it specific enough? If not, ask clarifying questions
- Can completion be measured? If not, define metrics
- Is it achievable given constraints?
- Does it align with project goals?
- What's the expected timeline?

### Step 2: Generate SMART Task
Create a structured task definition:

```json
{
  "task_id": "unique-identifier",
  "specific": "Clear description of what needs to be done",
  "measurable": "How to verify completion (files, tests, metrics)",
  "achievable": "Why this is possible given current context",
  "relevant": "How this contributes to the larger goal",
  "time_bound": "Expected completion time or deadline",
  "deliverables": [
    "List of concrete deliverables"
  ],
  "acceptance_criteria": [
    "Specific conditions that must be met for acceptance"
  ],
  "resources": [
    "Required tools, files, or dependencies"
  ],
  "risks": [
    "Potential blockers or challenges"
  ]
}
```

### Step 3: Validation
Before finalizing:
- [ ] All SMART dimensions are filled
- [ ] Deliverables are concrete and testable
- [ ] Acceptance criteria are verifiable
- [ ] Timeline is realistic
- [ ] Dependencies are identified

## Example

**Input**: "Add user authentication"

**SMART Task**:
```json
{
  "task_id": "auth-001",
  "specific": "Implement JWT-based user authentication with login, logout, and token refresh",
  "measurable": "Auth middleware handles 100% of protected routes, login/logout work end-to-end, token refresh prevents session expiry",
  "achievable": "Using existing Express framework, JWT library already in dependencies, user model exists",
  "relevant": "Required for all user-facing features, blocks profile and settings implementation",
  "time_bound": "Complete within 2 hours, tests must pass",
  "deliverables": [
    "auth-middleware.ts - JWT verification middleware",
    "auth-routes.ts - Login/logout/refresh endpoints",
    "auth.test.ts - Unit tests with 90%+ coverage"
  ],
  "acceptance_criteria": [
    "POST /api/auth/login returns JWT token",
    "POST /api/auth/logout invalidates refresh token",
    "GET /api/auth/refresh generates new access token",
    "Protected routes return 401 without valid token",
    "All tests pass with >90% coverage"
  ],
  "resources": [
    "Express.js framework",
    "jsonwebtoken library",
    "User model from src/models/user.ts"
  ],
  "risks": [
    "Token refresh edge cases need careful handling",
    "Must coordinate with existing session management"
  ]
}
```

## Integration

This skill integrates with:
- **smart-task-dispatch**: Uses SMART tasks for standardized distribution
- **smart-self-check**: Provides criteria for subagent self-assessment
- **smart-acceptance**: Defines acceptance criteria for main agent verification

## Tips

1. **When in doubt, ask**: Better to clarify upfront than fix later
2. **Be concrete**: Vague tasks lead to vague results
3. **Include test criteria**: If you can't test it, you can't verify it
4. **Document risks**: Anticipating problems helps subagents prepare
5. **Keep it focused**: One task, one clear outcome