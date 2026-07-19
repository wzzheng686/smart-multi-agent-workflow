import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  createArchive, 
  installArchive, 
  validateArchive,
  detectPlatform 
} from '../src/skills/smart-workflow-archive/archive';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs for platform detection tests
vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof fs>('fs');
  return {
    ...actual,
    existsSync: vi.fn((p: string) => {
      // Return false for platform directories in mock mode
      if (p === '.opencode' || p === '.claude' || p === '.codex') {
        return false;
      }
      return actual.existsSync(p);
    })
  };
});

describe('Workflow Archive Migration', () => {
  const testDir = path.join(__dirname, '../test-temp');
  const archiveDir = path.join(testDir, 'archive');
  const installDir = path.join(testDir, 'install');

  beforeEach(() => {
    // Create test directories
    fs.mkdirSync(archiveDir, { recursive: true });
    fs.mkdirSync(installDir, { recursive: true });
  });

  afterEach(() => {
    // Clean up test directories
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  describe('Archive Creation', () => {
    it('should create a valid archive', () => {
      const options = {
        sourceDir: path.join(__dirname, '../src'),
        outputDir: archiveDir,
        version: '1.0.0',
        description: 'Test archive',
        author: 'Test Author',
        license: 'MIT',
        platforms: ['opencode']
      };

      createArchive(options);

      // Verify archive structure
      expect(fs.existsSync(path.join(archiveDir, 'meta.json'))).toBe(true);
      expect(fs.existsSync(path.join(archiveDir, 'README.md'))).toBe(true);
      expect(fs.existsSync(path.join(archiveDir, 'skills'))).toBe(true);
      expect(fs.existsSync(path.join(archiveDir, 'schemas'))).toBe(true);
    });

    it('should generate valid meta.json', () => {
      const options = {
        sourceDir: path.join(__dirname, '../src'),
        outputDir: archiveDir,
        version: '1.0.0',
        description: 'Test archive',
        author: 'Test Author',
        license: 'MIT',
        platforms: ['opencode']
      };

      createArchive(options);

      const meta = JSON.parse(
        fs.readFileSync(path.join(archiveDir, 'meta.json'), 'utf-8')
      );

      expect(meta.name).toBeDefined();
      expect(meta.version).toBe('1.0.0');
      expect(meta.description).toBe('Test archive');
      expect(meta.author).toBe('Test Author');
      expect(meta.license).toBe('MIT');
      expect(meta.platforms).toContain('opencode');
    });
  });

  describe('Archive Installation', () => {
    it('should install an archive', () => {
      // First create an archive
      const createOptions = {
        sourceDir: path.join(__dirname, '../src'),
        outputDir: archiveDir,
        version: '1.0.0',
        description: 'Test archive',
        author: 'Test Author',
        license: 'MIT',
        platforms: ['opencode']
      };
      createArchive(createOptions);

      // Then install it
      const installOptions = {
        archiveDir: archiveDir,
        targetDir: installDir,
        platform: 'opencode'
      };

      installArchive(installOptions);

      // Verify installation
      expect(fs.existsSync(path.join(installDir, 'skills'))).toBe(true);
      expect(fs.existsSync(path.join(installDir, 'schemas'))).toBe(true);
    });
  });

  describe('Archive Validation', () => {
    it('should validate a correct archive', () => {
      const options = {
        sourceDir: path.join(__dirname, '../src'),
        outputDir: archiveDir,
        version: '1.0.0',
        description: 'Test archive',
        author: 'Test Author',
        license: 'MIT',
        platforms: ['opencode']
      };
      createArchive(options);

      const result = validateArchive(archiveDir);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject archive without meta.json', () => {
      const result = validateArchive(path.join(testDir, 'empty'));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('meta.json'))).toBe(true);
    });
  });

  describe('Platform Detection', () => {
    it('should detect OpenCode platform', () => {
      // Mock OpenCode environment
      process.env.OPENCODE = 'true';
      const platform = detectPlatform();
      expect(platform).toBe('opencode');
      delete process.env.OPENCODE;
    });

    it('should detect unknown platform', () => {
      // Clear all platform env vars
      delete process.env.OPENCODE;
      delete process.env.CLAUDE_CODE;
      delete process.env.CODEX;
      delete process.env.HERMES;
      
      // fs mock returns false for .opencode/.claude/.codex
      const platform = detectPlatform();
      expect(platform).toBe('unknown');
    });
  });
});