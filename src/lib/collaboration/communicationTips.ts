/**
 * DISC Communication Tips
 * Tailored communication guidance for each DISC type
 */

import { DISCType, DISCScores } from '../disc/scoring';

export interface CommunicationStyle {
  prefers: string[];
  avoids: string[];
  bestPractices: string[];
  redFlags: string[];
}

export const communicationStyles: Record<DISCType, CommunicationStyle> = {
  D: {
    prefers: [
      '직접적이고 간결한 커뮤니케이션',
      '결과를 먼저',
      '명확한 기대와 마감기한',
      '결과에 초점을 맞춘 논리적 논거',
      '자율성과 독립성',
    ],
    avoids: [
      '장황한 설명',
      '감정적 호소',
      '마이크로매니지먼트',
      '이유 없이 무엇을 해야 하는지 지시받기',
      '느린 의사결정',
    ],
    bestPractices: [
      '빠르게 핵심에 도달하세요',
      '결과와 결과물에 집중하세요',
      '자신감 있고 단호하게',
      '가능한 옵션 제공',
      '시간 존중',
    ],
    redFlags: [
      '돌려 말하거나 핵심을 피하는 것',
      '모호하거나 우유부단한 것',
      '지나치게 감정적인 커뮤니케이션',
      '응답하는 데 너무 오래 걸리는 것',
    ],
  },
  I: {
    prefers: [
      '친근하고 열정적인 어조',
      '사회적 상호작용과 관계 구축',
      '인정과 칭찬',
      '아이디어를 표현할 기회',
      '다양함과 흥미',
    ],
    avoids: [
      '지나친 디테일',
      '부정적이거나 비판적인 피드백',
      '무시하거나 일축당하는 것',
      '지루하거나 반복적인 작업',
      '고립이나 상호작용 부족',
    ],
    bestPractices: [
      '친근한 대화로 시작하세요',
      '열정과 에너지를 보이세요',
      '기여에 대해 인정을 주세요',
      '브레인스토밍하게 하세요',
      '흥미롭게 유지하세요',
    ],
    redFlags: [
      '지나치게 비판적이거나 부정적인 것',
      '상호작용 필요성 무시',
      '디테일에만 집중하는 것',
      '냉정하거나 거리감이 있는 것',
    ],
  },
  S: {
    prefers: [
      '인내심 있고 지원적인 커뮤니케이션',
      '명확하고 일관된 정보',
      '처리하고 응답할 시간',
      '안심과 감사',
      '조화로운 상호작용',
    ],
    avoids: [
      '경고 없는 갑작스러운 변화',
      '공격적이거나 요구하는 어조',
      '갈등과 대면',
      '비현실적인 마감기한',
      '명확하지 않은 기대',
    ],
    bestPractices: [
      '차분하고 인내심 있게',
      '명확한 기대 제공',
      '변화에 적응할 시간 주기',
      '진정한 감사 표시',
      '적극적으로 경청',
    ],
    redFlags: [
      '강요하거나 요구하는 것',
      '급하게 의사결정',
      '우려 사항 무시',
      '불필요한 갈등 만들기',
    ],
  },
  C: {
    prefers: [
      '상세하고 정확한 정보',
      '논리적이고 구조화된 커뮤니케이션',
      '분석하고 생각할 시간',
      '데이터와 증거',
      '명확한 절차와 기준',
    ],
    avoids: [
      '감정적 호소',
      '모호하거나 모호한 정보',
      '빠른 의사결정 압박',
      '뜻밖의 일이나 자발성',
      '비정리',
    ],
    bestPractices: [
      '철저한 설명 제공',
      '데이터와 사실 사용',
      '정확하고 정확하게',
      '분석할 시간 주기',
      '합의 사항 문서화',
    ],
    redFlags: [
      '모호하거나 일반적인 것',
      '빠른 응답 압박',
      '지원되지 않는 주장',
      '비정리',
    ],
  },
};

/**
 * Get communication tips for one DISC type communicating with another
 */
export interface CommunicationTips {
  approach: string;
  keyStrategies: string[];
  phraseStarters: string[];
  phraseAvoiders: string[];
}

export function getCommunicationTips(
  fromType: DISCType,
  toType: DISCType
): CommunicationTips {
  const tips: Record<string, CommunicationTips> = {
    'D-to-D': {
      approach: '직접적이고 효율적이며 결과에 집중하세요.',
      keyStrategies: [
        '곧장 핵심으로 가세요',
        '결과와 영향에 집중',
        '자신감 있고 단호하게',
        '명확한 옵션 제공',
        '시간 존중',
      ],
      phraseStarters: [
        '핵심은 이렇습니다...',
        '결과가 보여주는 바...',
        '제 추천은...',
        '결정하자면...',
      ],
      phraseAvoiders: [
        '생각해 볼게요...',
        '잘 모르겠어요...',
        '아마도...',
        '확인해봐야 할 것 같아요...',
      ],
    },
    'D-to-I': {
      approach: '직접적이지만 매력적으로. 사회적 상호작용을 허용.',
      keyStrategies: [
        '직접성과 열정의 균형',
        '아이디어 인정',
        '흥미로운 기회에 집중',
        '자율성 부여',
        '간결하지만 활력 있게',
      ],
      phraseStarters: [
        '기회가 있습니다...',
        '아이디어가 마음에 듭니다...',
        '함께 만들어 봅시다...',
        '잘할 거예요...',
      ],
      phraseAvoiders: [
        '시간이 없어...',
        '중요하지 않아...',
        '더 이상 브레인스토밍하지 말고 그냥 해...',
        '사람에게 너무 집중하고 있어...',
      ],
    },
    'D-to-S': {
      approach: '직접적이지만 존중중. 처리할 시간 허용.',
      keyStrategies: [
        '강도를 약간 낮추기',
        '명확한 기대 제공',
        '적응할 시간 주기',
        '감사 표시',
        '속도에 대해 인내심',
      ],
      phraseStarters: [
        '도움이 필요합니다...',
        '이렇게 했으면 합니다...',
        '검토할 시간을 가져도 됩니다...',
        '지원해 주셔서 감사합니다...',
      ],
      phraseAvoiders: [
        '지금 당장 해...',
        '왜 이렇게 느린지...',
        '너무 생각하지 마...',
        '서둘러...',
      ],
    },
    'D-to-C': {
      approach: '직접적이지만 지원 정보 제공.',
      keyStrategies: [
        '효율적으로 핵심에 도달',
        '핵심 데이터와 사실 포함',
        '정확하고 정확하게',
        '분석할 시간 허용',
        '질문에 철저히 답변',
      ],
      phraseStarters: [
        '필요한 것은...',
        '데이터가 보여주는 바...',
        '분석에 기반하면...',
        '제 결정은...',
      ],
      phraseAvoiders: [
        '그냥 믿어주세요...',
        '디테일을 위한 시간이 없어...',
        '왜 중요한지는 상관없어...',
        '그냥 해...',
      ],
    },
    'I-to-D': {
      approach: '간결하고, 열정적이며, 결과 중심적.',
      keyStrategies: [
        '빠르게 핵심에 도달',
        '결과에 대한 흥분 표시',
        '아이디어에 자신감',
        '요약 제공',
        '에너지 매칭',
      ],
      phraseStarters: [
        '큰 아이디어는...',
        '이것이 우리가 승리하는 데 도움이 됩니다...',
        '기회는...',
        '~에 대해 흥분돼요...',
      ],
      phraseAvoiders: [
        '이야기를 좀 해드릴게요...',
        '생각해 봤는데...',
        '잘 모르겠지만...',
        '어떻게 생각하세요...',
      ],
    },
    'I-to-I': {
      approach: '열정적이고, 친근하며, 매력적.',
      keyStrategies: [
        '진정한 열정 표시',
        '아이디어를 바탕으로 구축',
        '높은 에너지 유지',
        '인정 공유',
        '상호작용 즐기기',
      ],
      phraseStarters: [
        '아이디어가 마음에 듭니다...',
        '흥미로운 것이 있습니다...',
        '잘하고 있습니다...',
        '함께 브레인스토밍해 봅시다...',
      ],
      phraseAvoiders: [
        '작동하지 않을 거예요...',
        '현실적이어야 해요...',
        '시간이 없어...',
        '디테일에 집중...',
      ],
    },
    'I-to-S': {
      approach: '친근하지만 압도적이지 않게. 공간 주기.',
      keyStrategies: [
        '따뜻하고 접근 가능하게',
        '대화 독점하지 않기',
        '적극적으로 경청',
        '응답할 시간 허용',
        '진정한 관심 표시',
      ],
      phraseStarters: [
        '생각을 듣고 싶습니다...',
        '어떻게 느끼시는지...',
        '도움을 주셔서 정말 감사합니다...',
        '어떻게 생각하세요...',
      ],
      phraseAvoiders: [
        '주말에 대해 이야기해 드릴게요...',
        '서둘러 결정해...',
        '너무 조용해...',
        '왜 이렇게 느린지...',
      ],
    },
    'I-to-C': {
      approach: '친근하지만 정리되어 있음. 구조 제공.',
      keyStrategies: [
        '열정과 사실의 균형',
        '데이터로 준비',
        '과대평가하지 않기',
        '디테일 필요성 존중',
        '작성으로 후속',
      ],
      phraseStarters: [
        '데이터는...',
        '정보를 준비했습니다...',
        '결과가 보여주는 바...',
        '안내해 드리겠습니다...',
      ],
      phraseAvoiders: [
        '믿어주세요, 작동할 거예요...',
        '디테일을 확인하지 않았습니다...',
        '모두 좋은 분위기예요...',
        '그냥 해봐요...',
      ],
    },
    'S-to-D': {
      approach: '직접적이고 자신감 있게. 존중하게 입장 고수.',
      keyStrategies: [
        '명확하고 크게 말하기',
        '간결하게',
        '결과에 집중',
        '위협받지 않기',
        '추천 사항 제공',
      ],
      phraseStarters: [
        '제 추천은...',
        '분석에 기반하면...',
        '우리는 ~해야 한다고 믿습니다...',
        '최고의 접근 방식은...',
      ],
      phraseAvoiders: [
        '생각해 봤는데...',
        '잘 모르겠지만...',
        '무엇을 해야 할지 생각하세요...',
        '틀릴 수도 있어요...',
      ],
    },
    'S-to-I': {
      approach: '따뜻하지만 집중되어 있음. 부드럽게 경계 설정.',
      keyStrategies: [
        '진정한 관심 표시',
        '주제에 집중',
        '필요하면 정중하게 재지정',
        '필요 사항에 대해 솔직하게',
        '따뜻한 태도 유지',
      ],
      phraseStarters: [
        '토론하고 싶습니다...',
        '집중해 보자면...',
        '열정에 감사드리며...',
        '제 관점은...',
      ],
      phraseAvoiders: [
        '원하는 대로 할게요...',
        '정말 의견이 없어요...',
        '나중에 이야기할까요...',
        '편하지 않아요...',
      ],
    },
    'S-to-S': {
      approach: '인내심 있고, 지원적이며, 명확하게.',
      keyStrategies: [
        '연결할 시간 갖기',
        '점진적으로 신뢰 관계 구축',
        '기대에 대해 명확하게',
        '상호 지원 표시',
        '편안한 속도로 이동',
      ],
      phraseStarters: [
        '지원에 감사드립니다...',
        '함께 해결해 봅시다...',
        '기여를 소중히 생각합니다...',
        '도울 수 있는 것이 있을까요...',
      ],
      phraseAvoiders: [
        '모든 것을 바꿔야 해요...',
        '지금 완료되어야 해요...',
        '동의하지 않아요...',
        '작동하지 않을 거예요...',
      ],
    },
    'S-to-C': {
      approach: '정리되고, 명확하며, 인내심 있게.',
      keyStrategies: [
        '명확한 정보 제공',
        '철저하고 정확하게',
        '분석할 시간 허용',
        '프로세스 서두르지 않기',
        '합의 사항 문서화',
      ],
      phraseStarters: [
        '정보는...',
        '데이터를 수집했습니다...',
        '디테일을 설명하겠습니다...',
        '가진 정보에 기반하면...',
      ],
      phraseAvoiders: [
        '괜찮을 거예요...',
        '나중에 알아볼게요...',
        '그냥 시도해 봅시다...',
        '디테일을 잘 모르겠어요...',
      ],
    },
    'C-to-D': {
      approach: '간결하고, 정확하며, 솔루션 중심적.',
      keyStrategies: [
        '효율적으로 핵심에 도달',
        '핵심 데이터만 제공',
        '솔루션에 집중',
        '분석에 자신감',
        '과도하게 설명하지 않기',
      ],
      phraseStarters: [
        '분석이 보여주는 바...',
        '제 추천은...',
        '데이터에 기반하면...',
        '최적의 솔루션은...',
      ],
      phraseAvoiders: [
        '방법론 설명...',
        '더 연구해야 해요...',
        '고려해야 할 요소가 많이 있습니다...',
        '완전히 확신하지 못하지만...',
      ],
    },
    'C-to-I': {
      approach: '정확하지만 매력적. 약간의 성격 표시.',
      keyStrategies: [
        '명확한 데이터 제공',
        '약간의 열정 표시',
        '준비되었지만 유연하게',
        '아이디어 인정',
        '디테일과 개요 균형',
      ],
      phraseStarters: [
        '데이터가 보여주는 바...',
        '흥미롭게 생각하는 이유는...',
        '결과가 나타내는 바...',
        '정말 도움이 될 수 있습니다...',
      ],
      phraseAvoiders: [
        '정확하지 않아...',
        '디테일을 놓치고 있어...',
        '방법론 설명...',
        '추가 분석이 필요해...',
      ],
    },
    'C-to-S': {
      approach: '명확하고, 정리되어 있으며, 지원적.',
      keyStrategies: [
        '구조화된 정보 제공',
        '인내심 있고 이해심 있게',
        '명확한 기대 설정',
        '일관되게 후속',
        '감사 표시',
      ],
      phraseStarters: [
        '계획은...',
        '단계를 개략적으로 설명했습니다...',
        '도움을 주셔서 감사합니다...',
        '함께 검토해 봅시다...',
      ],
      phraseAvoiders: [
        '즉시 완료되어야 해...',
        '프로세스를 따르지 않고 있어...',
        '왜 이렇게 오래 걸리는지...',
        '알았어야 했어...',
      ],
    },
    'C-to-C': {
      approach: '철저하고, 정확하며, 체계적.',
      keyStrategies: [
        '상세한 분석 제공',
        '정확한 언어 사용',
        '방법론 공유',
        '모든 것 문서화',
        '철저한 토론을 위한 시간 갖기',
      ],
      phraseStarters: [
        '상세한 분석을 공유하겠습니다...',
        '연구에 기반하면...',
        '사용한 방법론은...',
        '데이터가 나타내는 바...',
      ],
      phraseAvoiders: [
        '그냥 ~하면 됩니다...',
        '저를 믿어주세요...',
        '괜찮을 거예요...',
        '그냥 해봅시다...',
      ],
    },
  };

  const key = `${fromType}-to-${toType}`;
  return tips[key] || {
    approach: '명확하고 존중하게 소통하세요.',
    keyStrategies: [
      '명확하고 직접적으로',
      '적극적으로 경청',
      '스타일 조정',
      '존중 표시',
    ],
    phraseStarters: [
      '토론하고 싶습니다...',
      '어떻게 생각하세요...',
      '제 관점은...',
    ],
    phraseAvoiders: [
      '틀렸어...',
      '이해가 안 돼...',
      '시간이 없어...',
    ],
  };
}

/**
 * Get communication style for a DISC type
 */
export function getCommunicationStyle(type: DISCType): CommunicationStyle {
  return communicationStyles[type];
}

/**
 * Get communication tips based on full DISC scores (composite type aware)
 * This provides more accurate tips for composite types like DI, SI, DC, etc.
 */
export function getScoreBasedCommunicationTips(
  fromScores: DISCScores,
  toScores: DISCScores
): CommunicationTips {
  // Calculate communication approach
  const getApproach = (): string => {
    const fromSpeed = fromScores.dominance + fromScores.influence;
    const toSpeed = toScores.dominance + toScores.influence;
    const fromTask = fromScores.dominance + fromScores.conscientiousness;
    const toTask = toScores.dominance + toScores.conscientiousness;

    let approach = '';

    // Speed-based approach
    if (fromSpeed > toSpeed + 20) {
      approach += '상대방이 충분히 생각할 시간을 주며, ';
    } else if (toSpeed > fromSpeed + 20) {
      approach += '핵심을 간결하게 전달하며, ';
    }

    // Task/People-based approach
    if (fromTask > toTask + 20) {
      approach += '결과 중심적으로 ';
    } else if (toTask > fromTask + 20) {
      approach += '관계와 감정을 고려하며 ';
    }

    // Detail level
    if (toScores.conscientiousness > 55) {
      approach += '상세한 데이터로 준비해서 ';
    } else if (toScores.conscientiousness < 45) {
      approach += '간결하고 핵심적인 정보만 ';
    }

    return approach || '명확하고 존중하게 ';
  };

  const getKeyStrategies = (): string[] => {
    const strategies: string[] = [];
    const toD = toScores.dominance;
    const toI = toScores.influence;
    const toS = toScores.steadiness;
    const toC = toScores.conscientiousness;

    // High D to receiver
    if (toD > 55) {
      strategies.push('결론을 먼저 말하고 필요한 경우에만 설명 추가');
      strategies.push('결과와 영향에 집중');
    }

    // High I to receiver
    if (toI > 55) {
      strategies.push('친근하고 열정적인 태도로 접근');
      strategies.push('아이디어를 인정하고 칭찬');
      strategies.push('대화를 흥미롭게 유지');
    }

    // High S to receiver
    if (toS > 55) {
      strategies.push('변화가 있을 경우 미리 알리고 설명');
      strategies.push('충분한 처리 시간 제공');
      strategies.push('인내심과 지원적인 태도');
    }

    // High C to receiver
    if (toC > 55) {
      strategies.push('정확하고 상세한 정보 제공');
      strategies.push('논리적이고 체계적인 설명');
      strategies.push('분석할 시간 허용');
    }

    // Low D to receiver
    if (toD < 45) {
      strategies.push('너무 강요하거나 압박하지 않기');
    }

    // Low I to receiver
    if (toI < 45) {
      strategies.push('지나치게 감정적이거나 과장된 표현 자제');
    }

    // Low S to receiver
    if (toS < 45) {
      strategies.push('새로운 접근 방식에 개방적일 수 있음');
    }

    // Low C to receiver
    if (toC < 45) {
      strategies.push('지나치게 디테일에 집중하지 않기');
    }

    return strategies.length > 0 ? strategies : ['명확하고 직접적으로', '적극적으로 경청'];
  };

  const getPhraseStarters = (): string[] => {
    const starters: string[] = [];
    const toD = toScores.dominance;
    const toI = toScores.influence;
    const toS = toScores.steadiness;
    const toC = toScores.conscientiousness;

    if (toD > 55) {
      starters.push('핵심은 이렇습니다...', '결과적으로...', '제 추천은...');
    } else if (toI > 55) {
      starters.push('흥미로운 아이디어입니다...', '함께 만들어 봅시다...', '잘할 수 있습니다...');
    } else if (toS > 55) {
      starters.push('도움이 필요합니다...', '검토해 주셔서 감사합니다...', '이렇게 진행하면 어떨까요...');
    } else if (toC > 55) {
      starters.push('데이터가 보여주는 바...', '분석 결과는...', '필요한 정보는...');
    }

    return starters;
  };

  const getPhraseAvoiders = (): string[] => {
    const avoiders: string[] = [];
    const toD = toScores.dominance;
    const toI = toScores.influence;
    const toS = toScores.steadiness;
    const toC = toScores.conscientiousness;

    if (toD > 55) {
      avoiders.push('생각해 봐야 할 것 같아요...', '잘 모르겠어요...', '아마도...');
    } else if (toI > 55) {
      avoiders.push('재미없는 주제네...', '시간이 없어...', '그냥 해...');
    } else if (toS > 55) {
      avoiders.push('지금 당장 해...', '왜 이렇게 느려...', '갑자기 바뀌었어...');
    } else if (toC > 55) {
      avoiders.push('그냥 믿어주세요...', '디테일은 중요하지 않아...', '빨리 결정해...');
    }

    return avoiders;
  };

  return {
    approach: getApproach() + '소통하세요.',
    keyStrategies: getKeyStrategies(),
    phraseStarters: getPhraseStarters(),
    phraseAvoiders: getPhraseAvoiders(),
  };
}
