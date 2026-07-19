# Smart Workflow Archive Skill

This skill enables archiving and migrating SMART workflow configurations across environments and platforms.

## Purpose

Package SMART workflow configurations (skills, templates, schemas) into portable archives that can be installed in new environments or shared with the community.

## Archive Structure

```
smart-workflow/
├── meta.json                    # Archive metadata
├── README.md                    # Archive documentation
├── skills/                      # Skill implementations
│   ├── smart-task-definition/
│   ├── smart-task-dispatch/
│   ├── smart-self-check/
│   ├── smart-acceptance/
│   └── smart-workflow-archive/
├── schemas/                     # JSON Schemas
│   ├── task-schema.json
│   ├── self-check-schema.json
│   ├── acceptance-schema.json
│   └── meta-schema.json
├── templates/                   # Prompt templates
│   ├── en.json
│   └── zh-CN.json
├── adapters/                    # Platform adapters
│   ├── opencode.ts
│   ├── claude-code.ts
│   ├── codex.ts
│   └── hermes.ts
├── examples/                    # Example files
│   ├── example-task.json
│   ├── example-self-check.json
│   └── example-acceptance.json
└── docs/                        # Documentation
    ├── getting-started.md
    ├── api-reference.md
    └── contributing.md
```

## Archive Operations

### Create Archive

```typescript
interface ArchiveOptions {
  sourceDir: string;           // Source directory to archive
  outputDir: string;           // Output directory for archive
  version: string;             // Semantic version (e.g., "1.0.0")
  description: string;         // Archive description
  author: string;              // Author name
  license: string;             // License identifier (e.g., "MIT")
  platforms: string[];         // Supported platforms
  dependencies?: string[];     // External dependencies
}
```

**Steps:**
1. Validate source directory structure
2. Generate meta.json with metadata
3. Copy all components
4. Create README.md with documentation
5. Validate archive integrity

### Install Archive

```typescript
interface InstallOptions {
  archiveDir: string;          // Archive to install
  targetDir: string;           // Installation target
  platform: string;            // Target platform
  force?: boolean;             // Overwrite existing
  validate?: boolean;          // Validate after install
}
```

**Steps:**
1. Validate archive structure
2. Check platform compatibility
3. Check for conflicts
4. Copy files to target
5. Update platform configuration
6. Validate installation

### Update Archive

```typescript
interface UpdateOptions {
  archiveDir: string;          // Archive to update
  targetDir: string;           // Existing installation
  preserveCustom?: boolean;    // Keep custom modifications
}
```

**Steps:**
1. Compare versions
2. Identify changes
3. Merge updates (respecting preserveCustom)
4. Update metadata
5. Validate update

## Metadata Schema

```json
{
  "name": "smart-workflow",
  "version": "1.0.0",
  "description": "SMART principle multi-agent workflow tools",
  "author": "Author Name",
  "license": "MIT",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "platforms": ["opencode", "claude-code", "codex", "hermes"],
  "skills": [
    "smart-task-definition",
    "smart-task-dispatch",
    "smart-self-check",
    "smart-acceptance",
    "smart-workflow-archive"
  ],
  "schemas": [
    "task-schema.json",
    "self-check-schema.json",
    "acceptance-schema.json",
    "meta-schema.json"
  ],
  "dependencies": [],
  "compatibility": {
    "min_version": "1.0.0",
    "tested_platforms": ["opencode"]
  },
  "changelog": [
    {
      "version": "1.0.0",
      "date": "ISO-8601",
      "changes": ["Initial release"]
    }
  ]
}
```

## Platform Detection

```typescript
function detectPlatform(): string {
  // Check environment variables
  if (process.env.OPENCODE) return 'opencode';
  if (process.env.CLAUDE_CODE) return 'claude-code';
  if (process.env.CODEX) return 'codex';
  
  // Check for platform-specific files
  if (fs.existsSync('.opencode')) return 'opencode';
  if (fs.existsSync('.claude')) return 'claude-code';
  
  return 'unknown';
}
```

## Migration Guide

### From OpenCode to Claude Code
1. Export from OpenCode: `smart-archive export --platform opencode`
2. Import to Claude Code: `smart-archive import --platform claude-code`
3. Verify: Run acceptance checks

### From Local to GitHub
1. Create archive: `smart-archive create --output ./archive`
2. Push to GitHub: Standard git workflow
3. Others install: `smart-archive install --from-github <repo>`

## CLI Commands

```bash
# Create archive
smart-archive create \
  --source ./my-workflow \
  --output ./archive \
  --version 1.0.0 \
  --description "My custom workflow"

# Install archive
smart-archive install \
  --archive ./archive \
  --target ~/.config/opencode/skills \
  --platform opencode

# List installed
smart-archive list --platform opencode

# Update
smart-archive update \
  --archive ./archive \
  --target ~/.config/opencode/skills

# Validate
smart-archive validate --archive ./archive
```

## Integration

This skill integrates with:
- **smart-task-definition**: Archives task definition templates
- **smart-task-dispatch**: Archives dispatch configurations
- **smart-self-check**: Archives self-check templates
- **smart-acceptance**: Archives acceptance criteria

## Best Practices

1. **Version properly**: Use semantic versioning
2. **Document changes**: Always update changelog
3. **Test before archive**: Ensure archive works
4. **Include examples**: Help users understand usage
5. **Keep it minimal**: Only include necessary files