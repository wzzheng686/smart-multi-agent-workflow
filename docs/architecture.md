# Architecture

This document describes the architecture of the Smart Multi-Agent Workflow system.

## Overview

The system is built around the SMART principles (Specific, Measurable, Achievable, Relevant, Time-bound) and uses a modular architecture with the following key components:

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Agent (Orchestrator)                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SMART Workflow Engine                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Task      │  │   Task      │  │   Self      │         │
│  │ Definition  │  │  Dispatch   │  │   Check     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Acceptance │  │   Workflow  │  │  Multi      │         │
│  │             │  │   Archive   │  │  Platform   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Platform Adapters Layer                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  OpenCode   │  │Claude Code  │  │    Codex    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐                                           │
│  │   Hermes    │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Subagents Layer                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Subagent A  │  │ Subagent B  │  │ Subagent C  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. SMART Task Definition

Defines tasks using SMART criteria:

```typescript
interface SmartTask {
  task_id: string;
  specific: string;      // What to do
  measurable: string;    // How to verify
  achievable: string;    // Why feasible
  relevant: string;      // Why important
  time_bound: string;    // When to complete
  deliverables: Deliverable[];
  acceptance_criteria: Criterion[];
  resources: Resource[];
  risks: Risk[];
  metadata: TaskMetadata;
}
```

### 2. SMART Task Dispatch

Manages task distribution:

- **Dependency Tracking**: Ensures tasks execute in correct order
- **Parallel Execution**: Runs independent tasks simultaneously
- **Load Balancing**: Distributes work across subagents
- **Timeout Management**: Handles task timeouts and retries

### 3. SMART Self-Check

Subagents generate completion reports:

```typescript
interface SelfCheckReport {
  task_id: string;
  subagent_id: string;
  completion_percentage: number;
  smart_scores: SMARTScores;
  overall_score: number;
  deliverables_completed: DeliverableStatus[];
  acceptance_criteria_met: CriterionStatus[];
  confidence_level: 'high' | 'medium' | 'low';
}
```

### 4. SMART Acceptance

Main agents verify task completion:

```typescript
interface AcceptanceReport {
  task_id: string;
  acceptance_id: string;
  decision: 'accepted' | 'rejected' | 'conditional';
  verifier: string;
  verification_results: VerificationResults;
  overall_score: number;
  decision_rationale: string;
}
```

### 5. Multi-Platform Adapter

Isolates platform-specific differences:

```typescript
interface PlatformAdapter {
  name: string;
  detect(): boolean;
  createTask(options: TaskOptions): TaskResult;
  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult;
  loadSkill(skillName: string): SkillResult;
  runTests(options: TestOptions): TestResult;
  // ... more methods
}
```

### 6. i18n Support

Multi-language support:

```typescript
interface I18nManager {
  detectLanguage(): string;
  t(key: string, params?: MessageParams, locale?: string): string;
  setLocale(locale: string): void;
  getAvailableLanguages(): string[];
}
```

## Data Flow

```
1. User creates task → SmartTaskDefinition
2. Main agent validates → SMART criteria check
3. Task dispatched → SmartTaskDispatch
4. Subagent receives → PlatformAdapter.dispatchTask()
5. Subagent works → Executes task
6. Subagent self-checks → SmartSelfCheck
7. Main agent verifies → SmartAcceptance
8. Archive if needed → SmartWorkflowArchive
```

## Error Handling

The system uses a layered error handling approach:

1. **Validation Errors**: Caught during task creation
2. **Dispatch Errors**: Handled with retries and fallbacks
3. **Execution Errors**: Captured in self-check reports
4. **Acceptance Errors**: Documented in acceptance reports

## Extensibility

### Adding New Platforms

1. Create a new adapter implementing `PlatformAdapter`
2. Register with `AdapterFactory`
3. Add platform-specific tests
4. Update documentation

### Adding New Languages

1. Create locale file in `i18n-support/locales/`
2. Add translations
3. Update language detection if needed
4. Test with new locale

### Adding New Skills

1. Create skill directory in `src/skills/`
2. Implement SKILL.md with purpose, architecture, usage
3. Add TypeScript implementation
4. Write tests
5. Update documentation