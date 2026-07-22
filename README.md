# Smart Agent

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SMART principles-based workflow for AI agents. Turn vague requests into verifiable tasks, dispatch work to subagents, and verify results.

## Installation

```bash
# Install globally (available to all projects)
npx skills add wzzheng686/smart-agent -g

# Or install to current project only
npx skills add wzzheng686/smart-agent
```

### AI Agent-Assisted Installation

Share this repo link with your agent:

> "Install the smart-agent skill from https://github.com/wzzheng686/smart-agent"

The agent will run `npx skills add` to install it.

### Verify Installation

```bash
npx skills list
# smart-agent should appear in the list
```

## Usage

Load the smart-agent skill in your AI agent, then follow the SMART workflow:

1. **Define** — Structure your task with S/M/A/R/T criteria
2. **Dispatch** — Hand off to a subagent with full context
3. **Self-Check** — Verify output against criteria
4. **Accept** — Review and confirm completion

See [SKILL.md](./SKILL.md) for complete workflow instructions.

## License

MIT