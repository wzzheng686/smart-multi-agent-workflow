import { describe, it, expect } from 'vitest';
import { validateSmartTask, validateSelfCheck, validateAcceptance } from '../src/schemas/validator';

describe('SMART Task Validation', () => {
  const validTask = {
    task_id: 'test-001',
    specific: 'Implement user authentication with JWT tokens',
    measurable: 'All tests pass with >90% coverage',
    achievable: 'Using existing Express framework',
    relevant: 'Required for security',
    time_bound: 'Complete within 2 hours',
    deliverables: [
      {
        name: 'auth.ts',
        type: 'file',
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

  it('should validate a correct SMART task', () => {
    const result = validateSmartTask(validTask);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject task with missing specific', () => {
    const invalidTask = { ...validTask, specific: '' };
    const result = validateSmartTask(invalidTask);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('specific'))).toBe(true);
  });

  it('should reject task with short specific', () => {
    const invalidTask = { ...validTask, specific: 'Do auth' };
    const result = validateSmartTask(invalidTask);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('shorter') || e.includes('minLength'))).toBe(true);
  });

  it('should reject task with invalid task_id format', () => {
    const invalidTask = { ...validTask, task_id: 'Invalid_ID!' };
    const result = validateSmartTask(invalidTask);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('task_id'))).toBe(true);
  });

  it('should reject task with empty deliverables', () => {
    const invalidTask = { ...validTask, deliverables: [] };
    const result = validateSmartTask(invalidTask);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('deliverables'))).toBe(true);
  });

  it('should reject task with empty acceptance criteria', () => {
    const invalidTask = { ...validTask, acceptance_criteria: [] };
    const result = validateSmartTask(invalidTask);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('acceptance_criteria'))).toBe(true);
  });
});

describe('Self-Check Validation', () => {
  const validSelfCheck = {
    task_id: 'test-001',
    subagent_id: 'subagent-1',
    check_timestamp: '2026-07-19T13:00:00Z',
    completion_percentage: 100,
    smart_scores: {
      specific: { score: 100, evidence: 'Implemented as requested' },
      measurable: { score: 95, evidence: 'Tests passing' },
      achievable: { score: 100, evidence: 'Solution is practical' },
      relevant: { score: 100, evidence: 'Aligns with goals' },
      time_bound: { score: 100, evidence: 'Completed on time' }
    },
    overall_score: 98,
    deliverables_completed: [
      {
        name: 'auth.ts',
        path: 'src/auth.ts',
        status: 'complete',
        evidence: 'File exists and works'
      }
    ],
    acceptance_criteria_met: [
      {
        criterion: 'Tests pass',
        met: true,
        evidence: 'npm test passed'
      }
    ],
    confidence_level: 'high'
  };

  it('should validate a correct self-check', () => {
    const result = validateSelfCheck(validSelfCheck);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject self-check with invalid completion percentage', () => {
    const invalidCheck = { ...validSelfCheck, completion_percentage: 150 };
    const result = validateSelfCheck(invalidCheck);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('completion_percentage'))).toBe(true);
  });

  it('should reject self-check with missing smart_scores', () => {
    const invalidCheck = { ...validSelfCheck, smart_scores: {} };
    const result = validateSelfCheck(invalidCheck);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('smart_scores'))).toBe(true);
  });

  it('should reject self-check with invalid confidence_level', () => {
    const invalidCheck = { ...validSelfCheck, confidence_level: 'very_high' };
    const result = validateSelfCheck(invalidCheck);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('confidence_level'))).toBe(true);
  });
});

describe('Acceptance Validation', () => {
  const validAcceptance = {
    task_id: 'test-001',
    acceptance_id: 'acc-test-001-001',
    acceptance_timestamp: '2026-07-19T13:30:00Z',
    decision: 'accepted',
    verifier: 'main-agent',
    original_task: {
      task_id: 'test-001',
      smart_definition: {
        specific: 'Implement authentication',
        measurable: 'Tests pass',
        achievable: 'Using existing framework',
        relevant: 'Required for security',
        time_bound: '2 hours'
      }
    },
    verification_results: {
      specific: { passed: true, evidence: 'Implemented' },
      measurable: { passed: true, evidence: 'Tests pass' },
      achievable: { passed: true, evidence: 'Practical solution' },
      relevant: { passed: true, evidence: 'Aligns with goals' },
      time_bound: { passed: true, evidence: 'On time' }
    },
    acceptance_criteria: [
      {
        criterion: 'Tests pass',
        met: true,
        evidence: 'npm test passed'
      }
    ],
    overall_score: 95,
    decision_rationale: 'All criteria met'
  };

  it('should validate a correct acceptance', () => {
    const result = validateAcceptance(validAcceptance);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject acceptance with invalid decision', () => {
    const invalidAcceptance = { ...validAcceptance, decision: 'pending' };
    const result = validateAcceptance(invalidAcceptance);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('decision'))).toBe(true);
  });

  it('should reject acceptance with missing verification_results', () => {
    const invalidAcceptance = { ...validAcceptance, verification_results: {} };
    const result = validateAcceptance(invalidAcceptance);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('verification_results'))).toBe(true);
  });

  it('should reject acceptance with empty decision_rationale', () => {
    const invalidAcceptance = { ...validAcceptance, decision_rationale: '' };
    const result = validateAcceptance(invalidAcceptance);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('decision_rationale'))).toBe(true);
  });
});