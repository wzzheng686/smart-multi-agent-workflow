import { describe, it, expect, beforeEach } from 'vitest';
import { 
  generateSmartTask, 
  generateDispatchPrompt, 
  simulateSubagentExecution,
  generateSelfCheck,
  verifyAcceptance 
} from '../src/workflow';

describe('SMART Workflow Integration', () => {
  const taskInput = {
    specific: 'Implement user authentication with JWT tokens',
    measurable: 'All tests pass with >90% coverage',
    achievable: 'Using existing Express framework',
    relevant: 'Required for security',
    time_bound: 'Complete within 2 hours',
    deliverables: [
      {
        name: 'auth.ts',
        type: 'file' as const,
        path: 'src/auth.ts',
        description: 'Authentication module'
      }
    ],
    acceptance_criteria: [
      {
        criterion: 'Tests pass',
        verifiable: true,
        method: 'npm test'
      }
    ]
  };

  describe('Task Definition', () => {
    it('should generate a valid SMART task', () => {
      const task = generateSmartTask(taskInput);
      
      expect(task.task_id).toBeDefined();
      expect(task.specific).toBe(taskInput.specific);
      expect(task.measurable).toBe(taskInput.measurable);
      expect(task.achievable).toBe(taskInput.achievable);
      expect(task.relevant).toBe(taskInput.relevant);
      expect(task.time_bound).toBe(taskInput.time_bound);
      expect(task.deliverables).toHaveLength(1);
      expect(task.acceptance_criteria).toHaveLength(1);
    });

    it('should generate unique task IDs', () => {
      const task1 = generateSmartTask(taskInput);
      const task2 = generateSmartTask(taskInput);
      
      expect(task1.task_id).not.toBe(task2.task_id);
    });
  });

  describe('Dispatch', () => {
    it('should generate a dispatch prompt', () => {
      const task = generateSmartTask(taskInput);
      const prompt = generateDispatchPrompt(task);
      
      expect(prompt).toContain(task.task_id);
      expect(prompt).toContain(task.specific);
      expect(prompt).toContain(task.relevant);
      expect(prompt).toContain('Acceptance Criteria');
      expect(prompt).toContain('When Done');
    });
  });

  describe('Self-Check', () => {
    it('should generate a self-check report', () => {
      const task = generateSmartTask(taskInput);
      const mockResult = 'Implementation complete';
      
      const selfCheck = generateSelfCheck(task, mockResult);
      
      expect(selfCheck.task_id).toBe(task.task_id);
      expect(selfCheck.smart_scores).toBeDefined();
      expect(selfCheck.deliverables_completed).toBeDefined();
      expect(selfCheck.acceptance_criteria_met).toBeDefined();
      expect(selfCheck.confidence_level).toBeDefined();
    });

    it('should calculate scores based on task completion', () => {
      const task = generateSmartTask(taskInput);
      const mockResult = 'All tests pass, implementation complete';
      
      const selfCheck = generateSelfCheck(task, mockResult);
      
      expect(selfCheck.overall_score).toBeGreaterThan(0);
      expect(selfCheck.overall_score).toBeLessThanOrEqual(100);
    });
  });

  describe('Acceptance', () => {
    it('should verify acceptance', () => {
      const task = generateSmartTask(taskInput);
      const selfCheck = generateSelfCheck(task, 'Complete');
      const verificationResult = {
        specific: { passed: true, evidence: 'Implemented' },
        measurable: { passed: true, evidence: 'Tests pass' },
        achievable: { passed: true, evidence: 'Practical' },
        relevant: { passed: true, evidence: 'Aligns' },
        time_bound: { passed: true, evidence: 'On time' }
      };
      
      const acceptance = verifyAcceptance(task, selfCheck, verificationResult);
      
      expect(acceptance.task_id).toBe(task.task_id);
      expect(acceptance.decision).toBeDefined();
      expect(acceptance.overall_score).toBeGreaterThan(0);
      expect(acceptance.decision_rationale).toBeDefined();
    });

    it('should accept when all criteria met', () => {
      const task = generateSmartTask(taskInput);
      const selfCheck = generateSelfCheck(task, 'Complete');
      const verificationResult = {
        specific: { passed: true, evidence: 'Implemented' },
        measurable: { passed: true, evidence: 'Tests pass' },
        achievable: { passed: true, evidence: 'Practical' },
        relevant: { passed: true, evidence: 'Aligns' },
        time_bound: { passed: true, evidence: 'On time' }
      };
      
      const acceptance = verifyAcceptance(task, selfCheck, verificationResult);
      
      expect(acceptance.decision).toBe('accepted');
    });

    it('should reject when critical criteria fail', () => {
      const task = generateSmartTask(taskInput);
      const selfCheck = generateSelfCheck(task, 'Incomplete');
      const verificationResult = {
        specific: { passed: false, evidence: 'Not implemented' },
        measurable: { passed: false, evidence: 'Tests fail' },
        achievable: { passed: true, evidence: 'Practical' },
        relevant: { passed: true, evidence: 'Aligns' },
        time_bound: { passed: true, evidence: 'On time' }
      };
      
      const acceptance = verifyAcceptance(task, selfCheck, verificationResult);
      
      expect(acceptance.decision).toBe('rejected');
    });
  });

  describe('End-to-End Workflow', () => {
    it('should complete the full workflow', () => {
      // 1. Generate task
      const task = generateSmartTask(taskInput);
      expect(task.task_id).toBeDefined();
      
      // 2. Generate dispatch prompt
      const dispatchPrompt = generateDispatchPrompt(task);
      expect(dispatchPrompt).toContain(task.task_id);
      
      // 3. Simulate subagent execution
      const subagentResult = simulateSubagentExecution(task);
      expect(subagentResult).toBeDefined();
      
      // 4. Generate self-check
      const selfCheck = generateSelfCheck(task, subagentResult);
      expect(selfCheck.task_id).toBe(task.task_id);
      
      // 5. Verify acceptance
      const verificationResult = {
        specific: { passed: true, evidence: 'Implemented' },
        measurable: { passed: true, evidence: 'Tests pass' },
        achievable: { passed: true, evidence: 'Practical' },
        relevant: { passed: true, evidence: 'Aligns' },
        time_bound: { passed: true, evidence: 'On time' }
      };
      const acceptance = verifyAcceptance(task, selfCheck, verificationResult);
      expect(acceptance.decision).toBeDefined();
      
      // 6. Verify all artifacts exist
      expect(task).toBeDefined();
      expect(selfCheck).toBeDefined();
      expect(acceptance).toBeDefined();
    });
  });
});