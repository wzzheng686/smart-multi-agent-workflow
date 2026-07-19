# Smart Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

SMART principles-based multi-agent workflow for task quality optimization.

## Features

- **SMART Task Definition**: Define tasks using Specific, Measurable, Achievable, Relevant, and Time-bound criteria
- **Multi-Agent Dispatch**: Intelligent task distribution with dependency management
- **Self-Check Reports**: Subagents generate completion reports for quality assurance
- **Acceptance Verification**: Main agents verify task completion and generate acceptance reports
- **Multi-Platform Support**: Works with OpenCode, Claude Code, Codex, and Hermes
- **Internationalization**: English and Chinese language support

## Installation

### Option 1: Install via npx skills add (Recommended)

The easiest way to install the skill is using the `npx skills add` command:

```bash
# Install globally (available to all projects)
npx skills add wzzheng686/smart-agent -g

# Or install to current project only
npx skills add wzzheng686/smart-agent
```

After installation, the skill will be available in your AI agent's skill list.

### Option 2: AI Agent-Assisted Installation

You can ask your AI agent to install this skill for you. Simply provide this README link to your agent and ask it to follow the installation instructions.

**Example prompts:**
- "Install the smart-agent skill from https://github.com/wzzheng686/smart-agent"
- "Add the smart agent skill to my setup"

The agent will:
1. Clone the repository
2. Copy the SKILL.md to the appropriate skills directory
3. Verify the installation

### Option 3: Manual Installation

```bash
# Clone the repository
git clone https://github.com/wzzheng686/smart-agent.git

# Copy the SKILL.md to your skills directory
# For OpenCode:
cp SKILL.md ~/.config/opencode/skills/smart-agent/

# For Claude Code:
cp SKILL.md ~/.claude/skills/smart-agent/

# For Codex:
cp SKILL.md ~/.codex/skills/smart-agent/
```

### Verify Installation

After installation, verify the skill is available:

```bash
# Check if the skill appears in your agent's skill list
npx skills list

# Or search for it (remote registry only)
npx skills find smart
```

### Search Local Skills

The `npx skills find` command only searches the remote registry. To search locally installed skills, use the included PowerShell script:

```bash
# Search both local and remote skills
.\scripts\smart-find.ps1 -Query "smart"

# Example output:
# Searching for: smart
#
# Local Installed Skills:
#   smart-agent (global)
#   └ C:\Users\you\.agents\skills\smart-agent
#
# Remote Skills:
#   jackwener/opencli@smart-search 13676 installs
#   └ https://skills.sh/...
```

## Quick Start

```typescript
import { generateSmartTask } from './src/workflow';
import { adapterFactory } from './src/skills/multi-platform-adapter';

// Create a SMART task
const task = generateSmartTask({
  specific: 'Implement user authentication system',
  measurable: 'All tests pass, coverage > 90%',
  achievable: 'Using established patterns and libraries',
  relevant: 'Core security feature required by users',
  time_bound: 'Complete within 2 hours'
});

// Get platform adapter
const adapter = adapterFactory.getAdapter();
if (adapter) {
  // Dispatch task
  const result = adapter.dispatchTask(task, {});
  console.log(result.prompt);
}
```

## Architecture

```
src/
├── skills/                 # Core skills
│   ├── smart-task-definition/
│   ├── smart-task-dispatch/
│   ├── smart-self-check/
│   ├── smart-acceptance/
│   ├── smart-workflow-archive/
│   ├── multi-platform-adapter/
│   └── i18n-support/
├── schemas/               # JSON schemas
├── templates/             # Task templates
├── examples/              # Example usage
└── workflow.ts            # Main workflow module
```

## Skills

### SMART Task Definition
Defines tasks using SMART criteria with JSON schema validation.

### SMART Task Dispatch
Manages task distribution with dependency tracking and parallel execution.

### SMART Self-Check
Subagents generate completion reports with SMART scores.

### SMART Acceptance
Main agents verify task completion and generate acceptance reports.

### Workflow Archive
Export and import workflow configurations across environments.

### Multi-Platform Adapter
Platform-specific adapters for OpenCode, Claude Code, Codex, and Hermes.

### i18n Support
Multi-language support for prompts and documentation.

## Supported Platforms

| Platform | Status |
|----------|--------|
| OpenCode | ✅ Supported |
| Claude Code | ✅ Supported |
| Codex | ✅ Supported |
| Hermes | ✅ Supported |

## Internationalization

The system supports multiple languages:

- **English** (primary)
- **Chinese** (secondary)

To switch languages:

```typescript
import { i18n } from './src/skills/i18n-support';

i18n.setLocale('zh-CN');
const message = i18n.t('task.created', { taskId: 'task-123' });
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [llm_wiki](https://github.com/nashsu/llm_wiki) project structure
- Built with TypeScript and modern tooling