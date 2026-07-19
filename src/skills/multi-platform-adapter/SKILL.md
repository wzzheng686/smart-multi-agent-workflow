# Multi-Platform Adapter Skill

This skill provides a unified interface for adapting SMART workflow to different agent platforms.

## Purpose

Isolate platform-specific differences and provide a consistent API for SMART workflow operations across OpenCode, Claude Code, Codex, and Hermes platforms.

## Architecture

```
adapters/
├── base.ts              # Base adapter interface
├── opencode.ts          # OpenCode adapter
├── claude-code.ts       # Claude Code adapter
├── codex.ts             # Codex adapter
├── hermes.ts            # Hermes adapter
└── index.ts             # Adapter factory
```

## Base Adapter Interface

```typescript
interface PlatformAdapter {
  name: string;
  version: string;
  
  // Platform detection
  detect(): boolean;
  
  // Task operations
  createTask(options: TaskOptions): TaskResult;
  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult;
  
  // Skill operations
  loadSkill(skillName: string): SkillResult;
  executeSkill(skillName: string, params: unknown): SkillResult;
  
  // Verification operations
  runTests(options: TestOptions): TestResult;
  runLint(options: LintOptions): LintResult;
  runTypeCheck(options: TypeCheckOptions): TypeCheckResult;
  
  // Archive operations
  installArchive(archive: Archive): InstallResult;
  exportArchive(options: ExportOptions): ExportResult;
}
```

## Platform-Specific Implementations

### OpenCode Adapter

```typescript
class OpenCodeAdapter implements PlatformAdapter {
  name = 'opencode';
  version = '1.0.0';

  detect(): boolean {
    return process.env.OPENCODE === 'true' || fs.existsSync('.opencode');
  }

  createTask(options: TaskOptions): TaskResult {
    // OpenCode uses task() tool
    return {
      success: true,
      taskId: generateTaskId(),
      tool: 'task'
    };
  }

  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult {
    // Generate OpenCode-compatible prompt
    const prompt = this.generateOpenCodePrompt(task);
    
    return {
      success: true,
      prompt,
      loadSkills: ['smart-self-check', 'verification-before-completion']
    };
  }

  loadSkill(skillName: string): SkillResult {
    // OpenCode loads skills via load_skills parameter
    return {
      success: true,
      skillName,
      loadMethod: 'load_skills'
    };
  }

  runTests(options: TestOptions): TestResult {
    // OpenCode uses bash tool
    const command = options.command || 'npm test';
    return {
      success: true,
      command,
      tool: 'bash'
    };
  }

  private generateOpenCodePrompt(task: SmartTask): string {
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

### When Done
1. Run self-check using smart-self-check skill
2. Generate completion report
3. Submit for review
`;
  }
}
```

### Claude Code Adapter

```typescript
class ClaudeCodeAdapter implements PlatformAdapter {
  name = 'claude-code';
  version = '1.0.0';

  detect(): boolean {
    return process.env.CLAUDE_CODE === 'true' || fs.existsSync('.claude');
  }

  createTask(options: TaskOptions): TaskResult {
    return {
      success: true,
      taskId: generateTaskId(),
      tool: 'Task'
    };
  }

  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult {
    const prompt = this.generateClaudeCodePrompt(task);
    
    return {
      success: true,
      prompt,
      loadSkills: ['smart-self-check']
    };
  }

  loadSkill(skillName: string): SkillResult {
    return {
      success: true,
      skillName,
      loadMethod: 'include_in_prompt'
    };
  }

  private generateClaudeCodePrompt(task: SmartTask): string {
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

### When Done
1. Run self-check using smart-self-check skill
2. Generate completion report
3. Submit for review

---
Load and follow the smart-self-check skill for self-assessment.
`;
  }
}
```

### Codex Adapter

```typescript
class CodexAdapter implements PlatformAdapter {
  name = 'codex';
  version = '1.0.0';

  detect(): boolean {
    return process.env.CODEX === 'true' || fs.existsSync('.codex');
  }

  createTask(options: TaskOptions): TaskResult {
    return {
      success: true,
      taskId: generateTaskId(),
      tool: 'task'
    };
  }

  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult {
    const prompt = this.generateCodexPrompt(task);
    
    return {
      success: true,
      prompt,
      tools: ['read', 'write', 'edit', 'bash']
    };
  }

  private generateCodexPrompt(task: SmartTask): string {
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

### When Done
1. Run tests and verify all pass
2. Generate completion report
3. Submit for review
`;
  }
}
```

### Hermes Adapter

```typescript
class HermesAdapter implements PlatformAdapter {
  name = 'hermes';
  version = '1.0.0';

  detect(): boolean {
    return process.env.HERMES === 'true' || fs.existsSync('.hermes');
  }

  createTask(options: TaskOptions): TaskResult {
    return {
      success: true,
      taskId: generateTaskId(),
      tool: 'task'
    };
  }

  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult {
    const prompt = this.generateHermesPrompt(task);
    
    return {
      success: true,
      prompt,
      tools: ['read', 'write', 'edit', 'bash']
    };
  }

  private generateHermesPrompt(task: SmartTask): string {
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

### When Done
1. Run tests and verify all pass
2. Generate completion report
3. Submit for review
`;
  }
}
```

## Adapter Factory

```typescript
class AdapterFactory {
  private adapters: Map<string, PlatformAdapter> = new Map();

  constructor() {
    this.registerAdapter(new OpenCodeAdapter());
    this.registerAdapter(new ClaudeCodeAdapter());
    this.registerAdapter(new CodexAdapter());
    this.registerAdapter(new HermesAdapter());
  }

  registerAdapter(adapter: PlatformAdapter): void {
    this.adapters.set(adapter.name, adapter);
  }

  getAdapter(platform?: string): PlatformAdapter | null {
    if (platform) {
      return this.adapters.get(platform) || null;
    }

    // Auto-detect platform
    for (const adapter of this.adapters.values()) {
      if (adapter.detect()) {
        return adapter;
      }
    }

    return null;
  }

  listAdapters(): string[] {
    return Array.from(this.adapters.keys());
  }
}

export const adapterFactory = new AdapterFactory();
```

## Usage

### Auto-Detect Platform
```typescript
import { adapterFactory } from './skills/multi-platform-adapter';

const adapter = adapterFactory.getAdapter();
if (adapter) {
  console.log(`Detected platform: ${adapter.name}`);
  
  const task = generateSmartTask(input);
  const result = adapter.dispatchTask(task, {});
  console.log(result.prompt);
}
```

### Specify Platform
```typescript
const adapter = adapterFactory.getAdapter('opencode');
const result = adapter.dispatchTask(task, {});
```

### Register Custom Adapter
```typescript
class CustomAdapter implements PlatformAdapter {
  name = 'custom';
  // ... implementation
}

adapterFactory.registerAdapter(new CustomAdapter());
```

## Integration

This skill integrates with:
- **smart-task-definition**: Provides task definitions to adapt
- **smart-task-dispatch**: Uses adapters for platform-specific dispatch
- **smart-self-check**: Adapts self-check for platform
- **smart-acceptance**: Adapts acceptance for platform
- **smart-workflow-archive**: Platform-specific archive operations

## Best Practices

1. **Always detect first**: Use detect() before assuming platform
2. **Keep adapters isolated**: Don't mix platform-specific code
3. **Test all platforms**: Ensure functionality works across platforms
4. **Document platform differences**: Note any platform-specific behaviors
5. **Use factory pattern**: Centralize adapter management