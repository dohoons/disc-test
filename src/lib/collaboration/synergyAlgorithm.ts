/**
 * DISC Collaboration Synergy Algorithm
 * Calculates compatibility and synergy between two DISC profiles
 */

import { DISCProfile, DISCScores } from '../disc/scoring';

export interface SynergyResult {
  synergyScore: number; // 0-100
  compatibilityLevel: '훌륭한 조합' | '좋은 조합' | '보통의 조합' | '도전적인 조합';
  strengths: string[];
  potentialConflicts: string[];
  collaborationTips: string[];
  bestWorkingStyles: string[];
}

/**
 * Get the primary DISC type for a profile based on highest score
 */
function getPrimaryType(scores: DISCScores): 'D' | 'I' | 'S' | 'C' {
  const dims = [
    { type: 'D' as const, score: scores.dominance },
    { type: 'I' as const, score: scores.influence },
    { type: 'S' as const, score: scores.steadiness },
    { type: 'C' as const, score: scores.conscientiousness },
  ];
  dims.sort((a, b) => b.score - a.score);
  return dims[0].type;
}

/**
 * Calculate base compatibility between two DISC types (0-100)
 *
 * Based on standard DISC theory:
 * - D + C: High (task-oriented complementary)
 * - I + S: High (people-oriented complementary)
 * - D + I: Medium-High (both fast, extraverted)
 * - S + C: Medium-High (both cautious, introverted)
 * - D + S: Low (speed vs patience - opposing)
 * - I + C: Low (emotion vs logic - opposing)
 */
function calculateTypeCompatibility(type1: 'D' | 'I' | 'S' | 'C', type2: 'D' | 'I' | 'S' | 'C'): number {
  const compatibilityMatrix: Record<string, number> = {
    'DD': 50,  // Same type - moderate (lack diversity)
    'II': 50,
    'SS': 50,
    'CC': 50,
    'DI': 70,  // Both fast, extraverted - good synergy
    'ID': 70,
    'IS': 70,  // People-oriented - good synergy
    'SI': 70,
    'SC': 70,  // Both cautious, introverted - good synergy
    'CS': 70,
    'DC': 85,  // Task-oriented complementary - excellent
    'CD': 85,
    'DS': 40,  // Speed vs patience - challenging
    'SD': 40,
    'IC': 40,  // Emotion vs logic - challenging
    'CI': 40,
  };

  const key = type1 + type2;
  return compatibilityMatrix[key] ?? 50;
}

/**
 * Calculate the average difference between two DISC score profiles (0-100)
 * Difference = how different their DISC profiles are on average
 */
function calculateDifferenceScore(scores1: DISCScores, scores2: DISCScores): number {
  const diffs = [
    Math.abs(scores1.dominance - scores2.dominance),
    Math.abs(scores1.influence - scores2.influence),
    Math.abs(scores1.steadiness - scores2.steadiness),
    Math.abs(scores1.conscientiousness - scores2.conscientiousness),
  ];

  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}

/**
 * Calculate difference adjustment factor (0.7-1.0)
 *
 * Adjusts the base type compatibility based on how different the actual scores are:
 * - Very similar scores (< 10 diff): 0.7 penalty (lack of diversity)
 * - Moderate difference (10-30 diff): 0.85-1.0 (optimal)
 * - Large difference (> 30 diff): 0.7-0.85 (communication challenges)
 */
function calculateDifferenceAdjustment(diffScore: number): number {
  if (diffScore < 10) {
    // Too similar - reduce for lack of diversity
    return 0.7 + (diffScore / 10) * 0.15; // 0.7-0.85
  } else if (diffScore <= 30) {
    // Optimal range - full benefit
    return 0.85 + ((diffScore - 10) / 20) * 0.15; // 0.85-1.0
  } else {
    // Too different - reduce for communication challenges
    return Math.max(0.7, 1.0 - ((diffScore - 30) / 40) * 0.3); // 0.7-1.0
  }
}

/**
 * Calculate similarity between two score sets (0-100)
 * Used for conflict analysis in same-type pairings
 */
function calculateSimilarity(scores1: DISCScores, scores2: DISCScores): number {
  const diffs = [
    Math.abs(scores1.dominance - scores2.dominance),
    Math.abs(scores1.influence - scores2.influence),
    Math.abs(scores1.steadiness - scores2.steadiness),
    Math.abs(scores1.conscientiousness - scores2.conscientiousness),
  ];

  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  return 100 - avgDiff; // Higher similarity = lower difference
}

/**
 * Get strengths for profile pairings based on DISC scores
 * Returns strengths that are most relevant to the specific combination
 */
function getPairingStrengths(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const s1 = profile1.scores;
  const s2 = profile2.scores;

  // Calculate the dominant dimension for each profile
  const getDominantDims = (scores: DISCScores): string[] => {
    const dims = [
      { dim: 'D', score: scores.dominance },
      { dim: 'I', score: scores.influence },
      { dim: 'S', score: scores.steadiness },
      { dim: 'C', score: scores.conscientiousness },
    ];
    // Sort by score descending
    dims.sort((a, b) => b.score - a.score);
    return [dims[0].dim, dims[1].dim];
  };

  const dims1 = getDominantDims(s1);
  const dims2 = getDominantDims(s2);

  // Build the pairing key based on dominant dimensions
  const allDims = [...new Set([...dims1, ...dims2])].sort();
  const pairingKey = allDims.join('');

  // Detailed strengths based on specific combinations
  const pairingStrengths: Record<string, string[]> = {
    // D-I combinations (including DI-DI, DI-I, D-DI, etc.)
    'DI': [
      '대담한 비전과 매력적인 실행력',
      '강력한 리더십과 설득력 있는 커뮤니케이션',
      '빠른 의사결정과 팀의 동참',
      '다른 사람들을 동기부여하는 목표 지향적 접근',
    ],
    // D-S combinations
    'DS': [
      '결단력 있는 행동과 안정적인 실행',
      '강력한 방향성과 팀 지원',
      '결과 중심적 접근과 신뢰할 수 있는 실행',
      '팀의 필요사항을 고려하는 리더십',
    ],
    // D-C combinations
    'DC': [
      '전략적 사고와 분석적 정확성',
      '상세한 계획으로 뒷받침된 대담한 아이디어',
      '품질 기준에 맞는 효율적 실행',
      '체계적인 접근 방식을 갖는 비전 있는 리더십',
    ],
    // I-S combinations (including DI-SI where I is common)
    'IS': [
      '열정적인 에너지와 안정적인 지원',
      '사람 중심적 접근과 신뢰할 수 있는 마무리',
      '사회적 연결과 팀 조화',
      '영감을 주는 동기부여와 인내심 있는 안내',
    ],
    // I-C combinations
    'IC': [
      '설득력 있는 커뮤니케이션과 데이터 기반 통찰',
      '창의적 사고와 분석적 검증',
      '사람 기술과 품질 중심',
      '혁신적인 아이디어와 정확한 실행',
    ],
    // S-C combinations
    'SC': [
      '신뢰할 수 있는 지원과 품질 기준',
      '인내심 있는 협업과 상세한 계획',
      '일관된 실행과 분석적 사고',
      '팀 조화와 체계적인 접근',
    ],
    // Same type combinations (high similarity)
    'DD': [
      '일관된 방향성과 공유된 비전',
      '빠른 실행과 명확한 목표 설정',
      '상호 이해가 높은 의사소통',
      '과감한 결단으로 빠른 진행',
    ],
    'II': [
      '높은 에너지과 창의적 협업',
      '사람 중심의 긍정적 팀 문화',
      '자연스러운 아이디어 교류',
      '사교적 연결과 네트워킹',
    ],
    'SS': [
      '예측 가능하고 안정적인 협업',
      '신뢰와 일관성 기반의 팀워크',
      '인내심 있는 지원과 협조',
      '갈등 최소화와 조화로운 작업 환경',
    ],
    'CC': [
      '높은 품질 기준과 정확성',
      '체계적인 접근과 상세한 계획',
      '데이터 기반 의사결정',
      '꼼꼼한 실행과 위험 관리',
    ],
    // Three-dimension combinations
    'DIS': [
      '다재다능한 팀 역량',
      '리더십과 사람 중심의 균형',
      '빠른 실행과 팀 조화',
    ],
    'DIC': [
      '전략적 비전과 분석적 실행',
      '혁신과 품질의 조화',
      '데이터 기반 리더십',
    ],
    'DSC': [
      '체계적인 프로젝트 관리',
      '결과 중심과 정확성의 균형',
      '안정적이고 효율적인 실행',
    ],
    'ISC': [
      '사람 중심의 체계적 접근',
      '협업과 품질의 조화',
      '신뢰할 수 있는 분석적 커뮤니케이션',
    ],
    // All four dimensions (well-balanced team)
    'DISC': [
      '균형 잡힌 팀 역량',
      '모든 관점에서의 포괄적 접근',
      '다양한 강점의 시너지',
      '유연한 상황 대응 능력',
    ],
  };

  // Find best matching strength
  if (pairingStrengths[pairingKey]) {
    return pairingStrengths[pairingKey];
  }

  // Fallback to two-dimension combinations
  const twoDimKeys = [
    dims1[0] + dims2[0],
    dims1[0] + dims2[1],
    dims1[1] + dims2[0],
    dims1[1] + dims2[1],
  ].sort();

  for (const key of twoDimKeys) {
    if (pairingStrengths[key]) {
      return pairingStrengths[key];
    }
  }

  return [
    '상호 보완적인 관점과 접근 방식',
    '팀 역량을 강화하는 다양한 기술 세트',
    '상호 학습과 성장의 기회',
  ];
}

/**
 * Get potential conflicts for profile pairings based on DISC scores
 * Returns conflicts that are most relevant to the specific combination
 */
function getPairingConflicts(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const s1 = profile1.scores;
  const s2 = profile2.scores;

  // Calculate the dominant dimension for each profile
  const getDominantDims = (scores: DISCScores): string[] => {
    const dims = [
      { dim: 'D', score: scores.dominance },
      { dim: 'I', score: scores.influence },
      { dim: 'S', score: scores.steadiness },
      { dim: 'C', score: scores.conscientiousness },
    ];
    dims.sort((a, b) => b.score - a.score);
    return [dims[0].dim, dims[1].dim];
  };

  const dims1 = getDominantDims(s1);
  const dims2 = getDominantDims(s2);

  // Build the pairing key
  const allDims = [...new Set([...dims1, ...dims2])].sort();
  const pairingKey = allDims.join('');

  // Calculate similarity (higher similarity = more potential conflicts of same type)
  const similarity = calculateSimilarity(s1, s2);

  // Conflict matrix based on DISC combinations
  const conflictMatrix: Record<string, string[]> = {
    // Same type conflicts (high similarity)
    'DD': similarity > 70 ? [
      '리더십을 둔 권력 다툼',
      '경쟁적인 접근 방식과 자아',
      '둘 다 책임자 위치를 원할 수 있음',
      '서로의 속도에 대한 인내심 부족',
    ] : [
      '의사결정 속도에 대한 차이',
      '상호 존중이 필요한 리더십 스타일',
    ],
    'II': similarity > 70 ? [
      '둘 다 디테일과 마무리를 피할 수 있음',
      '관심과 인정을 위한 경쟁',
      '구조화된 작업에 어려움',
      '행동보다 말을 더 많이 할 수 있음',
    ] : [
      '창의적 아이디어와 실행의 균형 필요',
      '사회적 활동에 집중할 수 있음',
    ],
    'SS': similarity > 70 ? [
      '둘 다 대면과 변화를 피할 수 있음',
      '주도권 행사에 대한 저항',
      '긴급성이나 추진력 부족 가능',
      '무활동 상태가 될 수 있음',
    ] : [
      '변화에 대한 저항',
      '추진력이 필요할 수 있음',
    ],
    'CC': similarity > 70 ? [
      '분석 마비',
      '디테일에 지나치게 집중',
      '빠른 의사결정 어려움',
      '큰 그림을 놓칠 수 있음',
    ] : [
      '과도한 분석 가능성',
      '의사결정 지연',
    ],
    // Complementary type conflicts
    'DI': [
      'D는 I를 산만하거나 피상적으로 느낄 수 있음',
      'I는 D의 요구가 너무 많다고 느낄 수 있음',
      '속도 차이: D는 행동을, I는 상호작용을 원함',
    ],
    'DS': [
      'D의 긴급성과 S의 인내심 충돌',
      'S는 D의 요구로 압박감을 느낄 수 있음',
      'D는 S를 너무 느리거나 수동적으로 느낄 수 있음',
    ],
    'DC': [
      'D의 속도와 C의 신중함의 대립',
      'C는 D를 무모하거나 충동적으로 느낄 수 있음',
      'D는 C를 너무 신중하게 느낄 수 있음',
    ],
    'IS': [
      'I의 자발성과 S의 안정성 필요',
      'I는 S를 너무 예민하게 느낄 수 있음',
      'S는 I를 압도적이거나 신뢰할 수 없다고 느낄 수 있음',
    ],
    'IC': [
      'I의 열정과 C의 신중함의 대립',
      'C는 I를 정리되지 않았다고 느낄 수 있음',
      'I는 C를 너무 비판적이거나 형식적이라고 느낄 수 있음',
    ],
    'SC': [
      'S의 유연성과 C의 구조 필요',
      'C는 S를 부정확하게 느낄 수 있음',
      'S는 C를 너무 경직되었다고 느낄 수 있음',
    ],
    // Three-dimension combinations (more complex dynamics)
    'DIS': [
      '다양한 스타일로 인한 커뮤니케이션 차이',
      '속도와 접근 방식에 대한 합의 필요',
    ],
    'DIC': [
      '분석과 실행의 속도 차이',
      '다양한 의사결정 스타일 조정 필요',
    ],
    'DSC': [
      '속도와 정확성의 균형',
      '리더십과 지원의 역할 명확화',
    ],
    'ISC': [
      '감성과 논리의 균형',
      '속도와 품질의 조화 필요',
    ],
    // All four dimensions
    'DISC': [
      '너무 다양한 의견으로 합의 도달 어려움',
      '역할과 책임의 명확한 정의 필요',
    ],
  };

  // Find best matching conflict
  if (conflictMatrix[pairingKey]) {
    return conflictMatrix[pairingKey];
  }

  // Fallback to two-dimension combinations
  const twoDimKeys = [
    dims1[0] + dims2[0],
    dims1[0] + dims2[1],
    dims1[1] + dims2[0],
    dims1[1] + dims2[1],
  ].sort();

  for (const key of twoDimKeys) {
    if (conflictMatrix[key]) {
      return conflictMatrix[key];
    }
  }

  return [
    '탐색해야 할 다른 커뮤니케이션 스타일',
    '다양한 의사결정 접근 방식',
    '차이점을 이해하고 존중할 필요성',
  ];
}

/**
 * Get collaboration tips for profile pairings based on DISC scores
 */
function getCollaborationTips(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const s1 = profile1.scores;
  const s2 = profile2.scores;

  // Calculate the dominant dimension for each profile
  const getDominantDims = (scores: DISCScores): string[] => {
    const dims = [
      { dim: 'D', score: scores.dominance },
      { dim: 'I', score: scores.influence },
      { dim: 'S', score: scores.steadiness },
      { dim: 'C', score: scores.conscientiousness },
    ];
    dims.sort((a, b) => b.score - a.score);
    return [dims[0].dim, dims[1].dim];
  };

  const dims1 = getDominantDims(s1);
  const dims2 = getDominantDims(s2);

  // Build the pairing key
  const allDims = [...new Set([...dims1, ...dims2])].sort();
  const pairingKey = allDims.join('');

  // Tips matrix based on DISC combinations
  const tipsMatrix: Record<string, string[]> = {
    // Same type combinations
    'DD': [
      '처음에 역할과 책임을 명확히 하세요',
      '전문성별로 리더십 영역을 나누세요',
      '우선순위를 맞추기 위해 정기적인 체크인을 하세요',
      '팀에 도움이 되는 건강한 경쟁을 만드세요',
    ],
    'II': [
      '디테일 지향적인 사람을 지원으로 배정하세요',
      '명확한 프로젝트 구조와 마감기한을 만드세요',
      '서로에게 마무리에 대해 책임을 지게 하세요',
      '사회적 시간과 집중된 작업 시간의 균형을 맞추세요',
    ],
    'SS': [
      '마감기한 중심의 리더를 배정하세요',
      '외부 책임감을 만드세요',
      '주도권을 잡도록 서로에게 도전을 주세요',
      '이정표가 있는 명확한 목표를 설정하세요',
    ],
    'CC': [
      '과도한 분석을 방지하기 위해 엄격한 마감기한 설정',
      '필요시 의사결정자 지정',
      '영향력 높은 분석에만 집중',
      '진행 상황 검토를 위한 체크포인트 생성',
    ],
    // Complementary type combinations
    'DI': [
      'D는 I가 사회적 측면에서 자율성을 갖도록 해야 함',
      'I는 D에게 핵심 결과를 알려야 함',
      'D의 추진력과 I의 설득력을 함께 활용하세요',
      '행동 지향적 작업과 관계 구축의 균형을 맞추세요',
    ],
    'DS': [
      'D는 S의 시간과 프로세스 필요성을 존중해야 함',
      'S는 우려와 아이디어에 대해 말해야 함',
      'D는 목표를 추진하고 S는 팀의 동참을 보장',
      '빠른 성공과 꾸준한 진행을 위한 공간을 만드세요',
    ],
    'DC': [
      'D는 C를 계획 단계에 참여시켜야 함',
      'C는 D에게 간결한 분석을 제공해야 함',
      'D는 실행을 이끌고 C는 품질을 보장',
      '속도와 철저함 모두를 허용하는 타임라인 설정',
    ],
    'IS': [
      'I는 S의 조용한 시간 필요성을 존중해야 함',
      'S는 I의 사회적 제안에 대해 열려 있어야 함',
      'I는 에너지를 가져오고 S는 안정성을 제공',
      '상호작용과 성찰 모두를 위한 공간을 만드세요',
    ],
    'IC': [
      'I는 구조화된 커뮤니케이션을 제공해야 함',
      'C는 I의 창의적인 아이디어에 대해 열려 있어야 함',
      'I는 발표할 수 있고 C는 검증할 수 있음',
      '열정과 정확성의 균형을 맞추세요',
    ],
    'SC': [
      'S는 C의 구조 필요성에 적응해야 함',
      'C는 S의 사람 기여를 인정해야 함',
      '둘 다 신뢰성과 일관성에 탁월함',
      '함께 명확한 프로세스를 만드세요',
    ],
    // Three-dimension combinations
    'DIS': [
      '각자의 강점 영역을 명확히 정의하세요',
      '다양한 의견을 존중하면서도 결정을 내리는 방법 합의',
    ],
    'DIC': [
      '비전, 계획, 실행의 역할 분담',
      '빠른 의사결정과 분석적 검토의 균형',
    ],
    'DSC': [
      '리더십과 지원의 역할 명확화',
      '속도와 품질의 균형을 위한 프로세스 수립',
    ],
    'ISC': [
      '사람과 프로세스 모두를 고려한 접근',
      '창의성과 정확성의 조화',
    ],
    // All four dimensions
    'DISC': [
      '명확한 역할과 책임 정의',
      '다양한 관점을 통합하는 의사결정 프로세스',
    ],
  };

  // Find best matching tips
  if (tipsMatrix[pairingKey]) {
    return tipsMatrix[pairingKey];
  }

  // Fallback to two-dimension combinations
  const twoDimKeys = [
    dims1[0] + dims2[0],
    dims1[0] + dims2[1],
    dims1[1] + dims2[0],
    dims1[1] + dims2[1],
  ].sort();

  for (const key of twoDimKeys) {
    if (tipsMatrix[key]) {
      return tipsMatrix[key];
    }
  }

  return [
    '업무 선호도에 대해 솔직하게 소통하세요',
    '서로의 독특한 강점을 소중히 여기세요',
    '공통 목표에서의 공통점을 찾으세요',
    '함께 효과적으로 일하도록 스타일을 조정하세요',
  ];
}

/**
 * Get best working styles for the pairing based on DISC scores
 */
function getBestWorkingStyles(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const s1 = profile1.scores;
  const s2 = profile2.scores;

  // Calculate the dominant dimension for each profile
  const getDominantDims = (scores: DISCScores): string[] => {
    const dims = [
      { dim: 'D', score: scores.dominance },
      { dim: 'I', score: scores.influence },
      { dim: 'S', score: scores.steadiness },
      { dim: 'C', score: scores.conscientiousness },
    ];
    dims.sort((a, b) => b.score - a.score);
    return [dims[0].dim, dims[1].dim];
  };

  const dims1 = getDominantDims(s1);
  const dims2 = getDominantDims(s2);

  // Build the pairing key
  const allDims = [...new Set([...dims1, ...dims2])].sort();
  const pairingKey = allDims.join('');

  // Working styles matrix based on DISC combinations
  const workingStylesMatrix: Record<string, string[]> = {
    // Same type combinations
    'DD': [
      '빠른 의사결정이 필요한 위기 상황 관리',
      '경쟁적 시장에서의 공격적 성장',
      '단순하고 명확한 구조의 프로젝트',
      '결과 중심의 단기적 목표 달성',
    ],
    'II': [
      '아이디어 발상과 브레인스토밍',
      '마케팅과 홍보 활동',
      '팀 빌딩과 네트워킹 이벤트',
      '고객 관계 구축',
    ],
    'SS': [
      '장기적이고 안정적인 프로젝트',
      '지원 및 서비스 제공',
      '변화 관리가 필요한 조직 개선',
      '일관된 프로세스 실행',
    ],
    'CC': [
      '데이터 분석과 보고',
      '품질 관리 및 프로세스 최적화',
      '위험 평가 및 완화',
      '정밀한 계획과 예산 책정',
    ],
    // Complementary type combinations
    'DI': [
      '행동 계획이 있는 브레인스토밍 세션',
      '프레젠테이션 및 피칭',
      '명확한 목표가 있는 빠른 프로젝트',
      '비전과 매력 모두를 필요로 하는 리더십 역할',
    ],
    'DS': [
      '안정적인 실행이 있는 프로젝트 관리',
      '강력한 지원이 있는 팀 리더십',
      '결단력 있는 행동이 필요한 전환 상황',
      '추진력과 일관성 모두를 필요로 하는 목표',
    ],
    'DC': [
      '전략적 계획 및 실행',
      '품질 개선 이니셔티브',
      '복잡한 문제 해결 프로젝트',
      '비전과 정확성 모두를 필요로 하는 역할',
    ],
    'IS': [
      '팀 빌딩 및 문화 개발',
      '고객 대면 역할',
      '교육 및 개발',
      '조화가 필요한 협업 프로젝트',
    ],
    'IC': [
      '발표가 포함된 연구',
      '이해관계자 커뮤니케이션이 포함된 데이터 분석',
      '제품 개발 및 마케팅',
      '분석과 설득 모두를 필요로 하는 역할',
    ],
    'SC': [
      '품질 보증 및 프로세스 개선',
      '상세한 프로젝트 작업',
      '정확성이 필요한 지원 역할',
      '장기적 계획 및 실행',
    ],
    // Three-dimension combinations
    'DIS': [
      '다기능 팀 프로젝트',
      '변화 관리 및 조직 개발',
      '다양한 이해관계자 참여',
    ],
    'DIC': [
      '전략적 이니셔티브',
      '혁신 프로젝트',
      '비즈니스 플랜 수립',
    ],
    'DSC': [
      '시스템 구축 및 최적화',
      '운영 효율화 프로젝트',
      '프로세스 재설계',
    ],
    'ISC': [
      '고객 경험 개선',
      '서비스 디자인',
      '사용자 중심 설계',
    ],
    // All four dimensions
    'DISC': [
      '전사적 이니셔티브',
      '복잡한 다부서 프로젝트',
      '균형 잡힌 팀 리더십',
    ],
  };

  // Find best matching working styles
  if (workingStylesMatrix[pairingKey]) {
    return workingStylesMatrix[pairingKey];
  }

  // Fallback to two-dimension combinations
  const twoDimKeys = [
    dims1[0] + dims2[0],
    dims1[0] + dims2[1],
    dims1[1] + dims2[0],
    dims1[1] + dims2[1],
  ].sort();

  for (const key of twoDimKeys) {
    if (workingStylesMatrix[key]) {
      return workingStylesMatrix[key];
    }
  }

  return [
    '명확한 역할이 있는 협업 프로젝트',
    '부서 간 이니셔티브',
    '지식 공유 및 멘토링',
    '균형 잡힌 팀 기여',
  ];
}

/**
 * Determine compatibility level based on synergy score
 *
 * Based on standard DISC theory compatibility levels:
 * - 75+ : 훌륭한 조합 (excellent synergy)
 * - 60-74: 좋은 조합 (good synergy)
 * - 45-59: 보통의 조합 (moderate synergy)
 * - < 45 : 도전적인 조합 (challenging)
 */
function determineCompatibilityLevel(
  synergyScore: number
): SynergyResult['compatibilityLevel'] {
  if (synergyScore >= 75) {
    return '훌륭한 조합';
  } else if (synergyScore >= 60) {
    return '좋은 조합';
  } else if (synergyScore >= 45) {
    return '보통의 조합';
  } else {
    return '도전적인 조합';
  }
}

/**
 * Calculate synergy score between two DISC profiles
 *
 * NEW FORMULA (based on standard DISC theory):
 * synergy = type_compatibility * difference_adjustment * balance_bonus
 *
 * Where:
 * - type_compatibility: Base compatibility between DISC types (D+C=85, I+S=70, D+S=40, etc.)
 * - difference_adjustment: Adjustment based on score deviation (0.7-1.0)
 * - balance_bonus: Small bonus for well-balanced profiles (0-10)
 *
 * This approach aligns with standard DISC theory:
 * - D + C = High synergy (task-oriented complementary)
 * - I + S = High synergy (people-oriented complementary)
 * - D + S = Low synergy (speed vs patience - opposing)
 * - I + C = Low synergy (emotion vs logic - opposing)
 *
 * Score differences adjust the base type compatibility:
 * - Very similar scores (< 10): Reduces synergy (lack of diversity)
 * - Moderate difference (10-30): Optimal
 * - Large difference (> 30): Reduces synergy (communication challenges)
 */
export function calculateSynergy(profile1: DISCProfile, profile2: DISCProfile): SynergyResult {
  const type1 = getPrimaryType(profile1.scores);
  const type2 = getPrimaryType(profile2.scores);

  // Base compatibility from DISC type theory
  const typeCompatibility = calculateTypeCompatibility(type1, type2);

  // Adjustment based on actual score differences
  const diffScore = calculateDifferenceScore(profile1.scores, profile2.scores);
  const diffAdjustment = calculateDifferenceAdjustment(diffScore);

  // Calculate profile balance (how well-rounded each profile is)
  // Well-balanced profiles (no extreme scores) get a small bonus
  const calcBalance = (scores: DISCScores): number => {
    const values = [scores.dominance, scores.influence, scores.steadiness, scores.conscientiousness];
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    // Lower range = more balanced = higher bonus
    return Math.max(0, 1 - range / 100);
  };

  const balanceBonus = (calcBalance(profile1.scores) + calcBalance(profile2.scores)) / 2 * 10;

  // Final synergy calculation
  const rawSynergy = typeCompatibility * diffAdjustment + balanceBonus;
  const synergyScore = Math.max(0, Math.min(100, Math.round(rawSynergy)));

  const compatibilityLevel = determineCompatibilityLevel(synergyScore);

  return {
    synergyScore,
    compatibilityLevel,
    strengths: getPairingStrengths(profile1, profile2),
    potentialConflicts: getPairingConflicts(profile1, profile2),
    collaborationTips: getCollaborationTips(profile1, profile2),
    bestWorkingStyles: getBestWorkingStyles(profile1, profile2),
  };
}
