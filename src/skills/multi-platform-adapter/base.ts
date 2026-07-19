import { SmartTask } from '../../workflow';

export interface TaskOptions {
  taskName: string;
  category?: string;
  priority?: string;
}

export interface TaskResult {
  success: boolean;
  taskId: string;
  tool: string;
}

export interface DispatchOptions {
  loadSkills?: string[];
  category?: string;
  runInBackground?: boolean;
}

export interface DispatchResult {
  success: boolean;
  prompt: string;
  loadSkills?: string[];
  tools?: string[];
}

export interface SkillResult {
  success: boolean;
  skillName: string;
  loadMethod: string;
}

export interface TestOptions {
  command?: string;
  args?: string[];
  workdir?: string;
}

export interface TestResult {
  success: boolean;
  command: string;
  tool: string;
}

export interface LintOptions {
  command?: string;
  args?: string[];
}

export interface LintResult {
  success: boolean;
  command: string;
  tool: string;
}

export interface TypeCheckOptions {
  command?: string;
}

export interface TypeCheckResult {
  success: boolean;
  command: string;
  tool: string;
}

export interface Archive {
  archiveDir: string;
}

export interface InstallResult {
  success: boolean;
  message: string;
}

export interface ExportOptions {
  outputDir: string;
}

export interface ExportResult {
  success: boolean;
  archivePath: string;
}

export interface PlatformAdapter {
  name: string;
  version: string;
  
  detect(): boolean;
  
  createTask(options: TaskOptions): TaskResult;
  dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult;
  
  loadSkill(skillName: string): SkillResult;
  executeSkill(skillName: string, params: unknown): SkillResult;
  
  runTests(options: TestOptions): TestResult;
  runLint(options: LintOptions): LintResult;
  runTypeCheck(options: TypeCheckOptions): TypeCheckResult;
  
  installArchive(archive: Archive): InstallResult;
  exportArchive(options: ExportOptions): ExportResult;
}

function generateTaskId(): string {
  return `task-${Math.random().toString(36).substring(2, 10)}`;
}

export { generateTaskId };