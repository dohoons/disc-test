/**
 * DISC Collaboration Scenario Database
 * Provides guidance for common workplace scenarios between different DISC types
 */

import { DISCType } from '../disc/scoring';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  typePairings: {
    type1: DISCType;
    type2: DISCType;
    advice: string[];
  }[];
}

export const collaborationScenarios: Scenario[] = [
  {
    id: 'brainstorming',
    title: '브레인스토밍 세션',
    description: '아이디어를 생성하고 가능성을 탐색',
    typePairings: [
      {
        type1: 'D',
        type2: 'I',
        advice: [
          'D: 높은 수준의 개념에 집중하고 아이디어를 차단하지 마세요',
          'I: D의 대담한 개념을 바탕으로 창의적인 터치를 더하세요',
          '함께: 시간 제한을 설정하고 모든 아이디어를 먼저 캡처한 후 나중에 평가',
        ],
      },
      {
        type1: 'D',
        type2: 'S',
        advice: [
          'D: S의 신중한 기여에 대해 인내심을 가지세요',
          'S: 실용적인 통찰력을 말씀하세요',
          '함께: 대담한 아이디어와 현실적인 고려사항의 균형',
        ],
      },
      {
        type1: 'D',
        type2: 'C',
        advice: [
          'D: C가 개념을 연구하고 검증할 시간을 주세요',
          'C: 모멘텀을 죽이지 않고 분석을 제공하세요',
          '함께: 아이디어 생성 단계와 평가 단계를 분리',
        ],
      },
      {
        type1: 'I',
        type2: 'S',
        advice: [
          'I: 열정을 생성하면서 S에게 공간을 허용',
          'S: I의 아이디어를 현실에 기반하게 만드세요',
          '함께: 모든 기여를 위한 안전한 공간 만들기',
        ],
      },
      {
        type1: 'I',
        type2: 'C',
        advice: [
          'I: 창의적인 개념을 자유롭게 공유',
          'C: 데이터와 타당성 통찰력 추가',
          '함께: 창의성과 실용성의 균형',
        ],
      },
      {
        type1: 'S',
        type2: 'C',
        advice: [
          'S: 팀과 사용자 관점 공유',
          'C: 상세한 분석 추가',
          '함께: 실용적이고 실행 가능한 솔루션에 집중',
        ],
      },
    ],
  },
  {
    id: 'conflict-resolution',
    title: '갈등 해결',
    description: '불일치를 해결하고 공통점 찾기',
    typePairings: [
      {
        type1: 'D',
        type2: 'D',
        advice: [
          '권력 투쟁을 인정하세요',
          '누가 옳은지보다 공유된 목표에 집중',
          '의사결정을 위한 객관적 기준 사용',
          '중재자 참여 고려',
        ],
      },
      {
        type1: 'D',
        type2: 'I',
        advice: [
          'D: 방해하지 않고 경청하세요',
          'I: 입장에 대해 직접적으로 말하세요',
          '이슈를 빠르게 해결하고 썩어가게 하지 마세요',
          '솔루션에 집중하고 성격에 집중하지 마세요',
        ],
      },
      {
        type1: 'D',
        type2: 'S',
        advice: [
          'D: 목소리를 낮추고 속도를 늦추세요',
          'S: 우려 사항을 명확하게 표현하세요',
          '대화를 위한 안전한 공간 만들기',
          '실용적인 결과에 집중',
        ],
      },
      {
        type1: 'D',
        type2: 'C',
        advice: [
          'D: C의 정보 필요성을 존중하세요',
          'C: 효율적으로 핵심을 말씀하세요',
          '사실과 감정을 분리하세요',
          '불일치를 해결하기 위해 데이터 사용',
        ],
      },
      {
        type1: 'I',
        type2: 'S',
        advice: [
          'I: 이슈를 최소화하지 마세요',
          'S: 괴로운 것에 대해 말씀하세요',
          '관계 보존에 집중',
          '상호 윈속 솔루션 찾기',
        ],
      },
      {
        type1: 'I',
        type2: 'C',
        advice: [
          'I: 우려 사항에 대해 구체적으로 말씀하세요',
          'C: 지나치게 비판적인 것을 피하세요',
          '사실과 감정의 균형',
          '합의 사항 문서화',
        ],
      },
      {
        type1: 'S',
        type2: 'C',
        advice: [
          '둘 다: 회피 패턴 피하기',
          '직면하지만 부드럽게 이슈 해결',
          '구조화된 문제 해결 사용',
          '처리를 위해 서로에게 시간 주기',
        ],
      },
    ],
  },
  {
    id: 'decision-making',
    title: '의사결정',
    description: '효율적이고 효과적으로 결정 내리기',
    typePairings: [
      {
        type1: 'D',
        type2: 'I',
        advice: [
          '처음에 결정 마감기한 설정',
          'D: 사실과 결과에 집중',
          'I: 사람 영향 고려',
          '후속 유연성이 있는 빠른 결정',
        ],
      },
      {
        type1: 'D',
        type2: 'C',
        advice: [
          '함께 결정 기준 정의',
          'C: 간결한 형식으로 분석 제공',
          'D: 입력과 함께 최종 결정',
          '검토 체크포인트 구축',
        ],
      },
      {
        type1: 'I',
        type2: 'S',
        advice: [
          '토론을 위한 시간 허용',
          'I: 관점을 공개적으로 공유',
          'S: 팀과 사용자 영향 고려',
          '가능한 합의 추구',
        ],
      },
      {
        type1: 'S',
        type2: 'C',
        advice: [
          '필요한 정보 수집',
          '둘 다: 신중한 속도와 편안함',
          'C: 분석을 명확하게 제시',
          'S: 실행 영향 고려',
        ],
      },
    ],
  },
  {
    id: 'feedback-exchange',
    title: '피드백 주고받기',
    description: '서로에게 건설적인 피드백 제공',
    typePairings: [
      {
        type1: 'D',
        type2: 'I',
        advice: [
          'D to I: 직접적이지만 격려하며 열정 인정',
          'I to D: 솔직하게, 설탕 발라지 말고',
          '성격이 아닌 구체적인 행동에 집중',
          '실행 가능한 다음 단계 포함',
        ],
      },
      {
        type1: 'D',
        type2: 'S',
        advice: [
          'D to S: 기여를 존중하고 강도 낮추기',
          'S to D: 직접적이고 솔직하게, 이슈 회피하지 않기',
          '개인 설정 선택',
          '행동의 영향에 집중',
        ],
      },
      {
        type1: 'D',
        type2: 'C',
        advice: [
          'D to C: 구체적이고 예시 사용, 일반화 피하기',
          'C to D: 핵심을 말하고, 과도하게 설명하지 않기',
          '사실과 결과에 집중',
          '감정적 언어 피하기',
        ],
      },
      {
        type1: 'I',
        type2: 'S',
        advice: [
          'I to S: 부드럽게, 노력 인정',
          'S to I: 솔직하게, 이슈 회피하지 않기',
          '긍정적인 관계 유지',
          '성장 기회에 집중',
        ],
      },
      {
        type1: 'I',
        type2: 'C',
        advice: [
          'I to C: 구체적이고 예시 사용',
          'C to I: 건설적이고 비판 피하기',
          '긍정적과 건설적 균형',
          '잘 되고 있는 것 포함',
        ],
      },
      {
        type1: 'S',
        type2: 'C',
        advice: [
          '둘 다: 솔직하고 구체적으로',
          '비난이 아닌 개선에 집중',
          '예시와 데이터 사용',
          '지원적 어조 유지',
        ],
      },
    ],
  },
  {
    id: 'project-work',
    title: '함께 프로젝트 작업',
    description: '공유 프로젝트와 작업에 대한 협업',
    typePairings: [
      {
        type1: 'D',
        type2: 'I',
        advice: [
          'D: 명확한 목표와 마감기한 설정',
          'I: 커뮤니케이션과 이해관계자 관리 처리',
          '진행 상황에 대한 정기적 체크인',
          '함께 이정표 축하',
        ],
      },
      {
        type1: 'D',
        type2: 'S',
        advice: [
          'D: 방향 제공 및 장애물 제거',
          'S: 실행 및 팀 조정 처리',
          '명확한 역할과 책임',
          '서로의 속도를 존중',
        ],
      },
      {
        type1: 'D',
        type2: 'C',
        advice: [
          'D: 타임라인과 의사결정 주도',
          'C: 품질과 디테일 보장',
          '의사결정 체크포인트 합의',
          '속도와 철저함의 균형',
        ],
      },
      {
        type1: 'I',
        type2: 'S',
        advice: [
          'I: 외부 커뮤니케이션과 사기 처리',
          'S: 내부 프로세스 조정',
          '서로의 강점 지원',
          '팀 조화 유지',
        ],
      },
      {
        type1: 'I',
        type2: 'C',
        advice: [
          'I: 아이디어 발표 및 피드백 수집',
          'C: 개념 연구 및 검증',
          '명확한 이정표 설정',
          '의사결정 및 진행 상황 문서화',
        ],
      },
      {
        type1: 'S',
        type2: 'C',
        advice: [
          'S: 팀 및 워크플로우 조정',
          'C: 품질과 기준 보장',
          '명확한 프로세스 만들기',
          '철저한 실행 지원',
        ],
      },
    ],
  },
];

/**
 * Get scenario advice for two DISC types
 */
export function getScenarioAdvice(
  scenarioId: string,
  type1: DISCType,
  type2: DISCType
): string[] | null {
  const scenario = collaborationScenarios.find((s) => s.id === scenarioId);
  if (!scenario) return null;

  // Look for matching pairing (order doesn't matter)
  const pairing = scenario.typePairings.find(
    (p) => (p.type1 === type1 && p.type2 === type2) || (p.type1 === type2 && p.type2 === type1)
  );

  return pairing ? pairing.advice : null;
}

/**
 * Get all scenario titles
 */
export function getScenarioTitles(): string[] {
  return collaborationScenarios.map((s) => s.title);
}
