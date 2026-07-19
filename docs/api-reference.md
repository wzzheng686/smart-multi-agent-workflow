# API Reference

This document provides complete API documentation for the Smart Multi-Agent Workflow system.

## Table of Contents

- [Workflow Module](#workflow-module)
- [Multi-Platform Adapter](#multi-platform-adapter)
- [i18n Support](#i18n-support)
- [Archive Module](#archive-module)

## Workflow Module

### `generateSmartTask(input: SmartTaskInput): SmartTask`

Creates a new SMART task with validation.

**Parameters:**
- `input: SmartTaskInput` - Task definition with SMART criteria

**Returns:**
- `SmartTask` - Validated task with generated ID

**Example:**
```typescript
import { generateSmartTask } from './src/workflow';

const task = generateSmartTask({
  specific: 'Implement user authentication',
  measurable: 'All tests pass',
  achievable: 'Using established patterns',
  relevant: 'Core security feature',
  time_bound: '2 hours'
});
```

### `generateDispatchPrompt(task: SmartTask): string`

Generates a dispatch prompt for the task.

**Parameters:**
- `task: SmartTask` - Task to dispatch

**Returns:**
- `string` - Formatted dispatch prompt

**Example:**
```typescript
import { generateDispatchPrompt } from './src/workflow';

const prompt = generateDispatchPrompt(task);
console.log(prompt);
```

### `generateSelfCheck(task: SmartTask, result: string): SelfCheckReport`

Creates a self-check report for task completion.

**Parameters:**
- `task: SmartTask` - Original task
- `result: string` - Execution result description

**Returns:**
- `SelfCheckReport` - Self-check report with scores

**Example:**
```typescript
import { generateSelfCheck } from './src/workflow';

const report = generateSelfCheck(task, 'All tests passing');
console.log(report.overall_score);
```

### `verifyAcceptance(task, selfCheck, verificationResult): AcceptanceReport`

Verifies task completion and generates acceptance report.

**Parameters:**
- `task: SmartTask` - Original task
- `selfCheck: SelfCheckReport` - Self-check report
- `verificationResult: VerificationResults` - Verification results

**Returns:**
- `AcceptanceReport` - Acceptance decision and report

**Example:**
```typescript
import { verifyAcceptance } from './src/workflow';

const acceptance = verifyAcceptance(task, selfCheck, {
  specific: { passed: true, evidence: 'Implemented' },
  measurable: { passed: true, evidence: 'Tests passing' },
  achievable: { passed: true, evidence: 'Solution practical' },
  relevant: { passed: true, evidence: 'Aligns with goals' },
  time_bound: { passed: true, evidence: 'Completed on time' }
});

console.log(acceptance.decision); // 'accepted'
```

## Multi-Platform Adapter

### `adapterFactory.getAdapter(platform?: string): PlatformAdapter | null`

Gets the appropriate platform adapter.

**Parameters:**
- `platform?: string` - Optional platform name

**Returns:**
- `PlatformAdapter | null` - Adapter or null if not found

**Example:**
```typescript
import { adapterFactory } from './src/skills/multi-platform-adapter';

// Auto-detect platform
const adapter = adapterFactory.getAdapter();

// Specify platform
const opencodeAdapter = adapterFactory.getAdapter('opencode');
```

### `adapterFactory.listAdapters(): string[]`

Lists all available adapters.

**Returns:**
- `string[]` - Array of adapter names

**Example:**
```typescript
import { adapterFactory } from './src/skills/multi-platform-adapter';

const adapters = adapterFactory.listAdapters();
console.log(adapters); // ['opencode', 'claude-code', 'codex', 'hermes']
```

### `adapterFactory.registerAdapter(adapter: PlatformAdapter): void`

Registers a new platform adapter.

**Parameters:**
- `adapter: PlatformAdapter` - Adapter to register

**Example:**
```typescript
import { adapterFactory } from './src/skills/multi-platform-adapter';
import { OpenCodeAdapter } from './src/skills/multi-platform-adapter/opencode';

adapterFactory.registerAdapter(new OpenCodeAdapter());
```

### `PlatformAdapter.detect(): boolean`

Detects if the current platform matches this adapter.

**Returns:**
- `boolean` - True if platform matches

**Example:**
```typescript
const adapter = adapterFactory.getAdapterByName('opencode');
if (adapter?.detect()) {
  console.log('Running on OpenCode');
}
```

### `PlatformAdapter.createTask(options: TaskOptions): TaskResult`

Creates a task on the platform.

**Parameters:**
- `options: TaskOptions` - Task creation options

**Returns:**
- `TaskResult` - Task creation result

**Example:**
```typescript
const result = adapter.createTask({ taskName: 'my-task' });
console.log(result.taskId);
```

### `PlatformAdapter.dispatchTask(task: SmartTask, options: DispatchOptions): DispatchResult`

Dispatches a task to the platform.

**Parameters:**
- `task: SmartTask` - Task to dispatch
- `options: DispatchOptions` - Dispatch options

**Returns:**
- `DispatchResult` - Dispatch result with prompt

**Example:**
```typescript
const result = adapter.dispatchTask(task, {});
console.log(result.prompt);
```

### `PlatformAdapter.runTests(options: TestOptions): TestResult`

Runs tests on the platform.

**Parameters:**
- `options: TestOptions` - Test options

**Returns:**
- `TestResult` - Test result

**Example:**
```typescript
const result = adapter.runTests({ command: 'npm test' });
console.log(result.success);
```

## i18n Support

### `i18n.detectLanguage(): string`

Detects the current language.

**Returns:**
- `string` - Language code (e.g., 'en', 'zh-CN')

**Example:**
```typescript
import { i18n } from './src/skills/i18n-support';

const lang = i18n.detectLanguage();
console.log(lang); // 'en' or 'zh-CN'
```

### `i18n.t(key: string, params?: MessageParams, locale?: string): string`

Translates a message key.

**Parameters:**
- `key: string` - Message key
- `params?: MessageParams` - Interpolation parameters
- `locale?: string` - Optional locale override

**Returns:**
- `string` - Translated message

**Example:**
```typescript
import { i18n } from './src/skills/i18n-support';

const msg = i18n.t('task.created', { taskId: 'task-123' });
console.log(msg); // "Task task-123 created successfully"

// With locale
const msgZh = i18n.t('task.created', { taskId: 'task-123' }, 'zh-CN');
console.log(msgZh); // "任务 task-123 创建成功"
```

### `i18n.setLocale(locale: string): void`

Sets the default locale.

**Parameters:**
- `locale: string` - Locale code

**Example:**
```typescript
import { i18n } from './src/skills/i18n-support';

i18n.setLocale('zh-CN');
```

### `i18n.getAvailableLanguages(): string[]`

Gets available languages.

**Returns:**
- `string[]` - Array of language codes

**Example:**
```typescript
import { i18n } from './src/skills/i18n-support';

const langs = i18n.getAvailableLanguages();
console.log(langs); // ['en', 'zh-CN']
```

## Archive Module

### `createArchive(options: ArchiveOptions): void`

Creates a workflow archive.

**Parameters:**
- `options: ArchiveOptions` - Archive options

**Example:**
```typescript
import { createArchive } from './src/skills/smart-workflow-archive/archive';

createArchive({
  sourceDir: './src',
  outputDir: './archive',
  version: '1.0.0',
  description: 'My workflow archive',
  author: 'Author Name',
  license: 'MIT',
  platforms: ['opencode']
});
```

### `installArchive(options: InstallOptions): void`

Installs a workflow archive.

**Parameters:**
- `options: InstallOptions` - Install options

**Example:**
```typescript
import { installArchive } from './src/skills/smart-workflow-archive/archive';

installArchive({
  archiveDir: './archive',
  targetDir: './installed',
  platform: 'opencode'
});
```

### `validateArchive(archiveDir: string): ValidationResult`

Validates a workflow archive.

**Parameters:**
- `archiveDir: string` - Archive directory path

**Returns:**
- `ValidationResult` - Validation result

**Example:**
```typescript
import { validateArchive } from './src/skills/smart-workflow-archive/archive';

const result = validateArchive('./archive');
console.log(result.valid); // true or false
console.log(result.errors); // [] or error messages
```

### `detectPlatform(): string`

Detects the current platform.

**Returns:**
- `string` - Platform name or 'unknown'

**Example:**
```typescript
import { detectPlatform } from './src/skills/smart-workflow-archive/archive';

const platform = detectPlatform();
console.log(platform); // 'opencode', 'claude-code', etc.
```