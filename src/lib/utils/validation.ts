/**
 * Validation Utilities
 * Common validation functions for the application
 */

import { QuizResponses, QuestionResponse } from '../disc/questions';
import { DISCScores } from '../disc/scoring';

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate quiz response
 */
export function isValidQuizResponse(response: QuestionResponse): boolean {
  // Check required fields exist
  if (!response.questionId || !response.mostLike || !response.leastLike) {
    return false;
  }

  // Check mostLike and leastLike are different
  if (response.mostLike === response.leastLike) {
    return false;
  }

  return true;
}

/**
 * Validate complete quiz responses
 */
export function validateQuizResponses(
  responses: QuizResponses,
  totalQuestions: number
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check total number of responses
  if (responses.length !== totalQuestions) {
    errors.push(`Expected ${totalQuestions} responses, got ${responses.length}`);
  }

  // Check for duplicate question IDs
  const questionIds = responses.map((r) => r.questionId);
  const uniqueIds = new Set(questionIds);
  if (uniqueIds.size !== questionIds.length) {
    errors.push('Duplicate question IDs found');
  }

  // Check for duplicate statement selections within a question
  for (const response of responses) {
    if (response.mostLike === response.leastLike) {
      errors.push(`Question ${response.questionId}: Most and Least selections must be different`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate DISC scores
 */
export function validateDISCScores(scores: DISCScores): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check all required fields exist
  const requiredFields: (keyof DISCScores)[] = [
    'dominance',
    'influence',
    'steadiness',
    'conscientiousness',
  ];

  for (const field of requiredFields) {
    if (typeof scores[field] !== 'number') {
      errors.push(`${field} must be a number`);
    } else if (scores[field] < 0 || scores[field] > 100) {
      errors.push(`${field} must be between 0 and 100`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate URL parameter
 */
export function isValidUrlParam(param: string): boolean {
  // Check for empty string
  if (!param || param.trim().length === 0) {
    return false;
  }

  // Check for suspicious characters (basic XSS prevention)
  const dangerousChars = ['<', '>', '"', "'", '\\', '&', ';'];
  for (const char of dangerousChars) {
    if (param.includes(char)) {
      return false;
    }
  }

  return true;
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Validate name input
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
}

/**
 * Validate share URL data
 */
export function validateShareData(data: string): boolean {
  try {
    // Check if it's a valid base64-like string (basic check)
    if (!data || data.length === 0) {
      return false;
    }

    // Check for reasonable length
    if (data.length > 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) {
    return '';
  }

  if (errors.length === 1) {
    return errors[0];
  }

  return errors.map((e, i) => `${i + 1}. ${e}`).join('\n');
}

/**
 * Check if all questions are answered
 */
export function areAllQuestionsAnswered(
  responses: QuizResponses,
  totalQuestions: number
): boolean {
  return responses.length === totalQuestions;
}

/**
 * Get progress percentage
 */
export function getProgressPercentage(
  responses: QuizResponses,
  totalQuestions: number
): number {
  if (totalQuestions === 0) return 0;
  return Math.round((responses.length / totalQuestions) * 100);
}

/**
 * Validate DISC type
 */
export function isValidDISCType(type: string): boolean {
  return ['D', 'I', 'S', 'C'].includes(type);
}
