/**
 * DISC Profiles and Interpretations
 * Detailed descriptions for each DISC type combination (Korean)
 */

import { DISCType } from './scoring';

export interface DISCProfileDescription {
  code: string;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  motivations: string[];
  fears: string[];
  idealWorkEnvironment: string;
  communicationStyle: string;
  decisionMaking: string;
}

export const discProfiles: Record<string, DISCProfileDescription> = {
  // Dominance Profiles
  D: {
    code: 'D',
    name: 'Dominance (지배형)',
    tagline: '리더',
    description: '직설적이고 결단력이 강하며 목표 지향적입니다. 도전을 즐기고 결과를 중시합니다.',
    strengths: [
      '강력한 리더십',
      '빠른 의사결정',
      '목표 지향적이고 추진력 있음',
      '자신감 있고 단호함',
      '주도적으로 임함',
    ],
    weaknesses: [
      '공격적으로 보일 수 있음',
      '디테일에 인내심 부족',
      '타인의 감정을 간과할 수 있음',
      '위임을 어려워할 수 있음',
    ],
    motivations: [
      '권위와 통제권',
      '성취와 성공',
      '도전과 경쟁',
      '직접적인 답변',
    ],
    fears: [
      '이용당하는 것',
      '통제권 상실',
      '실패',
      '약해 보이는 것',
    ],
    idealWorkEnvironment: '빠르게 진행되며 리더십을 발휘하고 구체적 성과를 낼 기회가 있는 환경.',
    communicationStyle: '직접적이고 간결하며 핵심을 찔러요. 효율성과 솔직함을 높이 평가합니다.',
    decisionMaking: '빠르고 단호한 결정. 직관을 신뢰하고 숙고보다 행동을 선호합니다.',
  },
  I: {
    code: 'I',
    name: 'Influence (영향형)',
    tagline: '영감을 주는 사람',
    description: '사교적이고 열정적이며 낙관적입니다. 사람들을 사랑하고 사회적 상호작용을 즐깁니다.',
    strengths: [
      '훌륭한 커뮤니케이터',
      '설득력 있고 영감을 줌',
      '낙관적이고 활력 넘침',
      '강력한 관계 구축',
      '창의적인 문제 해결사',
    ],
    weaknesses: [
      '디테일을 간과할 수 있음',
      '충동적일 수 있음',
      '마무리에 어려움을 겪을 수 있음',
      '갈등을 피하려 할 수 있음',
    ],
    motivations: [
      '사회적 인정',
      '자유와 유연성',
      '다양함과 흥미',
      '사람과 관계',
    ],
    fears: [
      '거절과 비난',
      '무시당하는 것',
      '인기 상실',
      '지루한 일상',
    ],
    idealWorkEnvironment: '친절하고 협력적이며 다양하고 타인과 교류할 기회가 있는 환경.',
    communicationStyle: '따뜻하고 표현력이 풍부하며 열정적. 이야기와 유머로 연결합니다.',
    decisionMaking: '직관적이고 사람 중심적. 관계와 사기에 미치는 영향을 고려합니다.',
  },
  S: {
    code: 'S',
    name: 'Steadiness (안정형)',
    tagline: '지원하는 사람',
    description: '인내심 있고 신뢰할 수 있으며 지원적입니다. 조화를 중시하고 충직합니다.',
    strengths: [
      '신뢰할 수 있고 일관됨',
      '훌륭한 경청자',
      '인내심 있고 이해심 많음',
      '팀 플레이어',
      '압박감 속에서도 침착함',
    ],
    weaknesses: [
      '변화에 저항',
      '직면을 피할 수 있음',
      '우유부단할 수 있음',
      '우선순위 설정에 어려움',
    ],
    motivations: [
      '보안과 안정성',
      '감사와 인정',
      '조화와 협력',
      '다른 사람 돕기',
    ],
    fears: [
      '갑작스러운 변화',
      '갈등과 대립',
      '보안 상실',
      '다른 사람을 실망시키는 것',
    ],
    idealWorkEnvironment: '안정적이고 지원적이며 명확한 기대와 적응할 시간이 있는 환경.',
    communicationStyle: '인내심 있고 주의 깊으며 공감적. 신중하게 생각하고 응답합니다.',
    decisionMaking: '신중하고 배려 깊음. 타인에게 미치는 영향과 합의를 고려합니다.',
  },
  C: {
    code: 'C',
    name: 'Conscientiousness (신중형)',
    tagline: '분석가',
    description: '분석적이고 정확하며 내성적입니다. 정확성과 품질을 무엇보다 중요하게 생각합니다.',
    strengths: [
      '디테일 지향적',
      '분석적 사고',
      '높은 기준',
      '체계적인 접근',
      '품질 중심',
    ],
    weaknesses: [
      '비판적으로 보일 수 있음',
      '분석에 매몰될 수 있음',
      '모호함에 어려움',
      '사회적 상호작용을 피할 수 있음',
    ],
    motivations: [
      '정확성과 품질',
      '명확한 기대',
      '논리와 이성',
      '우수할 수 있는 기회',
    ],
    fears: [
      '업무에 대한 비판',
      '틀리는 것',
      '구조화되지 않은 상황',
      '감정적 표현',
    ],
    idealWorkEnvironment: '구조적이고 정밀하며 명확한 기준과 철저하게 일할 시간이 있는 환경.',
    communicationStyle: '정확하고 사실적이며 논리적. 문서화된 커뮤니케이션을 선호합니다.',
    decisionMaking: '분석적이고 데이터 중심적. 철저히 조사하고 모든 변수를 고려합니다.',
  },
  // Combination Profiles
  DI: {
    code: 'DI',
    name: 'Dominant Influencer (지배-영향형)',
    tagline: '설득하는 사람',
    description: '역동적이고 외향적입니다. 추진력과 카리스마를 결합해 인상적인 결과를 냅니다.',
    strengths: [
      '카리스마 있는 리더',
      '비전 있는 사고자',
      '다른 사람들을 동기 부여',
      '계산된 위험 감수',
      '훌륭한 네트워커',
    ],
    weaknesses: [
      '인내심 부족할 수 있음',
      '디테일을 간과할 수 있음',
      '대화를 독점할 수 있음',
      '일상적 업무에 어려움',
    ],
    motivations: [
      '리더십 기회',
      '공개적 인정',
      '도전적인 목표',
      '사회적 상호작용',
    ],
    fears: [
      '지위 상실',
      '무시당하는 것',
      '실패',
      '거절',
    ],
    idealWorkEnvironment: '리더십 기회와 공개적 가시성이 있는 역동적이고 빠른 환경.',
    communicationStyle: '활기차고 자신감 있으며 설득력 있음. 쉽게 주목을 끕니다.',
    decisionMaking: '빠르고 자신감 있음. 비전을 신뢰하고 다른 사람들을 따르도록 영감을 줍니다.',
  },
  ID: {
    code: 'ID',
    name: 'Influencing Director (영향-지배형)',
    tagline: '홍보자',
    description: '열정적이고 설득력 있습니다. 사람 기술과 결과에 대한 추진력을 결합합니다.',
    strengths: [
      '천연 판매원',
      '강력한 네트워크 구축',
      '환기 있는 발표자',
      '창의적인 문제 해결사',
      '동기 부여하는 팀원',
    ],
    weaknesses: [
      '충동적일 수 있음',
      '약속을 초과할 수 있음',
      '후속 조치에 어려움',
      '사실을 왜곡할 수 있음',
    ],
    motivations: [
      '사회적 성공',
      '새로운 기회',
      '행동의 자유',
      '공개적 칭찬',
    ],
    fears: [
      '사회적 거절',
      '자유 상실',
      '지루함',
      '통제당하는 것',
    ],
    idealWorkEnvironment: '사람 중심적이며 다양함과 재능을 선보일 기회가 있는 환경.',
    communicationStyle: '따뜻하고 생동감 있으며 설득력 있음. 영감을 주고 설득하는 것을 사랑합니다.',
    decisionMaking: '빠르지만 사람 고려적. 관계와 기회를 기반으로 결정합니다.',
  },
  DS: {
    code: 'DS',
    name: 'Dominant Supporter (지배-안정형)',
    tagline: '감독자',
    description: '단호하지만 배려 깊습니다. 추진력과 타인에 대한 진정한 관심을 균형 있게 유지합니다.',
    strengths: [
      '강력하지만 공정한 리더',
      '팀을 보호함',
      '결과 지향적',
      '충성심 구축',
      '명확한 커뮤니케이터',
    ],
    weaknesses: [
      '통제적일 수 있음',
      '요구가 많을 수 있음',
      '인내심 부족',
      '일관성 없어 보일 수 있음',
    ],
    motivations: [
      '목표 달성',
      '팀 성공',
      '인정',
      '도전',
    ],
    fears: [
      '실패',
      '통제권 상실',
      '팀을 실망시키는 것',
      '무능력',
    ],
    idealWorkEnvironment: '목표 지향적이며 팀을 이끌고 보호할 기회가 있는 환경.',
    communicationStyle: '직접적이지만 지원적. 명확한 기대와 안내를 제공합니다.',
    decisionMaking: '결단력 있지만 사려 깊음. 팀 영향을 고려하면서 결과를 추진합니다.',
  },
  SD: {
    code: 'SD',
    name: 'Steady Director (안정-지배형)',
    tagline: '지원적 리더',
    description: '인내심 있고 결단력 있습니다. 어려운 시기에 안정된 리더십을 제공합니다.',
    strengths: [
      '신뢰할 수 있는 리더',
      '압박감 속에서도 침착함',
      '충직하고 헌신적',
      '다른 사람에 대해 인내심',
      '방법론적 접근',
    ],
    weaknesses: [
      '빠른 변화에 저항',
      '직면을 피할 수 있음',
      '행동이 느릴 수 있음',
      '긴급성에 어려움',
    ],
    motivations: [
      '팀 복지',
      '장기적 성공',
      '안정성',
      '다른 사람들의 성장 돕기',
    ],
    fears: [
      '급격한 변화',
      '갈등',
      '다른 사람을 실망시키는 것',
      '불확실성',
    ],
    idealWorkEnvironment: '관계를 구축하고 유지할 시간이 있는 지원적 팀 환경.',
    communicationStyle: '침착하고 명확하며 지원적. 지시하기 전에 경청합니다.',
    decisionMaking: '신중하지만 단호함. 행동하기 전에 모든 관점을 고려합니다.',
  },
  DC: {
    code: 'DC',
    name: 'Dominant Analyst (지배-신중형)',
    tagline: '창의적 사고자',
    description: '전략적이고 정확합니다. 대닱한 비전과 분석적 엄격함을 결합합니다.',
    strengths: [
      '전략적 계획가',
      '결과 중심적 분석가',
      '혁신적 사고자',
      '높은 기준',
      '효율성 중심',
    ],
    weaknesses: [
      '비판적으로 보일 수 있음',
      '인내심 부족',
      '잡담에 어려움',
      '냉정해 보일 수 있음',
    ],
    motivations: [
      '도전적인 문제',
      '품질 결과',
      '효율성',
      '자율성',
    ],
    fears: [
      '비효율성',
      '평범함',
      '통제권 상실',
      '틀리는 것',
    ],
    idealWorkEnvironment: '도전적이고 자율적이며 결과와 품질에 집중하는 환경.',
    communicationStyle: '직접적이고 정확하며 효율적. 감정보다 사실을 중시합니다.',
    decisionMaking: '분석적이고 결단력 있음. 데이터와 대닱한 행동을 결합합니다.',
  },
  CD: {
    code: 'CD',
    name: 'Conscientious Director (신중-지배형)',
    tagline: '완벽주의자',
    description: '꼼꼼하고 추진력 있습니다. 자신과 타인에게 탁월함을 요구합니다.',
    strengths: [
      '품질 중심',
      '상세한 계획가',
      '높은 기준',
      '체계적',
      '원칙적 리더',
    ],
    weaknesses: [
      '비판적으로 보일 수 있음',
      '디테일에 매몰될 수 있음',
      '유연성 부족',
      '행동이 느릴 수 있음',
    ],
    motivations: [
      '탁월함',
      '정확성',
      '일을 올바르게 하는 것',
      '원칙적 행동',
    ],
    fears: [
      '오류와 실수',
      '비판',
      '성급한 결정',
      '무능력',
    ],
    idealWorkEnvironment: '품질 중심적이며 명확한 기준과 철저한 작업을 위한 시간이 있는 환경.',
    communicationStyle: '정확하고 형식적이며 사실적. 문서화와 디테일을 선호합니다.',
    decisionMaking: '철저하고 체계적. 결정 전에 광범위하게 조사합니다.',
  },
  IS: {
    code: 'IS',
    name: 'Inspiring Supporter (영향-안정형)',
    tagline: '상담사',
    description: '따뜻하고 공감적입니다. 열정과 타인에 대한 진정한 관심을 결합합니다.',
    strengths: [
      '사람 중심적',
      '훌륭한 경청자',
      '격려자',
      '신뢰 구축',
      '창의적인 도움',
    ],
    weaknesses: [
      '갈등을 피할 수 있음',
      '우유부단할 수 있음',
      '비판을 개인적으로 받아들임',
      '약속을 초과할 수 있음',
    ],
    motivations: [
      '다른 사람 돕기',
      '긍정적 관계',
      '조화',
      '감사',
    ],
    fears: [
      '갈등',
      '거절',
      '다른 사람들을 상하게 하는 것',
      '불만',
    ],
    idealWorkEnvironment: '친절하고 협력적이며 사람과 관계에 초점을 맞춘 환경.',
    communicationStyle: '따뜻하고 친절하며 지원적. 다른 사람들이 가치 있게 느끼게 합니다.',
    decisionMaking: '사람 우선적이고 협력적. 관계에 미치는 영향을 먼저 고려합니다.',
  },
  SI: {
    code: 'SI',
    name: 'Steady Inspirer (안정-영향형)',
    tagline: '지원적 전문가',
    description: '신뢰할 수 있고 열정적입니다. 긍정적인 태도로 일관된 지원을 제공합니다.',
    strengths: [
      '신뢰할 수 있는 팀 플레이어',
      '낙관적 지원자',
      '좋은 경청자',
      '인내심 있는 도움',
      '관계 구축자',
    ],
    weaknesses: [
      '변화에 저항',
      '수동적일 수 있음',
      '우선순위 설정에 어려움',
      '직면을 피할 수 있음',
    ],
    motivations: [
      '팀 조화',
      '다른 사람 돕기',
      '안정성',
      '인정',
    ],
    fears: [
      '변화',
      '갈등',
      '불확실성',
      '승인 상실',
    ],
    idealWorkEnvironment: '안정적이고 친절하며 명확한 역할과 지원적 동료들이 있는 팀.',
    communicationStyle: '친절하고 인내심 있으며 격려적. 사람들 사이의 다리를 건설합니다.',
    decisionMaking: '느리지만 꾸준함. 적응하고 팀 합의를 선호하는 시간이 필요합니다.',
  },
  IC: {
    code: 'IC',
    name: 'Influencing Analyst (영향-신중형)',
    tagline: '평가자',
    description: '사회적 능력과 분석적 사고를 갖추고 있습니다. 사람 기술과 데이터 중심적 사고를 결합합니다.',
    strengths: [
      '사람 중심적 분석가',
      '설득력 있는 발표자',
      '데이터 스토리텔러',
      '다재다능한 사고자',
      '품질 커뮤니케이터',
    ],
    weaknesses: [
      '일관성 없을 수 있음',
      '비판적일 수 있음',
      '일상에 어려움',
      '과도하게 생각할 수 있음',
    ],
    motivations: [
      '사회적 인정',
      '품질 업무',
      '다양함',
      '지적 도전',
    ],
    fears: [
      '거절',
      '비판',
      '지루함',
      '틀리는 것',
    ],
    idealWorkEnvironment: '역동적이고 지향적이며 사람과 품질 표준이 있는 환경.',
    communicationStyle: '표현력 있고 유익하며 설득력 있음. 데이터를 흥미롭게 만듭니다.',
    decisionMaking: '직관적이지만 분석적. 사람 요소와 데이터를 균형 있게 맞춥니다.',
  },
  CI: {
    code: 'CI',
    name: 'Conscientious Inspirer (신중-영향형)',
    tagline: '분석적 사람',
    description: '정확하지만 친절합니다. 사회적 상호작용에 정확성을 더합니다.',
    strengths: [
      '사회적 능력 있는 분석가',
      '품질 중심적 도움',
      '신뢰할 수 있는 커뮤니케이터',
      '상세한 계획가',
      '사려 깊은 친구',
    ],
    weaknesses: [
      '예약될 수 있음',
      '비판적일 수 있음',
      '자발성에 어려움',
      '과도하게 걱정할 수 있음',
    ],
    motivations: [
      '정확성',
      '품질 관계',
      '다른 사람 돕기',
      '질서',
    ],
    fears: [
      '오류',
      '사회적 실수',
      '구조화되지 않은 상황',
      '거절',
    ],
    idealWorkEnvironment: '구조적이고 품질 중심적이며 다른 사람들을 정확히 돕는 기회가 있는 환경.',
    communicationStyle: '정확하고 사려 깊으며 배려적. 철저하게 준비합니다.',
    decisionMaking: '분석적이고 사려 깊음. 사람을 고려하면서 철저히 조사합니다.',
  },
  SC: {
    code: 'SC',
    name: 'Steady Analyst (안정-신중형)',
    tagline: '관계 전문가',
    description: '인내심 있고 정확합니다. 신뢰할 수 있고 정확한 지원을 제공합니다.',
    strengths: [
      '신뢰할 수 있는 지원자',
      '디테일 중심적 도움',
      '인내심 있는 작업자',
      '품질 중심',
      '일관된 수행자',
    ],
    weaknesses: [
      '변화에 저항',
      '느릴 수 있음',
      '수동적일 수 있음',
      '모호함에 어려움',
    ],
    motivations: [
      '안정성',
      '다른 사람 돕기',
      '품질',
      '보안',
    ],
    fears: [
      '변화',
      '갈등',
      '실수',
      '불확실성',
    ],
    idealWorkEnvironment: '안정적이고 구조적이며 명확한 절차가 있는 환경.',
    communicationStyle: '인내심 있고 상세하며 사려 깊음. 정확하기 위한 시간을 가집니다.',
    decisionMaking: '매우 신중함. 확신을 갖기 위한 시간과 데이터가 필요합니다.',
  },
  CS: {
    code: 'CS',
    name: 'Conscientious Supporter (신중-안정형)',
    tagline: '분석적 지원자',
    description: '꼼꼼하고 배려 깊습니다. 정확하고 사려 깊은 지원을 제공합니다.',
    strengths: [
      '품질 중심',
      '신뢰할 수 있음',
      '디테일 중심',
      '인내심',
      '사려 깊음',
    ],
    weaknesses: [
      '예약될 수 있음',
      '느릴 수 있음',
      '변화에 어려움',
      '비판적일 수 있음',
    ],
    motivations: [
      '품질',
      '다른 사람 돕기',
      '정확성',
      '보안',
    ],
    fears: [
      '오류',
      '갈등',
      '변화',
      '비판',
    ],
    idealWorkEnvironment: '구조적이고 지원적이며 명확한 품질 표준이 있는 환경.',
    communicationStyle: '정확하고 조심스럽고 사려 깊음. 문서화된 커뮤니케이션을 선호합니다.',
    decisionMaking: '매우 신중함. 결정하기 위한 철저한 분석과 시간이 필요합니다.',
  },
};

/**
 * Get profile description for a DISC code
 */
export function getProfileDescription(primary: DISCType, secondary?: DISCType): DISCProfileDescription {
  const code = secondary ? primary + secondary : primary;
  return discProfiles[code] || discProfiles[primary];
}

/**
 * Get action plan based on DISC profile
 */
export interface ActionPlanItem {
  category: string;
  tips: string[];
}

export function getActionPlan(primary: DISCType, secondary?: DISCType): ActionPlanItem[] {
  const profile = getProfileDescription(primary, secondary);

  return [
    {
      category: '강점 활용하기',
      tips: profile.strengths.slice(0, 3),
    },
    {
      category: '성장 영역',
      tips: profile.weaknesses.map((w) => `개선: ${w.toLowerCase()}`),
    },
    {
      category: '동기 부여 요소',
      tips: profile.motivations.map((m) => `추구: ${m.toLowerCase()}`),
    },
    {
      category: '커뮤니케이션 팁',
      tips: [
        `당신의 스타일: ${profile.communicationStyle.split('.')[0].toLowerCase()}.`,
        `의사결정: ${profile.decisionMaking.split('.')[0].toLowerCase()}.`,
        '다른 성격 유형과 함께 일할 때 스타일을 조절하세요.',
      ],
    },
    {
      category: '업무 환경',
      tips: [
        `이상적인 환경: ${profile.idealWorkEnvironment}`,
        '자연스러운 선호도에 맞는 역할을 찾으세요.',
      ],
    },
  ];
}
