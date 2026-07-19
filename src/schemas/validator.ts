import Ajv from 'ajv';
import taskSchema from './task-schema.json';
import selfCheckSchema from './self-check-schema.json';
import acceptanceSchema from './acceptance-schema.json';

const ajv = new Ajv({ allErrors: true });

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// AJV v6 error object with dataPath (not instancePath)
interface AjvError {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  params: Record<string, unknown>;
  message?: string;
}

function formatErrors(errors: AjvError[] | null | undefined): string[] {
  if (!errors) return [];
  return errors.map(e => {
    // AJV v6 uses dataPath (with leading dot), not instancePath
    const path = e.dataPath || '';
    const message = e.message || 'Unknown error';
    // Extract field name from path (e.g., ".specific" -> "specific")
    const fieldName = path.replace(/^\./, '').replace(/\./g, '.');
    return `${fieldName} ${message}`;
  });
}

export function validateSmartTask(task: unknown): ValidationResult {
  const validate = ajv.compile(taskSchema);
  const valid = validate(task) as boolean;
  
  return {
    valid,
    errors: formatErrors(validate.errors as unknown as AjvError[])
  };
}

export function validateSelfCheck(report: unknown): ValidationResult {
  const validate = ajv.compile(selfCheckSchema);
  const valid = validate(report) as boolean;
  
  return {
    valid,
    errors: formatErrors(validate.errors as unknown as AjvError[])
  };
}

export function validateAcceptance(report: unknown): ValidationResult {
  const validate = ajv.compile(acceptanceSchema);
  const valid = validate(report) as boolean;
  
  return {
    valid,
    errors: formatErrors(validate.errors as unknown as AjvError[])
  };
}

export function generateSmartTaskId(prefix: string = 'task'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateOverallScore(scores: {
  specific: number;
  measurable: number;
  achievable: number;
  relevant: number;
  time_bound: number;
}): number {
  const weights = {
    specific: 0.25,
    measurable: 0.25,
    achievable: 0.20,
    relevant: 0.15,
    time_bound: 0.15
  };
  
  return Math.round(
    scores.specific * weights.specific +
    scores.measurable * weights.measurable +
    scores.achievable * weights.achievable +
    scores.relevant * weights.relevant +
    scores.time_bound * weights.time_bound
  );
}