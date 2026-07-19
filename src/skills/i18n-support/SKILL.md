# i18n Support Skill

This skill provides internationalization (i18n) support for the SMART workflow system, enabling multi-language documentation, prompts, and user interface elements.

## Purpose

Enable the workflow system to support multiple languages, starting with English (primary) and Chinese (secondary), with extensibility for additional languages.

## Architecture

```
i18n/
├── index.ts              # i18n manager
├── locales/
│   ├── en.json           # English templates
│   └── zh-CN.json        # Chinese templates
└── README.md             # Usage documentation
```

## Core Features

### 1. Language Detection

```typescript
function detectLanguage(): string {
  // Check environment variables
  if (process.env.LANG?.startsWith('zh')) return 'zh-CN';
  if (process.env.LANGUAGE?.startsWith('zh')) return 'zh-CN';
  
  // Check platform-specific settings
  if (process.env.OPENCODE_LANG) return process.env.OPENCODE_LANG;
  
  // Default to English
  return 'en';
}
```

### 2. Template Loading

```typescript
function loadTemplate(locale: string, templateName: string): string {
  const templatePath = path.join(__dirname, 'locales', `${locale}.json`);
  const templates = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  return templates[templateName] || templates['en'][templateName];
}
```

### 3. Message Formatting

```typescript
function formatMessage(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    template
  );
}
```

## Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | en | Primary |
| Chinese | zh-CN | Secondary |
| Japanese | ja | Planned |
| Korean | ko | Planned |

## Usage

### Auto-Detect Language
```typescript
import { i18n } from './skills/i18n-support';

const message = i18n.t('task.created', { taskId: 'task-123' });
console.log(message);
// English: "Task task-123 created successfully"
// Chinese: "任务 task-123 创建成功"
```

### Specify Language
```typescript
const message = i18n.t('task.created', { taskId: 'task-123' }, 'zh-CN');
console.log(message);
// Chinese: "任务 task-123 创建成功"
```

### Get Available Languages
```typescript
const languages = i18n.getAvailableLanguages();
console.log(languages);
// ['en', 'zh-CN']
```

## Template Structure

### en.json
```json
{
  "task": {
    "created": "Task {{taskId}} created successfully",
    "completed": "Task {{taskId}} completed",
    "failed": "Task {{taskId}} failed: {{reason}}"
  },
  "dispatch": {
    "sending": "Dispatching task to {{platform}}...",
    "received": "Task received by {{platform}}"
  },
  "acceptance": {
    "accepted": "Task {{taskId}} accepted with score {{score}}%",
    "rejected": "Task {{taskId}} rejected: {{reason}}"
  }
}
```

### zh-CN.json
```json
{
  "task": {
    "created": "任务 {{taskId}} 创建成功",
    "completed": "任务 {{taskId}} 已完成",
    "failed": "任务 {{taskId}} 失败：{{reason}}"
  },
  "dispatch": {
    "sending": "正在将任务分发到 {{platform}}...",
    "received": "{{platform}} 已接收任务"
  },
  "acceptance": {
    "accepted": "任务 {{taskId}} 已接受，得分 {{score}}%",
    "rejected": "任务 {{taskId}} 被拒绝：{{reason}}"
  }
}
```

## Integration Points

- **smart-task-definition**: Localized task templates
- **smart-task-dispatch**: Localized dispatch prompts
- **smart-self-check**: Localized self-check reports
- **smart-acceptance**: Localized acceptance reports
- **Documentation**: README.md and README_CN.md

## Best Practices

1. **English First**: All templates have English as fallback
2. **Fallback Chain**: Try requested locale → English → raw key
3. **Parameter Interpolation**: Use `{{param}}` syntax
4. **Pluralization**: Future enhancement for plural forms
5. **Context Awareness**: Platform-specific terminology