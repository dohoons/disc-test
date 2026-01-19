/**
 * DISC Scoring Algorithm
 * Converts quiz responses to 0-100 scale scores for D, I, S, C
 */

import { discQuestions, QuizResponses } from './questions';

export type DISCType = 'D' | 'I' | 'S' | 'C';

export interface DISCScores {
  dominance: number;      // D score
  influence: number;      // I score
  steadiness: number;     // S score
  conscientiousness: number; // C score
}

export interface DISCProfile {
  primaryType: DISCType;
  secondaryType: DISCType;
  profileName: string;
  scores: DISCScores;
}

/**
 * Calculate raw scores from quiz responses
 * Most Like = +2, Least Like = -1
 */
function calculateRawScores(responses: QuizResponses): Record<DISCType, number> {
  const rawScores: Record<DISCType, number> = {
    D: 0,
    I: 0,
    S: 0,
    C: 0,
  };

  for (const response of responses) {
    const question = discQuestions.find((q) => q.id === response.questionId);
    if (!question) continue;

    // Add +2 for most like
    const mostLikeStatement = question.statements.find(
      (s) => s.id === response.mostLike
    );
    if (mostLikeStatement) {
      rawScores[mostLikeStatement.type] += 2;
    }

    // Add -1 for least like
    const leastLikeStatement = question.statements.find(
      (s) => s.id === response.leastLike
    );
    if (leastLikeStatement) {
      rawScores[leastLikeStatement.type] -= 1;
    }
  }

  return rawScores;
}

/**
 * Normalize raw scores to 0-100 scale
 */
function normalizeScores(rawScores: Record<DISCType, number>): DISCScores {
  // Find min and max for normalization
  const scores = Object.values(rawScores);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore;

  // If all scores are the same, return equal distribution
  if (range === 0) {
    return {
      dominance: 50,
      influence: 50,
      steadiness: 50,
      conscientiousness: 50,
    };
  }

  // Normalize to 0-100 scale
  const normalize = (score: number): number => {
    return Math.round(((score - minScore) / range) * 100);
  };

  return {
    dominance: normalize(rawScores.D),
    influence: normalize(rawScores.I),
    steadiness: normalize(rawScores.S),
    conscientiousness: normalize(rawScores.C),
  };
}

/**
 * Calculate DISC scores from quiz responses
 */
export function calculateDISCScores(responses: QuizResponses): DISCScores {
  const rawScores = calculateRawScores(responses);
  return normalizeScores(rawScores);
}

/**
 * Determine primary and secondary DISC types
 */
export function determineDISCProfile(scores: DISCScores): DISCProfile {
  const scoreEntries = [
    { type: 'D' as DISCType, score: scores.dominance },
    { type: 'I' as DISCType, score: scores.influence },
    { type: 'S' as DISCType, score: scores.steadiness },
    { type: 'C' as DISCType, score: scores.conscientiousness },
  ];

  // Sort by score descending
  const sorted = [...scoreEntries].sort((a, b) => b.score - a.score);

  const primaryType = sorted[0].type;
  const secondaryType = sorted[1].type;
  const profileName = getProfileName(primaryType, secondaryType);

  return {
    primaryType,
    secondaryType,
    profileName,
    scores,
  };
}

/**
 * Get profile name based on primary and secondary types
 */
function getProfileName(primary: DISCType, secondary: DISCType): string {
  const profileNames: Record<string, string> = {
    'DI': 'The Persuader',
    'ID': 'The Promoter',
    'DS': 'The Director',
    'SD': 'The Supportive Leader',
    'DC': 'The Creative Thinker',
    'CD': 'The Perfectionist',
    'IS': 'The Counselor',
    'SI': 'The Supportive Specialist',
    'IC': 'The Evaluator',
    'CI': 'The Analytical People Person',
    'SC': 'The Relational Specialist',
    'CS': 'The Analytical Supporter',
  };

  const key = primary + secondary;
  return profileNames[key] || `The ${primary}${secondary} Type`;
}

/**
 * Validate quiz responses
 */
export function validateResponses(responses: QuizResponses): boolean {
  if (responses.length !== discQuestions.length) {
    return false;
  }

  const questionIds = new Set(responses.map((r) => r.questionId));
  if (questionIds.size !== discQuestions.length) {
    return false;
  }

  // Check that mostLike and leastLike are different
  for (const response of responses) {
    if (response.mostLike === response.leastLike) {
      return false;
    }

    // Check that the statement IDs exist
    const question = discQuestions.find((q) => q.id === response.questionId);
    if (!question) return false;

    const statementIds = question.statements.map((s) => s.id);
    if (!statementIds.includes(response.mostLike) || !statementIds.includes(response.leastLike)) {
      return false;
    }
  }

  return true;
}

/**
 * Get behavioral indicators from DISC scores
 */
export interface BehavioralIndicators {
  decisiveness: number;    // Based on D
  sociability: number;     // Based on I
  patience: number;        // Based on S
  precision: number;       // Based on C
}

export function calculateBehavioralIndicators(scores: DISCScores): BehavioralIndicators {
  return {
    decisiveness: scores.dominance,
    sociability: scores.influence,
    patience: scores.steadiness,
    precision: scores.conscientiousness,
  };
}
