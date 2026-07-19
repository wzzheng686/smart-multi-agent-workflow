# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0-alpha.1] - 2026-07-19

### Added
- Initial project structure
- SMART Task Definition skill
- SMART Task Dispatch skill
- SMART Self-Check skill
- SMART Acceptance skill
- Workflow Archive skill
- Multi-Platform Adapter skill
- i18n Support skill
- OpenCode adapter
- Claude Code adapter
- Codex adapter
- Hermes adapter
- English and Chinese language support
- MIT License
- GitHub issue templates
- CI/CD workflows
- Comprehensive documentation
- **Agent-agnostic SKILL.md** for cross-platform compatibility
- **npx skills add** installation support
- **AI agent-assisted installation** via README instructions

### Changed
- Renamed skill from `smart-multi-agent-workflow` to `smart-agent`
- Updated SKILL.md to remove platform-specific code examples
- Replaced TypeScript task dispatch patterns with generic markdown templates
- Updated README with multiple installation options

### Deprecated
- N/A

### Removed
- Platform-specific code examples (OpenCode, Claude Code, Codex, Hermes)
- TypeScript-based task dispatch instructions

### Fixed
- Fixed `noPropertyAccessFromIndexSignature` build error in tsconfig.json
- Fixed failing test in migration.test.ts with proper fs mocking

### Security
- N/A

## [0.1.0] - 2026-07-19

### Added
- Initial release
- Core SMART workflow system
- Multi-platform support
- Internationalization support
- Open-source infrastructure

### Features
- SMART task definition with JSON schema validation
- Multi-agent task dispatch with dependency management
- Self-check reports for quality assurance
- Acceptance verification for task completion
- Workflow archive for cross-environment migration
- Platform adapters for OpenCode, Claude Code, Codex, and Hermes
- English and Chinese language support

### Documentation
- README.md (English)
- README_CN.md (Chinese)
- CONTRIBUTING.md (English)
- CONTRIBUTING_CN.md (Chinese)
- CHANGELOG.md
- API documentation

### Testing
- Unit tests for SMART validation
- Integration tests for workflow
- Multi-platform adapter tests
- i18n tests

### Infrastructure
- MIT License
- GitHub issue templates
- CI/CD workflows
- TypeScript configuration
- Package.json with scripts