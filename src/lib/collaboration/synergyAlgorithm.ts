/**
 * DISC Collaboration Synergy Algorithm
 * Calculates compatibility and synergy between two DISC profiles
 */

import { DISCProfile, DISCScores, DISCType } from '../disc/scoring';

export interface SynergyResult {
  synergyScore: number; // 0-100
  compatibilityLevel: '훌륭한 조합' | '좋은 조합' | '보통의 조합' | '도전적인 조합';
  strengths: string[];
  potentialConflicts: string[];
  collaborationTips: string[];
  bestWorkingStyles: string[];
}

/**
 * Calculate similarity between two score sets
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
 * Calculate complementarity between two profiles
 */
function calculateComplementarity(profile1: DISCProfile, profile2: DISCProfile): number {
  const typePairs: [DISCType, DISCType][] = [
    [profile1.primaryType, profile2.primaryType],
    [profile1.primaryType, profile2.secondaryType],
    [profile1.secondaryType, profile2.primaryType],
  ];

  // Complementary pairings
  const complementaryPairs: Record<string, number> = {
    'DI': 90, // D + I
    'ID': 90,
    'DS': 85, // D + S
    'SD': 85,
    'DC': 95, // D + C
    'CD': 95,
    'IS': 80, // I + S
    'SI': 80,
    'IC': 85, // I + C
    'CI': 85,
    'SC': 75, // S + C
    'CS': 75,
    'DD': 50, // Same types - less complementary
    'II': 50,
    'SS': 50,
    'CC': 50,
  };

  const maxScore = Math.max(...typePairs.map(([t1, t2]) => {
    const key = t1 + t2 as string;
    return complementaryPairs[key] || 60;
  }));

  return maxScore;
}

/**
 * Get strengths for profile pairings
 */
function getPairingStrengths(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const types1 = [profile1.primaryType, profile1.secondaryType].sort().join('');
  const types2 = [profile2.primaryType, profile2.secondaryType].sort().join('');
  const pairing = [types1, types2].sort().join('-');

  const pairingStrengths: Record<string, string[]> = {
    'D-I': [
      '대담한 비전과 매력적인 실행력',
      '강력한 리더십과 설득력 있는 커뮤니케이션',
      '빠른 의사결정과 팀의 동참',
      '다른 사람들을 동기부여하는 목표 지향적 접근',
    ],
    'D-S': [
      '결단력 있는 행동과 안정적인 실행',
      '강력한 방향성과 팀 지원',
      '결과 중심적 접근과 신뢰할 수 있는 실행',
      '팀의 필요사항을 고려하는 리더십',
    ],
    'D-C': [
      '전략적 사고와 분석적 정확성',
      '상세한 계획으로 뒷받침된 대담한 아이디어',
      '품질 기준에 맞는 효율적 실행',
      '체계적인 접근 방식을 갖는 비전 있는 리더십',
    ],
    'I-S': [
      '열정적인 에너지와 안정적인 지원',
      '사람 중심적 접근과 신뢰할 수 있는 마무리',
      '사회적 연결과 팀 조화',
      '영감을 주는 동기부여와 인내심 있는 안내',
    ],
    'I-C': [
      '설득력 있는 커뮤니케이션과 데이터 기반 통찰',
      '창의적 사고와 분석적 검증',
      '사람 기술과 품질 중심',
      '혁신적인 아이디어와 정확한 실행',
    ],
    'S-C': [
      '신뢰할 수 있는 지원과 품질 기준',
      '인내심 있는 협업과 상세한 계획',
      '일관된 실행과 분석적 사고',
      '팀 조화와 체계적인 접근',
    ],
  };

  // Find matching pairing
  for (const [key, strengths] of Object.entries(pairingStrengths)) {
    if (pairing.includes(key)) {
      return strengths;
    }
  }

  return [
    '상호 보완적인 관점과 접근 방식',
    '팀 역량을 강화하는 다양한 기술 세트',
    '상호 학습과 성장의 기회',
  ];
}

/**
 * Get potential conflicts for profile pairings
 */
function getPairingConflicts(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const p1 = profile1.primaryType;
  const p2 = profile2.primaryType;

  const conflictMatrix: Record<string, string[]> = {
    'D-D': [
      '리더십을 둔 권력 다툼',
      '경쟁적인 접근 방식과 자아',
      '둘 다 책임자 위치를 원할 수 있음',
      '서로의 속도에 대한 인내심 부족',
    ],
    'D-I': [
      'D는 I를 산만하거나 피상적으로 느낄 수 있음',
      'I는 D의 요구가 너무 많다고 느낄 수 있음',
      '속도 차이: D는 행동을, I는 상호작용을 원함',
    ],
    'D-S': [
      'D의 긴급성과 S의 인내심 충돌',
      'S는 D의 요구로 압박감을 느낄 수 있음',
      'D는 S를 너무 느리거나 수동적으로 느낄 수 있음',
    ],
    'D-C': [
      'D의 속도와 C의 신중함의 대립',
      'C는 D를 무모하거나 충동적으로 느낄 수 있음',
      'D는 C를 너무 신중하게 느낄 수 있음',
    ],
    'I-I': [
      '둘 다 디테일과 마무리를 피할 수 있음',
      '관심과 인정을 위한 경쟁',
      '구조화된 작업에 어려움',
      '행동보다 말을 더 많이 할 수 있음',
    ],
    'I-S': [
      'I의 자발성과 S의 안정성 필요',
      'I는 S를 너무 예민하게 느낄 수 있음',
      'S는 I를 압도적이거나 신뢰할 수 없다고 느낄 수 있음',
    ],
    'I-C': [
      'I의 열정과 C의 신중함의 대립',
      'C는 I를 정리되지 않았다고 느낄 수 있음',
      'I는 C를 너무 비판적이거나 형식적이라고 느낄 수 있음',
    ],
    'S-S': [
      '둘 다 대면과 변화를 피할 수 있음',
      '주도권 행사에 대한 저항',
      '긴급성이나 추진력 부족 가능',
      '무활동 상태가 될 수 있음',
    ],
    'S-C': [
      'S의 유연성과 C의 구조 필요',
      'C는 S를 부정확하게 느낄 수 있음',
      'S는 C를 너무 경직되었다고 느낄 수 있음',
    ],
    'C-C': [
      '분석 마비',
      '디테일에 지나치게 집중',
      '빠른 의사결정 어려움',
      '큰 그림을 놓칠 수 있음',
    ],
  };

  const key = [p1, p2].sort().join('');
  return conflictMatrix[key] || [
    '탐색해야 할 다른 커뮤니케이션 스타일',
    '다양한 의사결정 접근 방식',
    '차이점을 이해하고 존중할 필요성',
  ];
}

/**
 * Get collaboration tips for profile pairings
 */
function getCollaborationTips(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const p1 = profile1.primaryType;
  const p2 = profile2.primaryType;
  const pairing = [p1, p2].sort().join('-');

  const tipsMatrix: Record<string, string[]> = {
    'D-D': [
      '처음에 역할과 책임을 명확히 하세요',
      '전문성별로 리더십 영역을 나누세요',
      '우선순위를 맞추기 위해 정기적인 체크인을 하세요',
      '팀에 도움이 되는 건강한 경쟁을 만드세요',
    ],
    'D-I': [
      'D는 I가 사회적 측면에서 자율성을 갖도록 해야 함',
      'I는 D에게 핵심 결과를 알려야 함',
      'D의 추진력과 I의 설득력을 함께 활용하세요',
      '행동 지향적 작업과 관계 구축의 균형을 맞추세요',
    ],
    'D-S': [
      'D는 S의 시간과 프로세스 필요성을 존중해야 함',
      'S는 우려와 아이디어에 대해 말해야 함',
      'D는 목표를 추진하고 S는 팀의 동참을 보장',
      '빠른 성공과 꾸준한 진행을 위한 공간을 만드세요',
    ],
    'D-C': [
      'D는 C를 계획 단계에 참여시켜야 함',
      'C는 D에게 간결한 분석을 제공해야 함',
      'D는 실행을 이끌고 C는 품질을 보장',
      '속도와 철저함 모두를 허용하는 타임라인 설정',
    ],
    'I-I': [
      '디테일 지향적인 사람을 지원으로 배정하세요',
      '명확한 프로젝트 구조와 마감기한을 만드세요',
      '서로에게 마무리에 대해 책임을 지게 하세요',
      '사회적 시간과 집중된 작업 시간의 균형을 맞추세요',
    ],
    'I-S': [
      'I는 S의 조용한 시간 필요성을 존중해야 함',
      'S는 I의 사회적 제안에 대해 열려 있어야 함',
      'I는 에너지를 가져오고 S는 안정성을 제공',
      '상호작용과 성찰 모두를 위한 공간을 만드세요',
    ],
    'I-C': [
      'I는 구조화된 커뮤니케이션을 제공해야 함',
      'C는 I의 창의적인 아이디어에 대해 열려 있어야 함',
      'I는 발표할 수 있고 C는 검증할 수 있음',
      '열정과 정확성의 균형을 맞추세요',
    ],
    'S-S': [
      '마감기한 중심의 리더를 배정하세요',
      '외부 책임감을 만드세요',
      '주도권을 잡도록 서로에게 도전을 주세요',
      '이정표가 있는 명확한 목표를 설정하세요',
    ],
    'S-C': [
      'S는 C의 구조 필요성에 적응해야 함',
      'C는 S의 사람 기여를 인정해야 함',
      '둘 다 신뢰성과 일관성에 탁월함',
      '함께 명확한 프로세스를 만드세요',
    ],
    'C-C': [
      '과도한 분석을 방지하기 위해 엄격한 마감기한 설정',
      '필요时 의사결정자 지정',
      '영향력 높은 분석에만 집중',
      '진행 상황 검토를 위한 체크포인트 생성',
    ],
  };

  return tipsMatrix[pairing] || [
    '업무 선호도에 대해 솔직하게 소통하세요',
    '서로의 독특한 강점을 소중히 여기세요',
    '공통 목표에서의 공통점을 찾으세요',
    '함께 효과적으로 일하도록 스타일을 조정하세요',
  ];
}

/**
 * Get best working styles for the pairing
 */
function getBestWorkingStyles(profile1: DISCProfile, profile2: DISCProfile): string[] {
  const types = [profile1.primaryType, profile2.primaryType];

  if (types.includes('D') && types.includes('I')) {
    return [
      '행동 계획이 있는 브레인스토밍 세션',
      '프레젠테이션 and 피칭',
      '명확한 목표가 있는 빠른 프로젝트',
      '비전과 매력 모두를 필요로 하는 리더십 역할',
    ];
  }

  if (types.includes('D') && types.includes('S')) {
    return [
      '안정적인 실행이 있는 프로젝트 관리',
      '강력한 지원이 있는 팀 리더십',
      '결단력 있는 행동이 필요한 전환 상황',
      '추진력과 일관성 모두를 필요로 하는 목표',
    ];
  }

  if (types.includes('D') && types.includes('C')) {
    return [
      '전략적 계획 및 실행',
      '품질 개선 이니셔티브',
      '복잡한 문제 해결 프로젝트',
      '비전과 정확성 모두를 필요로 하는 역할',
    ];
  }

  if (types.includes('I') && types.includes('S')) {
    return [
      '팀 빌딩 및 문화 개발',
      '고객 대면 역할',
      '교육 및 개발',
      '조화가 필요한 협업 프로젝트',
    ];
  }

  if (types.includes('I') && types.includes('C')) {
    return [
      '발표가 포함된 연구',
      '이해관계자 커뮤니케이션이 포함된 데이터 분석',
      '제품 개발 및 마케팅',
      '분석과 설득 모두를 필요로 하는 역할',
    ];
  }

  if (types.includes('S') && types.includes('C')) {
    return [
      '품질 보증 및 프로세스 개선',
      '상세한 프로젝트 작업',
      '정확성이 필요한 지원 역할',
      '장기적 계획 및 실행',
    ];
  }

  return [
    '명확한 역할이 있는 협업 프로젝트',
    '부서 간 이니셔티브',
    '지식 공유 및 멘토링',
    '균형 잡힌 팀 기여',
  ];
}

/**
 * Calculate synergy score between two DISC profiles
 * Score = 60% complementarity + 40% similarity
 */
export function calculateSynergy(profile1: DISCProfile, profile2: DISCProfile): SynergyResult {
  const complementarity = calculateComplementarity(profile1, profile2);
  const similarity = calculateSimilarity(profile1.scores, profile2.scores);

  // Weighted score
  const synergyScore = Math.round(complementarity * 0.6 + similarity * 0.4);

  // Determine compatibility level
  let compatibilityLevel: SynergyResult['compatibilityLevel'];
  if (synergyScore >= 80) compatibilityLevel = '훌륭한 조합';
  else if (synergyScore >= 65) compatibilityLevel = '좋은 조합';
  else if (synergyScore >= 50) compatibilityLevel = '보통의 조합';
  else compatibilityLevel = '도전적인 조합';

  return {
    synergyScore,
    compatibilityLevel,
    strengths: getPairingStrengths(profile1, profile2),
    potentialConflicts: getPairingConflicts(profile1, profile2),
    collaborationTips: getCollaborationTips(profile1, profile2),
    bestWorkingStyles: getBestWorkingStyles(profile1, profile2),
  };
}
