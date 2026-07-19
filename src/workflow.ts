import { v4 as uuidv4 } from 'uuid';
import { validateSmartTask, calculateOverallScore } from './schemas/validator';

export interface SmartTaskInput {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  time_bound: string;
  deliverables?: Deliverable[];
  acceptance_criteria?: Criterion[];
  resources?: Resource[];
  risks?: Risk[];
}

export interface Deliverable {
  name: string;
  type: 'file' | 'function' | 'module' | 'test' | 'documentation' | 'configuration';
  path?: string;
  description?: string;
}

export interface Criterion {
  criterion: string;
  verifiable: boolean;
  method?: string;
}

export interface Resource {
  name: string;
  type: 'file' | 'library' | 'tool' | 'service' | 'permission';
  path?: string;
  required?: boolean;
}

export interface Risk {
  risk: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export interface SmartTask {
  task_id: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  time_bound: string;
  deliverables: Deliverable[];
  acceptance_criteria: Criterion[];
  resources: Resource[];
  risks: Risk[];
  metadata: {
    priority: string;
    complexity: string;
    created_at: string;
  };
}

export interface SelfCheckReport {
  task_id: string;
  subagent_id: string;
  check_timestamp: string;
  completion_percentage: number;
  smart_scores: {
    specific: { score: number; evidence: string };
    measurable: { score: number; evidence: string };
    achievable: { score: number; evidence: string };
    relevant: { score: number; evidence: string };
    time_bound: { score: number; evidence: string };
  };
  overall_score: number;
  deliverables_completed: { name: string; status: string; evidence: string }[];
  acceptance_criteria_met: { criterion: string; met: boolean; evidence: string }[];
  confidence_level: 'high' | 'medium' | 'low';
}

export interface AcceptanceReport {
  task_id: string;
  acceptance_id: string;
  acceptance_timestamp: string;
  decision: 'accepted' | 'rejected' | 'conditional';
  verifier: string;
  original_task: SmartTask;
  verification_results: {
    specific: { passed: boolean; evidence: string };
    measurable: { passed: boolean; evidence: string };
    achievable: { passed: boolean; evidence: string };
    relevant: { passed: boolean; evidence: string };
    time_bound: { passed: boolean; evidence: string };
  };
  overall_score: number;
  decision_rationale: string;
}

export function generateSmartTask(input: SmartTaskInput): SmartTask {
  // Ensure deliverables and acceptance_criteria have at least one item
  const deliverables = input.deliverables && input.deliverables.length > 0 
    ? input.deliverables 
    : [{ name: 'implementation', type: 'module' as const, description: 'Task implementation' }];
  
  const acceptanceCriteria = input.acceptance_criteria && input.acceptance_criteria.length > 0 
    ? input.acceptance_criteria 
    : [{ criterion: 'Task completed successfully', verifiable: true }];

  const task: SmartTask = {
    task_id: `task-${uuidv4().slice(0, 8)}`,
    specific: input.specific,
    measurable: input.measurable,
    achievable: input.achievable,
    relevant: input.relevant,
    time_bound: input.time_bound,
    deliverables,
    acceptance_criteria: acceptanceCriteria,
    resources: input.resources || [],
    risks: input.risks || [],
    metadata: {
      priority: 'medium',
      complexity: 'moderate',
      created_at: new Date().toISOString()
    }
  };

  const validation = validateSmartTask(task);
  if (!validation.valid) {
    throw new Error(`Invalid SMART task: ${validation.errors.join(', ')}`);
  }

  return task;
}

export function generateDispatchPrompt(task: SmartTask): string {
  return `
## Task: ${task.task_id}

### What to Do
${task.specific}

### Why It Matters
${task.relevant}

### Deliverables
${task.deliverables.map((d, i) => `${i + 1}. ${d.name} - ${d.description || 'No description'}`).join('\n')}

### Acceptance Criteria
${task.acceptance_criteria.map(c => `- [ ] ${c.criterion}`).join('\n')}

### Resources
${task.resources.map(r => `- ${r.name} (${r.path || 'N/A'})`).join('\n')}

### Constraints
- Time: ${task.time_bound}
- Quality: Tests must pass, coverage > 90%

### When Done
1. Run self-check using smart-self-check skill
2. Generate completion report
3. Submit for review
`;
}

export function simulateSubagentExecution(task: SmartTask): string {
  return `Task ${task.task_id} completed successfully. All deliverables implemented and tests passing.`;
}

export function generateSelfCheck(task: SmartTask, _result: string): SelfCheckReport {
  const scores = {
    specific: 95,
    measurable: 90,
    achievable: 95,
    relevant: 100,
    time_bound: 95
  };

  return {
    task_id: task.task_id,
    subagent_id: 'subagent-simulated',
    check_timestamp: new Date().toISOString(),
    completion_percentage: 100,
    smart_scores: {
      specific: { score: scores.specific, evidence: 'Implemented as requested' },
      measurable: { score: scores.measurable, evidence: 'Tests passing' },
      achievable: { score: scores.achievable, evidence: 'Solution is practical' },
      relevant: { score: scores.relevant, evidence: 'Aligns with goals' },
      time_bound: { score: scores.time_bound, evidence: 'Completed on time' }
    },
    overall_score: calculateOverallScore(scores),
    deliverables_completed: task.deliverables.map(d => ({
      name: d.name,
      status: 'complete',
      evidence: `${d.name} implemented and working`
    })),
    acceptance_criteria_met: task.acceptance_criteria.map(c => ({
      criterion: c.criterion,
      met: true,
      evidence: 'Verified'
    })),
    confidence_level: 'high'
  };
}

export function verifyAcceptance(
  task: SmartTask,
  _selfCheck: SelfCheckReport,
  verificationResult: {
    specific: { passed: boolean; evidence: string };
    measurable: { passed: boolean; evidence: string };
    achievable: { passed: boolean; evidence: string };
    relevant: { passed: boolean; evidence: string };
    time_bound: { passed: boolean; evidence: string };
  }
): AcceptanceReport {
  const passedCount = Object.values(verificationResult).filter(r => r.passed).length;
  const totalCount = Object.keys(verificationResult).length;
  const overallScore = Math.round((passedCount / totalCount) * 100);

  let decision: 'accepted' | 'rejected' | 'conditional';
  if (passedCount === totalCount) {
    decision = 'accepted';
  } else if (passedCount >= totalCount * 0.8) {
    decision = 'conditional';
  } else {
    decision = 'rejected';
  }

  return {
    task_id: task.task_id,
    acceptance_id: `acc-${task.task_id}-${uuidv4().slice(0, 4)}`,
    acceptance_timestamp: new Date().toISOString(),
    decision,
    verifier: 'main-agent',
    original_task: task,
    verification_results: verificationResult,
    overall_score: overallScore,
    decision_rationale: decision === 'accepted' 
      ? 'All acceptance criteria met' 
      : `${totalCount - passedCount} criteria failed`
  };
}