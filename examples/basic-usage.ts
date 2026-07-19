/**
 * Basic Usage Example
 * 
 * This example demonstrates the core functionality of the
 * Smart Multi-Agent Workflow system.
 */

import { generateSmartTask, generateDispatchPrompt, generateSelfCheck, verifyAcceptance } from '../src/workflow';
import { adapterFactory } from '../src/skills/multi-platform-adapter';
import { i18n } from '../src/skills/i18n-support';

// Set language (optional)
i18n.setLocale('en');

// 1. Create a SMART task
console.log('1. Creating SMART task...');
const task = generateSmartTask({
  specific: 'Implement user authentication system with JWT tokens',
  measurable: 'All tests pass, code coverage > 90%, no security vulnerabilities',
  achievable: 'Using established patterns (bcrypt, jsonwebtoken libraries)',
  relevant: 'Core security feature required by all users',
  time_bound: 'Complete within 2 hours',
  deliverables: [
    {
      name: 'auth.ts',
      type: 'file',
      path: 'src/auth.ts',
      description: 'Authentication module'
    },
    {
      name: 'auth.test.ts',
      type: 'test',
      path: 'tests/auth.test.ts',
      description: 'Unit tests for authentication'
    }
  ],
  acceptance_criteria: [
    {
      criterion: 'User can register with email and password',
      verifiable: true,
      method: 'Run registration test'
    },
    {
      criterion: 'User can login and receive JWT token',
      verifiable: true,
      method: 'Run login test'
    },
    {
      criterion: 'Token expires after 24 hours',
      verifiable: true,
      method: 'Check token expiration'
    }
  ],
  resources: [
    {
      name: 'bcrypt',
      type: 'library',
      required: true
    },
    {
      name: 'jsonwebtoken',
      type: 'library',
      required: true
    }
  ],
  risks: [
    {
      risk: 'Security vulnerabilities',
      impact: 'high',
      mitigation: 'Use established libraries and follow OWASP guidelines'
    }
  ]
});

console.log('Task created:', task.task_id);
console.log('SMART Score:', i18n.t('smart.score', { score: '95' }));

// 2. Get platform adapter
console.log('\n2. Detecting platform...');
const adapter = adapterFactory.getAdapter();
if (adapter) {
  console.log(i18n.t('platform.detected', { platform: adapter.name }));
  
  // 3. Generate dispatch prompt
  console.log('\n3. Generating dispatch prompt...');
  const prompt = generateDispatchPrompt(task);
  console.log('Dispatch prompt generated (length:', prompt.length, 'chars)');
  
  // 4. Simulate task execution
  console.log('\n4. Simulating task execution...');
  const executionResult = 'User authentication implemented with JWT tokens. All tests passing.';
  
  // 5. Generate self-check report
  console.log('\n5. Generating self-check report...');
  const selfCheck = generateSelfCheck(task, executionResult);
  console.log('Self-check score:', selfCheck.overall_score);
  console.log('Confidence level:', selfCheck.confidence_level);
  
  // 6. Verify acceptance
  console.log('\n6. Verifying acceptance...');
  const acceptance = verifyAcceptance(task, selfCheck, {
    specific: { passed: true, evidence: 'Implemented JWT authentication' },
    measurable: { passed: true, evidence: 'All 15 tests passing, coverage 92%' },
    achievable: { passed: true, evidence: 'Using established libraries' },
    relevant: { passed: true, evidence: 'Core security feature' },
    time_bound: { passed: true, evidence: 'Completed in 1.5 hours' }
  });
  
  console.log('Decision:', acceptance.decision);
  console.log('Score:', acceptance.overall_score + '%');
  console.log('Rationale:', acceptance.decision_rationale);
  
  // 7. Display summary
  console.log('\n=== Summary ===');
  console.log('Task:', task.task_id);
  console.log('Platform:', adapter.name);
  console.log('Status:', acceptance.decision);
  console.log('Score:', acceptance.overall_score + '%');
} else {
  console.log('No platform detected. Running in standalone mode.');
}