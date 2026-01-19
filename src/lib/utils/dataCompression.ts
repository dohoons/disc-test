/**
 * Data Compression Utilities
 * Compress and decompress DISC results for URL sharing
 */

import { DISCScores } from '../disc/scoring';
import LZString from 'lz-string';

/**
 * Compressed result data structure
 */
export interface CompressedResult {
  v: number; // Version
  d: number; // Dominance
  i: number; // Influence
  s: number; // Steadiness
  c: number; // Conscientiousness
  pt: string; // Primary type
  st: string; // Secondary type
  ts?: number; // Timestamp
}

/**
 * Shareable result data
 */
export interface ShareableResult {
  scores: DISCScores;
  primaryType: string;
  secondaryType: string;
  profileName: string;
  timestamp?: number;
}

/**
 * Compress result data for URL
 */
export function compressResult(result: ShareableResult): string {
  const data: CompressedResult = {
    v: 1,
    d: result.scores.dominance,
    i: result.scores.influence,
    s: result.scores.steadiness,
    c: result.scores.conscientiousness,
    pt: result.primaryType,
    st: result.secondaryType,
    ts: result.timestamp || Date.now(),
  };

  const jsonString = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(jsonString);
}

/**
 * Decompress result data from URL
 */
export function decompressResult(compressed: string): ShareableResult | null {
  try {
    const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
    if (!jsonString) {
      return null;
    }

    const data: CompressedResult = JSON.parse(jsonString);

    return {
      scores: {
        dominance: data.d,
        influence: data.i,
        steadiness: data.s,
        conscientiousness: data.c,
      },
      primaryType: data.pt,
      secondaryType: data.st,
      profileName: '', // Will be filled by the component
      timestamp: data.ts,
    };
  } catch (error) {
    console.error('Failed to decompress result:', error);
    return null;
  }
}

/**
 * Generate shareable URL
 */
export function generateShareUrl(result: ShareableResult, baseUrl: string = ''): string {
  const compressed = compressResult(result);
  const path = `/shared/${compressed}`;
  return baseUrl + path;
}

/**
 * Validate compressed result data
 */
export function validateCompressedResult(data: CompressedResult): boolean {
  // Check version
  if (data.v !== 1) {
    return false;
  }

  // Check scores are valid numbers in range 0-100
  const scores = [data.d, data.i, data.s, data.c];
  for (const score of scores) {
    if (typeof score !== 'number' || score < 0 || score > 100) {
      return false;
    }
  }

  // Check types are valid
  const validTypes = ['D', 'I', 'S', 'C'];
  if (!validTypes.includes(data.pt) || !validTypes.includes(data.st)) {
    return false;
  }

  // Check timestamp if present
  if (data.ts !== undefined) {
    if (typeof data.ts !== 'number' || data.ts < 0) {
      return false;
    }
  }

  return true;
}

/**
 * Extract result data from URL path
 */
export function extractResultFromPath(path: string): ShareableResult | null {
  // Remove leading/trailing slashes and "shared/" prefix
  const cleanPath = path.replace(/^\/+/, '').replace(/^shared\//, '');

  if (!cleanPath) {
    return null;
  }

  return decompressResult(cleanPath);
}

/**
 * Generate display text for sharing
 */
export function generateShareText(result: ShareableResult): string {
  const scores = result.scores;
  return `My DISC personality profile is ${result.primaryType}${result.secondaryType}!\n\nD: ${scores.dominance} | I: ${scores.influence} | S: ${scores.steadiness} | C: ${scores.conscientiousness}`;
}

/**
 * Compressed collaboration data structure
 */
export interface CompressedCollaboration {
  v: number; // Version
  u: CompressedResult; // User result
  p: CompressedResult; // Partner result
}

/**
 * Shareable collaboration data
 */
export interface ShareableCollaboration {
  userResults: ShareableResult;
  partnerResults: ShareableResult;
  timestamp?: number;
}

/**
 * Compress collaboration data for URL
 */
export function compressCollaboration(collaboration: ShareableCollaboration): string {
  const data: CompressedCollaboration = {
    v: 2, // Version 2 for collaboration
    u: {
      v: 1,
      d: collaboration.userResults.scores.dominance,
      i: collaboration.userResults.scores.influence,
      s: collaboration.userResults.scores.steadiness,
      c: collaboration.userResults.scores.conscientiousness,
      pt: collaboration.userResults.primaryType,
      st: collaboration.userResults.secondaryType,
    },
    p: {
      v: 1,
      d: collaboration.partnerResults.scores.dominance,
      i: collaboration.partnerResults.scores.influence,
      s: collaboration.partnerResults.scores.steadiness,
      c: collaboration.partnerResults.scores.conscientiousness,
      pt: collaboration.partnerResults.primaryType,
      st: collaboration.partnerResults.secondaryType,
    },
  };

  const jsonString = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(jsonString);
}

/**
 * Decompress collaboration data from URL
 */
export function decompressCollaboration(compressed: string): ShareableCollaboration | null {
  try {
    const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
    if (!jsonString) {
      return null;
    }

    const data: CompressedCollaboration = JSON.parse(jsonString);

    // Check version
    if (data.v !== 2) {
      return null;
    }

    return {
      userResults: {
        scores: {
          dominance: data.u.d,
          influence: data.u.i,
          steadiness: data.u.s,
          conscientiousness: data.u.c,
        },
        primaryType: data.u.pt,
        secondaryType: data.u.st,
        profileName: '', // Will be filled by the component
      },
      partnerResults: {
        scores: {
          dominance: data.p.d,
          influence: data.p.i,
          steadiness: data.p.s,
          conscientiousness: data.p.c,
        },
        primaryType: data.p.pt,
        secondaryType: data.p.st,
        profileName: '', // Will be filled by the component
      },
    };
  } catch (error) {
    console.error('Failed to decompress collaboration:', error);
    return null;
  }
}

/**
 * Generate shareable collaboration URL
 */
export function generateCollaborationShareUrl(collaboration: ShareableCollaboration, baseUrl: string = ''): string {
  const compressed = compressCollaboration(collaboration);
  const path = `/collab-share/${compressed}`;
  return baseUrl + path;
}
