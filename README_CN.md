# 智能多Agent工作流系统

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

基于SMART原则的多Agent工作流系统，用于任务质量和效率优化。

## 特性

- **SMART任务定义**：使用具体、可衡量、可实现、相关性和时限性标准定义任务
- **多Agent分发**：智能任务分配，支持依赖管理
- **自检报告**：Subagent生成完成报告，确保质量保证
- **验收验证**：主Agent验证任务完成情况并生成验收报告
- **多平台支持**：兼容OpenCode、Claude Code、Codex和Hermes
- **国际化**：支持英语和中文

## 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/smart-multi-agent-workflow.git

# 进入目录
cd smart-multi-agent-workflow

# 安装依赖
npm install
```

## 快速开始

```typescript
import { generateSmartTask } from './src/workflow';
import { adapterFactory } from './src/skills/multi-platform-adapter';

// 创建SMART任务
const task = generateSmartTask({
  specific: '实现用户认证系统',
  measurable: '所有测试通过，覆盖率>90%',
  achievable: '使用成熟的设计模式和库',
  relevant: '用户需要的核心安全功能',
  time_bound: '2小时内完成'
});

// 获取平台适配器
const adapter = adapterFactory.getAdapter();
if (adapter) {
  // 分发任务
  const result = adapter.dispatchTask(task, {});
  console.log(result.prompt);
}
```

## 架构

```
src/
├── skills/                 # 核心技能
│   ├── smart-task-definition/
│   ├── smart-task-dispatch/
│   ├── smart-self-check/
│   ├── smart-acceptance/
│   ├── smart-workflow-archive/
│   ├── multi-platform-adapter/
│   └── i18n-support/
├── schemas/               # JSON模式定义
├── templates/             # 任务模板
├── examples/              # 使用示例
└── workflow.ts            # 主工作流模块
```

## 技能

### SMART任务定义
使用SMART标准定义任务，支持JSON模式验证。

### SMART任务分发
管理任务分发，支持依赖跟踪和并行执行。

### SMART自检
Subagent生成完成报告，包含SMART评分。

### SMART验收
主Agent验证任务完成情况并生成验收报告。

### 工作流归档
跨环境导出和导入工作流配置。

### 多平台适配器
针对OpenCode、Claude Code、Codex和Hermes的平台特定适配器。

### 国际化支持
提示和文档的多语言支持。

## 支持的平台

| 平台 | 状态 |
|------|------|
| OpenCode | ✅ 支持 |
| Claude Code | ✅ 支持 |
| Codex | ✅ 支持 |
| Hermes | ✅ 支持 |

## 国际化

系统支持多种语言：

- **英语**（主要）
- **中文**（次要）

切换语言：

```typescript
import { i18n } from './src/skills/i18n-support';

i18n.setLocale('zh-CN');
const message = i18n.t('task.created', { taskId: 'task-123' });
// 输出："任务 task-123 创建成功"
```

## 贡献

请参阅[CONTRIBUTING.md](CONTRIBUTING_CN.md)了解贡献指南。

## 许可证

本项目基于MIT许可证 - 详见[LICENSE](LICENSE)文件。

## 致谢

- 灵感来自[llm_wiki](https://github.com/nashsu/llm_wiki)项目结构
- 使用TypeScript和现代工具构建