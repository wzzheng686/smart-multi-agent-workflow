import { describe, it, expect, beforeEach } from 'vitest';
import { 
  adapterFactory, 
  OpenCodeAdapter, 
  ClaudeCodeAdapter, 
  CodexAdapter, 
  HermesAdapter 
} from '../src/skills/multi-platform-adapter';
import { generateSmartTask, SmartTaskInput } from '../src/workflow';

describe('Multi-Platform Adapter Integration', () => {
  const testTaskInput: SmartTaskInput = {
    specific: 'Implement user authentication system',
    measurable: 'All tests pass, coverage > 90%',
    achievable: 'Using established patterns and libraries',
    relevant: 'Core security feature required by users',
    time_bound: 'Complete within 2 hours'
  };

  describe('AdapterFactory', () => {
    it('should have all adapters registered', () => {
      const adapters = adapterFactory.listAdapters();
      expect(adapters).toContain('opencode');
      expect(adapters).toContain('claude-code');
      expect(adapters).toContain('codex');
      expect(adapters).toContain('hermes');
    });

    it('should get adapter by name', () => {
      const adapter = adapterFactory.getAdapterByName('opencode');
      expect(adapter).toBeDefined();
      expect(adapter?.name).toBe('opencode');
    });

    it('should check if adapter exists', () => {
      expect(adapterFactory.hasAdapter('opencode')).toBe(true);
      expect(adapterFactory.hasAdapter('nonexistent')).toBe(false);
    });
  });

  describe('OpenCode Adapter', () => {
    let adapter: OpenCodeAdapter;

    beforeEach(() => {
      adapter = new OpenCodeAdapter();
    });

    it('should create task successfully', () => {
      const result = adapter.createTask({ taskName: 'test-task' });
      expect(result.success).toBe(true);
      expect(result.taskId).toBeDefined();
      expect(result.tool).toBe('task');
    });

    it('should dispatch task with prompt', () => {
      const task = generateSmartTask(testTaskInput);
      const result = adapter.dispatchTask(task, {});
      
      expect(result.success).toBe(true);
      expect(result.prompt).toContain('Task:');
      expect(result.prompt).toContain(task.specific);
      expect(result.loadSkills).toContain('smart-self-check');
    });

    it('should run tests', () => {
      const result = adapter.runTests({});
      expect(result.success).toBe(true);
      expect(result.command).toBe('npm test');
    });

    it('should run lint', () => {
      const result = adapter.runLint({});
      expect(result.success).toBe(true);
      expect(result.command).toBe('npm run lint');
    });

    it('should run typecheck', () => {
      const result = adapter.runTypeCheck({});
      expect(result.success).toBe(true);
      expect(result.command).toBe('npm run typecheck');
    });
  });

  describe('Claude Code Adapter', () => {
    let adapter: ClaudeCodeAdapter;

    beforeEach(() => {
      adapter = new ClaudeCodeAdapter();
    });

    it('should create task successfully', () => {
      const result = adapter.createTask({ taskName: 'test-task' });
      expect(result.success).toBe(true);
      expect(result.tool).toBe('Task');
    });

    it('should dispatch task with prompt', () => {
      const task = generateSmartTask(testTaskInput);
      const result = adapter.dispatchTask(task, {});
      
      expect(result.success).toBe(true);
      expect(result.prompt).toContain('Task:');
      expect(result.prompt).toContain('smart-self-check skill');
    });
  });

  describe('Codex Adapter', () => {
    let adapter: CodexAdapter;

    beforeEach(() => {
      adapter = new CodexAdapter();
    });

    it('should create task successfully', () => {
      const result = adapter.createTask({ taskName: 'test-task' });
      expect(result.success).toBe(true);
      expect(result.tool).toBe('task');
    });

    it('should dispatch task with tools', () => {
      const task = generateSmartTask(testTaskInput);
      const result = adapter.dispatchTask(task, {});
      
      expect(result.success).toBe(true);
      expect(result.tools).toContain('read');
      expect(result.tools).toContain('write');
      expect(result.tools).toContain('bash');
    });
  });

  describe('Hermes Adapter', () => {
    let adapter: HermesAdapter;

    beforeEach(() => {
      adapter = new HermesAdapter();
    });

    it('should create task successfully', () => {
      const result = adapter.createTask({ taskName: 'test-task' });
      expect(result.success).toBe(true);
      expect(result.tool).toBe('task');
    });

    it('should dispatch task with tools', () => {
      const task = generateSmartTask(testTaskInput);
      const result = adapter.dispatchTask(task, {});
      
      expect(result.success).toBe(true);
      expect(result.tools).toContain('read');
      expect(result.tools).toContain('write');
      expect(result.tools).toContain('bash');
    });
  });

  describe('Platform Detection', () => {
    it('should return null for unknown platform', () => {
      const adapter = adapterFactory.getAdapter('unknown');
      expect(adapter).toBeNull();
    });

    it('should load skill correctly', () => {
      const adapter = adapterFactory.getAdapterByName('opencode');
      expect(adapter).toBeDefined();
      
      const result = adapter!.loadSkill('smart-self-check');
      expect(result.success).toBe(true);
      expect(result.skillName).toBe('smart-self-check');
    });
  });

  describe('Cross-Platform Compatibility', () => {
    it('should generate compatible prompts across all adapters', () => {
      const task = generateSmartTask(testTaskInput);
      const adapters = ['opencode', 'claude-code', 'codex', 'hermes'];
      
      adapters.forEach(platform => {
        const adapter = adapterFactory.getAdapterByName(platform);
        expect(adapter).toBeDefined();
        
        const result = adapter!.dispatchTask(task, {});
        expect(result.success).toBe(true);
        expect(result.prompt).toContain('Task:');
        expect(result.prompt).toContain(task.specific);
        expect(result.prompt).toContain(task.relevant);
      });
    });

    it('should have consistent task creation across adapters', () => {
      const adapters = ['opencode', 'claude-code', 'codex', 'hermes'];
      
      adapters.forEach(platform => {
        const adapter = adapterFactory.getAdapterByName(platform);
        expect(adapter).toBeDefined();
        
        const result = adapter!.createTask({ taskName: 'test-task' });
        expect(result.success).toBe(true);
        expect(result.taskId).toBeDefined();
      });
    });
  });
});