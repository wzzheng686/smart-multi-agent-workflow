# Contributing to Smart Multi-Agent Workflow

Thank you for your interest in contributing! This document provides guidelines and information about contributing to this project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/smart-multi-agent-workflow/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - A description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node.js version, etc.)

### Suggesting Enhancements

1. Check existing issues and pull requests
2. Create a new issue with:
   - A clear, descriptive title
   - A detailed description of the proposed enhancement
   - Use cases and examples
   - Any relevant mockups or diagrams

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Add or update tests as needed
5. Ensure all tests pass
6. Update documentation if needed
7. Submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/smart-multi-agent-workflow.git

# Navigate to the directory
cd smart-multi-agent-workflow

# Install dependencies
npm install

# Start development
npm run dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run type checking
npm run typecheck

# Run linter
npm run lint
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes (formatting, etc.)
- `refactor:` for code refactoring
- `test:` for adding or updating tests
- `chore:` for maintenance tasks

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit the pull request

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful variable and function names
- Add comments for complex logic

## Testing

- Write unit tests for new functions
- Write integration tests for new features
- Maintain test coverage above 90%
- Test across all supported platforms when possible

## Documentation

- Update README.md for new features
- Add JSDoc comments to public APIs
- Update CHANGELOG.md with your changes
- Add examples for new functionality

## Platform Support

When adding platform-specific features:

1. Implement the feature in the base adapter
2. Add platform-specific overrides if needed
3. Test on all supported platforms
4. Update platform-specific documentation

## Internationalization

When adding new user-facing strings:

1. Add English strings to `en.json`
2. Add Chinese strings to `zh-CN.json`
3. Use the i18n system for all user messages
4. Test with different locale settings

## Questions?

If you have questions about contributing, feel free to:

1. Open an issue with the "question" label
2. Join our discussions in [Discussions](https://github.com/yourusername/smart-multi-agent-workflow/discussions)

Thank you for contributing!