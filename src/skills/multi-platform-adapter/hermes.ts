import * as fs from 'fs';
import { SmartTask } from '../../workflow';
import { 
  PlatformAdapter, 
  TaskOptions, 
  TaskResult, 
  DispatchOptions, 
  DispatchResult,
  SkillResult,
  TestOptions,
  TestResult,
  LintOptions,
  LintResult,
  TypeCheckOptions,
  TypeCheckResult,
  Archive,
  InstallResult,
  ExportOptions,
  ExportResult,
  generateTaskId 
} from './base';

export class HermesAdapter implements PlatformAdapter {
  name = 'hermes';
  version = '1.0.0';

  detect(): boolean {
    return process.env.HERMES === 'true' || fs.existsSync('.hermes');
  }

  createTask(_options: TaskOptions): TaskResult {
    return {
      success: true,
      taskId: generateTaskId(),
      tool: 'task'
    };
  }

  dispatchTask(task: SmartTask, _options: DispatchOptions): DispatchResult {
    const prompt = this.generatePrompt(task);
    
    return {
      success: true,
      prompt,
      tools: ['read', 'write', 'edit', 'bash']
    };
  }

  loadSkill(skillName: string): SkillResult {
    return {
      success: true,
      skillName,
      loadMethod: 'inline_prompt'
    };
  }

  executeSkill(skillName: string, _params: unknown): SkillResult {
    return {
      success: true,
      skillName,
      loadMethod: 'execute_directly'
    };
  }

  runTests(options: TestOptions): TestResult {
    return {
      success: true,
      command: options.command || 'npm test',
      tool: 'bash'
    };
  }

  runLint(options: LintOptions): LintResult {
    return {
      success: true,
      command: options.command || 'npm run lint',
      tool: 'bash'
    };
  }

  runTypeCheck(options: TypeCheckOptions): TypeCheckResult {
    return {
      success: true,
      command: options.command || 'npm run typecheck',
      tool: 'bash'
    };
  }

  installArchive(archive: Archive): InstallResult {
    return {
      success: true,
      message: `Archive installed from ${archive.archiveDir}`
    };
  }

  exportArchive(options: ExportOptions): ExportResult {
    return {
      success: true,
      archivePath: options.outputDir
    };
  }

  private generatePrompt(task: SmartTask): string {
    return `
## Task: ${task.task_id}

### What to Do
${task.specific}

### Why It Matters
${task.relevant}

### Deliverables
${task.deliverables.map((d, i) => `${i + 1}. ${d.name} - ${d.description || 'No description'}`).join('\n')}

### Acceptance Criteria
${task.acceptance_criteria.map(c => `- [ ] ${c.criterion}`).join('\n')}

### Resources
${task.resources.map(r => `- ${r.name} (${r.path || 'N/A'})`).join('\n')}

### Constraints
- Time: ${task.time_bound}
- Quality: Tests must pass, coverage > 90%

### When Done
1. Run tests and verify all pass
2. Generate completion report
3. Submit for review
`;
  }
}