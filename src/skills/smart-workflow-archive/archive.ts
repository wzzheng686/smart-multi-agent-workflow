import * as fs from 'fs';
import * as path from 'path';
export interface ArchiveOptions {
  sourceDir: string;
  outputDir: string;
  version: string;
  description: string;
  author: string;
  license: string;
  platforms: string[];
  dependencies?: string[];
}

export interface InstallOptions {
  archiveDir: string;
  targetDir: string;
  platform: string;
  force?: boolean;
  validate?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function createArchive(options: ArchiveOptions): void {
  // Create archive structure
  const dirs = ['skills', 'schemas', 'templates', 'adapters', 'examples', 'docs'];
  dirs.forEach(dir => {
    fs.mkdirSync(path.join(options.outputDir, dir), { recursive: true });
  });

  // Generate meta.json
  const meta = {
    name: path.basename(options.outputDir),
    version: options.version,
    description: options.description,
    author: options.author,
    license: options.license,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    platforms: options.platforms,
    skills: [],
    schemas: [],
    templates: [],
    adapters: [],
    dependencies: options.dependencies || []
  };

  fs.writeFileSync(
    path.join(options.outputDir, 'meta.json'),
    JSON.stringify(meta, null, 2)
  );

  // Generate README.md
  const readme = `# ${meta.name}

${meta.description}

## Version
${meta.version}

## Author
${meta.author}

## License
${meta.license}

## Supported Platforms
${meta.platforms.join(', ')}

## Installation

\`\`\`bash
smart-workflow install --archive ./path/to/archive
\`\`\`
`;

  fs.writeFileSync(path.join(options.outputDir, 'README.md'), readme);

  // Copy source files if they exist
  if (fs.existsSync(options.sourceDir)) {
    copyDirectory(options.sourceDir, options.outputDir);
  }
}

function copyDirectory(source: string, target: string): void {
  const items = fs.readdirSync(source);
  
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyDirectory(sourcePath, targetPath);
    } else {
      // Ensure parent directory exists before copying file
      const parentDir = path.dirname(targetPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

export function installArchive(options: InstallOptions): void {
  // Validate archive
  const validation = validateArchive(options.archiveDir);
  if (!validation.valid) {
    throw new Error(`Invalid archive: ${validation.errors.join(', ')}`);
  }

  // Create target directories
  const dirs = ['skills', 'schemas', 'templates', 'adapters', 'examples'];
  dirs.forEach(dir => {
    fs.mkdirSync(path.join(options.targetDir, dir), { recursive: true });
  });

  // Copy archive contents
  fs.readdirSync(options.archiveDir).forEach(item => {
    const sourcePath = path.join(options.archiveDir, item);
    const targetPath = path.join(options.targetDir, item);
    
    if (item === 'meta.json' || item === 'README.md') {
      // Skip meta files
      return;
    }
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

export function validateArchive(archiveDir: string): ValidationResult {
  const errors: string[] = [];

  // Check if meta.json exists
  const metaPath = path.join(archiveDir, 'meta.json');
  if (!fs.existsSync(metaPath)) {
    errors.push('meta.json not found');
    return { valid: false, errors };
  }

  // Validate meta.json structure
  try {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    
    if (!meta.name) errors.push('Missing name in meta.json');
    if (!meta.version) errors.push('Missing version in meta.json');
    if (!meta.description) errors.push('Missing description in meta.json');
    if (!meta.author) errors.push('Missing author in meta.json');
    if (!meta.license) errors.push('Missing license in meta.json');
    if (!meta.platforms || !Array.isArray(meta.platforms)) {
      errors.push('Missing or invalid platforms in meta.json');
    }
  } catch (e) {
    errors.push('Invalid JSON in meta.json');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function detectPlatform(): string {
  if (process.env.OPENCODE) return 'opencode';
  if (process.env.CLAUDE_CODE) return 'claude-code';
  if (process.env.CODEX) return 'codex';
  if (process.env.HERMES) return 'hermes';
  
  // Check for platform-specific files
  if (fs.existsSync('.opencode')) return 'opencode';
  if (fs.existsSync('.claude')) return 'claude-code';
  if (fs.existsSync('.codex')) return 'codex';
  
  return 'unknown';
}

export function listArchives(_platform?: string): string[] {
  // This would scan for installed archives
  // Placeholder implementation
  return [];
}