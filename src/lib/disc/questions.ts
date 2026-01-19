/**
 * DISC Assessment Questions
 * 24 ipsative questions with Most/Least format
 * Each question has 4 statements mapped to D, I, S, or C
 */

export interface Statement {
  id: string;
  text: string;
  type: 'D' | 'I' | 'S' | 'C';
}

export interface Question {
  id: number;
  statements: Statement[];
}

export const discQuestions: Question[] = [
  {
    id: 1,
    statements: [
      { id: '1a', text: '다른 사람들을 이끄는 것을 즐긴다', type: 'D' },
      { id: '1b', text: '새로운 사람을 만나고 사귀는 것을 좋아한다', type: 'I' },
      { id: '1c', text: '안정적이고 예측 가능한 환경을 선호한다', type: 'S' },
      { id: '1d', text: '세부 사항을 꼼꼼하게 확인하는 것을 즐긴다', type: 'C' },
    ],
  },
  {
    id: 2,
    statements: [
      { id: '2a', text: '즉각적인 행동과 결과를 추구한다', type: 'D' },
      { id: '2b', text: '주목받는 것을 즐긴다', type: 'I' },
      { id: '2c', text: '다른 사람들을 인내심 있게 지원한다', type: 'S' },
      { id: '2d', text: '규칙과 절차를 신중하게 따른다', type: 'C' },
    ],
  },
  {
    id: 3,
    statements: [
      { id: '3a', text: '직설적이고 핵심을 찌른다', type: 'D' },
      { id: '3b', text: '열정적이고 낙관적이다', type: 'I' },
      { id: '3c', text: '경청하는 능력이 좋다', type: 'S' },
      { id: '3d', text: '분석적이고 논리적이다', type: 'C' },
    ],
  },
  {
    id: 4,
    statements: [
      { id: '4a', text: '장애물을 극복하는 것을 좋아한다', type: 'D' },
      { id: '4b', text: '사람들에게 에너지와 활력을 불어넣는다', type: 'I' },
      { id: '4c', text: '충직하고 의지가 된다', type: 'S' },
      { id: '4d', text: '신중하게 계획을 세운다', type: 'C' },
    ],
  },
  {
    id: 5,
    statements: [
      { id: '5a', text: '위기 상황에서 즉시 행동을 주도한다', type: 'D' },
      { id: '5b', text: '다른 사람들을 설득하고 영향력을 발휘하는 것을 즐긴다', type: 'I' },
      { id: '5c', text: '가능한 한 갈등을 피한다', type: 'S' },
      { id: '5d', text: '결정하기 전에 철저히 조사한다', type: 'C' },
    ],
  },
  {
    id: 6,
    statements: [
      { id: '6a', text: '경쟁적이고 추진력이 있다', type: 'D' },
      { id: '6b', text: '자발적이고 유연하다', type: 'I' },
      { id: '6c', text: '점진적인 변화를 선호한다', type: 'S' },
      { id: '6d', text: '결정하기 전에 충분한 정보를 수집하는 것을 선호한다', type: 'C' },
    ],
  },
  {
    id: 7,
    statements: [
      { id: '7a', text: '자신을 위해 높은 목표를 설정한다', type: 'D' },
      { id: '7b', text: '다양함과 흥분을 즐긴다', type: 'I' },
      { id: '7c', text: '관계에서 조화를 유지한다', type: 'S' },
      { id: '7d', text: '명확한 지침을 선호한다', type: 'C' },
    ],
  },
  {
    id: 8,
    statements: [
      { id: '8a', text: '신속하게 결정을 내린다', type: 'D' },
      { id: '8b', text: '사람들을 쉽게 신뢰한다', type: 'I' },
      { id: '8c', text: '압박감 속에서도 침착하다', type: 'S' },
      { id: '8d', text: '실수를 꼼꼼하게 확인한다', type: 'C' },
    ],
  },
  {
    id: 9,
    statements: [
      { id: '9a', text: '현상에 도전한다', type: 'D' },
      { id: '9b', text: '자신을 솔직하게 표현한다', type: 'I' },
      { id: '9c', text: '다른 사람의 필요에 공감한다', type: 'S' },
      { id: '9d', text: '데이터와 증거에 근거하여 결정한다', type: 'C' },
    ],
  },
  {
    id: 10,
    statements: [
      { id: '10a', text: '통제권을 갖길 원한다', type: 'D' },
      { id: '10b', text: '다른 사람들을 즐겁게 해주는 것을 좋아한다', type: 'I' },
      { id: '10c', text: '평화를 만드는 사람이다', type: 'S' },
      { id: '10d', text: '확립된 방법을 따른다', type: 'C' },
    ],
  },
  {
    id: 11,
    statements: [
      { id: '11a', text: '도전을 기꺼이 받아들인다', type: 'D' },
      { id: '11b', text: '미래에 대해 낙관적이다', type: 'I' },
      { id: '11c', text: '일관되고 신뢰할 수 있다', type: 'S' },
      { id: '11d', text: '규율 있고 조직적이다', type: 'C' },
    ],
  },
  {
    id: 12,
    statements: [
      { id: '12a', text: '성과를 달성하는 것에서 큰 보람을 느낀다', type: 'D' },
      { id: '12b', text: '단체 활동을 즐긴다', type: 'I' },
      { id: '12c', text: '갑작스러운 변화를 싫어한다', type: 'S' },
      { id: '12d', text: '자세한 설명이 필요하다', type: 'C' },
    ],
  },
  {
    id: 13,
    statements: [
      { id: '13a', text: '단호하고 자신감 있다', type: 'D' },
      { id: '13b', text: '사교적이고 활기차다', type: 'I' },
      { id: '13c', text: '겸손하고 점잖다', type: 'S' },
      { id: '13d', text: '혼자 조용히 일하는 환경에서 집중력이 높다', type: 'C' },
    ],
  },
  {
    id: 14,
    statements: [
      { id: '14a', text: '명확하고 구체적인 성과를 선호한다', type: 'D' },
      { id: '14b', text: '창의적인 아이디어를 제안하는 것을 즐긴다', type: 'I' },
      { id: '14c', text: '다른 사람의 성공을 돕는 것을 선호한다', type: 'S' },
      { id: '14d', text: '데이터와 통계 작업을 선호한다', type: 'C' },
    ],
  },
  {
    id: 15,
    statements: [
      { id: '15a', text: '업무를 효율적으로 위임한다', type: 'D' },
      { id: '15b', text: '쉽게 네트워킹을 한다', type: 'I' },
      { id: '15c', text: '팀의 결정에 존중하고 따른다', type: 'S' },
      { id: '15d', text: '체계적인 접근 방식을 가지고 있다', type: 'C' },
    ],
  },
  {
    id: 16,
    statements: [
      { id: '16a', text: '어려운 문제에 정면으로 맞선다', type: 'D' },
      { id: '16b', text: '수다스럽고 표현적이다', type: 'I' },
      { id: '16c', text: '팀 플레이어다', type: 'S' },
      { id: '16d', text: '의사결정에 신중하다', type: 'C' },
    ],
  },
  {
    id: 17,
    statements: [
      { id: '17a', text: '행동을 재촉한다', type: 'D' },
      { id: '17b', text: '열정을 창출한다', type: 'I' },
      { id: '17c', text: '안정을 제공한다', type: 'S' },
      { id: '17d', text: '기준을 유지한다', type: 'C' },
    ],
  },
  {
    id: 18,
    statements: [
      { id: '18a', text: '야망 있고 목표 지향적이다', type: 'D' },
      { id: '18b', text: '사람 지향적이다', type: 'I' },
      { id: '18c', text: '서비스 지향적이다', type: 'S' },
      { id: '18d', text: '품질 지향적이다', type: 'C' },
    ],
  },
  {
    id: 19,
    statements: [
      { id: '19a', text: '경쟁에서 번창한다', type: 'D' },
      { id: '19b', text: '사회적 인정을 즐긴다', type: 'I' },
      { id: '19c', text: '경쟁보다 협력을 선호한다', type: 'S' },
      { id: '19d', text: '방해받지 않는 환경에서 집중하며 일한다', type: 'C' },
    ],
  },
  {
    id: 20,
    statements: [
      { id: '20a', text: '어려운 문제에 직면해도 망설이지 않는다', type: 'D' },
      { id: '20b', text: '사람들 앞에서 자연스럽게 이야기한다', type: 'I' },
      { id: '20c', text: '타인의 감정 변화에 민감하게 반응한다', type: 'S' },
      { id: '20d', text: '일을 시작하기 전에 단계별 계획을 세운다', type: 'C' },
    ],
  },
  {
    id: 21,
    statements: [
      { id: '21a', text: '책임과 권한을 가진 역할을 선호한다', type: 'D' },
      { id: '21b', text: '인기가 있는 것을 좋아한다', type: 'I' },
      { id: '21c', text: '안전을 좋아한다', type: 'S' },
      { id: '21d', text: '체계적으로 계획하고 일정을 지킨다', type: 'C' },
    ],
  },
  {
    id: 22,
    statements: [
      { id: '22a', text: '자신의 의견을 확신 있게 피력한다', type: 'D' },
      { id: '22b', text: '친근하고 호감 가는 성격이다', type: 'I' },
      { id: '22c', text: '타인이 필요로 할 때 도움을 준다', type: 'S' },
      { id: '22d', text: '신중하다', type: 'C' },
    ],
  },
  {
    id: 23,
    statements: [
      { id: '23a', text: '숙고보다 행동을 선호한다', type: 'D' },
      { id: '23b', text: '고독보다 상호작용을 선호한다', type: 'I' },
      { id: '23c', text: '새로움보다 익숙함을 선호한다', type: 'S' },
      { id: '23d', text: '직관보다 데이터를 선호한다', type: 'C' },
    ],
  },
  {
    id: 24,
    statements: [
      { id: '24a', text: '리더가 되어 방향을 제시한다', type: 'D' },
      { id: '24b', text: '좋아해주길 원한다', type: 'I' },
      { id: '24c', text: '도움이 되길 원한다', type: 'S' },
      { id: '24d', text: '옳길 원한다', type: 'C' },
    ],
  },
];

export type QuestionResponse = {
  questionId: number;
  mostLike: string; // statement ID
  leastLike: string; // statement ID
};

export type QuizResponses = QuestionResponse[];
