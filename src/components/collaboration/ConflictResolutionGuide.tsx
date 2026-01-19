/**
 * ConflictResolutionGuide Component
 * Displays conflict resolution strategies based on DISC profiles
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface ConflictResolutionGuideProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function ConflictResolutionGuide({ userResults, partnerResults }: ConflictResolutionGuideProps) {
  const getCommonConflicts = () => {
    const conflicts: string[] = [];
    const { scores: userScores } = userResults;
    const { scores: partnerScores } = partnerResults;

    // Speed conflict
    const speed1 = userScores.dominance + userScores.influence;
    const speed2 = partnerScores.dominance + partnerScores.influence;
    if (Math.abs(speed1 - speed2) > 30) {
      conflicts.push('의사결정 속도 차이로 인한 갈등');
    }

    // Task vs People focus conflict
    const task1 = userScores.dominance + userScores.conscientiousness;
    const people1 = userScores.influence + userScores.steadiness;
    const task2 = partnerScores.dominance + partnerScores.conscientiousness;
    const people2 = partnerScores.influence + partnerScores.steadiness;

    if ((task1 > people1 + 20) !== (task2 > people2 + 20)) {
      conflicts.push('과제 중심 vs 사람 중심 접근 방식 차이');
    }

    // Risk tolerance conflict
    const risk1 = userScores.dominance - userScores.conscientiousness;
    const risk2 = partnerScores.dominance - partnerScores.conscientiousness;
    if (Math.abs(risk1 - risk2) > 30) {
      conflicts.push('위험 감내도 차이로 인한 의견 대립');
    }

    // Communication style conflict
    if ((userScores.dominance > 55) !== (partnerScores.dominance > 55)) {
      conflicts.push('직선적 vs 우회적 커뮤니케이션 스타일 차이');
    }

    // Detail vs Big picture conflict
    if ((userScores.conscientiousness > 55) !== (partnerScores.conscientiousness > 55)) {
      conflicts.push('디테일 vs 큰 그림 관점 차이');
    }

    // Change response conflict
    if ((userScores.steadiness > 55) !== (partnerScores.steadiness > 55)) {
      conflicts.push('변화 수용성 차이로 인한 갈등');
    }

    return conflicts;
  };

  const getResolutionStrategies = () => {
    const strategies: string[] = [];
    const { primaryType: t1 } = userResults;
    const { primaryType: t2 } = partnerResults;

    // D + D conflicts
    if (t1 === 'D' && t2 === 'D') {
      strategies.push('명확한 리더십 역할 분담 - 각자의 강점 영역 정의');
      strategies.push('의사결정 권한 범위를 미리 합의');
      strategies.push('승패보다는 상호 이익에 집중');
    }

    // I + I conflicts
    if (t1 === 'I' && t2 === 'I') {
      strategies.push('아이디어 실행을 위한 구체적인 행동 계획 수립');
      strategies.push('한 번에 한 사람씩 말할 수 있는 규칙 설정');
      strategies.push('사회적 활동과 실제 업무 균형 유지');
    }

    // S + S conflicts
    if (t1 === 'S' && t2 === 'S') {
      strategies.push('누군가는 주도적으로 의사결정을 해야 한다는 점 인지');
      strategies.push('변화가 필요할 때 서로 격려하는 체계 마련');
      strategies.push('갈등 회피보다는 건설적 대화 방법 학습');
    }

    // C + C conflicts
    if (t1 === 'C' && t2 === 'C') {
      strategies.push('분석 마비를 방지하기 위해 의사결정 마감 기한 설정');
      strategies.push('완벽함보다는 적정 수준의 결과에 합의');
      strategies.push('과도한 비판을 줄이고 긍정적 피드백 비중 높이기');
    }

    // D + S combination
    if ((t1 === 'D' && t2 === 'S') || (t1 === 'S' && t2 === 'D')) {
      strategies.push('D 유형은 S 유형에게 처리할 시간을 충분히 제공');
      strategies.push('S 유형은 명확한 의사표현 연습');
      strategies.push('급변하는 상황에서는 사전 협의 프로세스 마련');
    }

    // I + C combination
    if ((t1 === 'I' && t2 === 'C') || (t1 === 'C' && t2 === 'I')) {
      strategies.push('I 유형은 데이터로 뒷받침된 제안 준비');
      strategies.push('C 유형은 창의적 아이디어에 개방적인 태도');
      strategies.push('브레인스토밍과 분석 단계를 분리해서 진행');
    }

    // D + C combination
    if ((t1 === 'D' && t2 === 'C') || (t1 === 'C' && t2 === 'D')) {
      strategies.push('결정 속도와 분석 깊이 사이의 균형점 찾기');
      strategies.push('C 유형은 핵심 데이터를 먼저, 디테일은 나중에');
      strategies.push('D 유형은 왜 충분한 분석이 필요한지 설명 경청');
    }

    // I + S combination
    if ((t1 === 'I' && t2 === 'S') || (t1 === 'S' && t2 === 'I')) {
      strategies.push('I 유형은 S 유형의 신중함을 존중');
      strategies.push('S 유형은 새로운 아이디어에 더 개방적');
      strategies.push('사회적 활동과 안정적인 업무 흐름 균형');
    }

    // General strategies
    strategies.push('서로의 의도를 긍정적으로 해석하기');
    strategies.push('갈등 상황에서는 잠시 멈추고 상대방 관점에서 생각해보기');

    return strategies;
  };

  const getConflictPreventionTips = () => {
    const tips: string[] = [];
    const { scores: s1 } = userResults;
    const { scores: s2 } = partnerResults;

    tips.push('정기적인 1:1 미팅으로 불만 사항을 조기에 파악');
    tips.push('프로젝트 시작 시 각자의 역할과 기대치 명확히 정의');

    // Speed differences
    const speedDiff = Math.abs((s1.dominance + s1.influence) - (s2.dominance + s2.influence));
    if (speedDiff > 30) {
      tips.push('의사결정 속도 차이를 인지하고, 타협안 미리 준비');
    }

    // Risk differences
    const riskDiff = Math.abs((s1.dominance - s1.conscientiousness) - (s2.dominance - s2.conscientiousness));
    if (riskDiff > 30) {
      tips.push('위험 감내도 차이를 고려한 의사결정 프로세스 설계');
    }

    tips.push('감정적 반응 전에 24시간 생각할 시간 갖기');
    tips.push('제3자의 관점이 필요할 때는 중립적인 동료의 의견 구하기');

    return tips;
  };

  const commonConflicts = getCommonConflicts();
  const resolutionStrategies = getResolutionStrategies();
  const preventionTips = getConflictPreventionTips();

  return (
    <Card>
      <CardHeader
        title="갈등 해결 가이드"
        description="갈등 상황에서의 대처 방법과 예방 전략"
      />
      <CardBody>
        {/* Common Conflicts */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            예상되는 갈등 유형
          </h4>
          {commonConflicts.length > 0 ? (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <ul className="space-y-2">
                {commonConflicts.map((conflict, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">⚡</span>
                    {conflict}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-gray-700 flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                두 분의 DISC 유형 조합은 큰 갈등 가능성이 낮습니다.
              </p>
            </div>
          )}
        </div>

        {/* Resolution Strategies */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            갈등 해결 전략
          </h4>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <ul className="space-y-2">
              {resolutionStrategies.map((strategy, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {strategy}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prevention Tips */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            갈등 예방 팁
          </h4>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <ul className="space-y-2">
              {preventionTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
