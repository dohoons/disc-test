/**
 * StressManagementGuide Component
 * Displays personal stress triggers and management strategies
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface StressManagementGuideProps {
  profile: DISCProfile;
}

export function StressManagementGuide({ profile }: StressManagementGuideProps) {
  const { scores } = profile;
  const d = scores.dominance;
  const i = scores.influence;
  const s = scores.steadiness;
  const c = scores.conscientiousness;

  const getStressTriggers = () => {
    const triggers: string[] = [];

    if (d > 50) {
      triggers.push('사소한 것까지 간섭받기');
      triggers.push('결과 없는 긴 회의');
      triggers.push('자율성 침해');
      triggers.push('경쟁에서 패배');
      triggers.push('능력에 대한 의심');
    }

    if (i > 50) {
      triggers.push('사회적 고립');
      triggers.push('무관심이나 무시');
      triggers.push('반복적인 일상 작업');
      triggers.push('부정적 피드백');
      triggers.push('너무 많은 규칙과 제약');
    }

    if (s > 50) {
      triggers.push('예고 없는 변화');
      triggers.push('갈등 상황');
      triggers.push('명확하지 않은 기대');
      triggers.push('시간 압박');
      triggers.push('불확실한 상황');
    }

    if (c > 50) {
      triggers.push('불충분한 정보');
      triggers.push('빠른 의사결정 압박');
      triggers.push('비판이나 실수 지적');
      triggers.push('체계 없는 업무 환경');
      triggers.push('감정적 호소');
    }

    return triggers;
  };

  const getStressSignals = () => {
    const signals: string[] = [];

    if (d > 50) {
      signals.push('인내심 상실');
      signals.push('지배적 행동 강화');
      signals.push('과도하게 비판적');
      signals.push('결정을 서두르기');
      signals.push('단호함이 공격적으로 변함');
    }

    if (i > 50) {
      signals.push('과도한 말하기');
      signals.push('주의 산만');
      signals.push('감정적 반응');
      signals.push('성과 저하');
      signals.push('부정적인 태도');
    }

    if (s > 50) {
      signals.push('위축됨');
      signals.push('의견 억누름');
      signals.push('수동적');
      signals.push('저항');
      signals.push('변화에 반대');
    }

    if (c > 50) {
      signals.push('과도한 분석');
      signals.push('완벽주의');
      signals.push('결정 회피');
      signals.push('비판적 태도');
      signals.push('세부 사항에 집착');
    }

    return signals;
  };

  const getStressManagementStrategies = () => {
    const strategies: string[] = [];

    if (d > 50) {
      strategies.push('스트레스를 느낄 때는 잠시 멈추고 깊게 숨쉬기');
      strategies.push('통제 불가능한 상황에서는 수용하고 집중할 수 있는 영역 찾기');
      strategies.push('신체 활동으로 에너지를 건설적으로 방출하기');
      strategies.push('다른 사람의 관점에서 상황을 바라보는 시간 갖기');
    }

    if (i > 50) {
      strategies.push('긍정적인 사회적 상호작용으로 에너지 재충전하기');
      strategies.push('창의적인 활동이나 취미로 스트레스 해소하기');
      strategies.push('감사 일기를 쓰거나 긍정적인 성취 기록하기');
      strategies.push('지지하는 친구나 동료와 대화하기');
    }

    if (s > 50) {
      strategies.push('안정적인 루틴과 일정 유지하기');
      strategies.push('충분한 휴식과 재충전 시간 갖기');
      strategies.push('신뢰하는 사람과 감정 나누기');
      strategies.push('작은 성취를 통해 자신감 회복하기');
    }

    if (c > 50) {
      strategies.push('완벽보다는 완료에 집중하도록 노력하기');
      strategies.push('분석과 행동 사이의 균형 찾기');
      strategies.push('스트레스 상황을 객관적으로 분석하고 해결책 생각하기');
      strategies.push('명상이나 마음챙김 연습으로 마음 비우기');
    }

    return strategies;
  };

  const getPreventionTips = () => {
    const tips: string[] = [];

    // General prevention tips for all
    tips.push('정기적인 휴식과 워라밸 유지하기');
    tips.push('자신의 한계를 인지하고 "아니오"라고 말하기');
    tips.push('건강한 생활 습관 (수면, 운동, 식사) 유지하기');

    if (d > 55) {
      tips.push('너무 많은 책임을 한 번에 짊어지지 않기');
      tips.push('위임 가능한 업무는 팀원에게 위탁하기');
    }

    if (i > 55) {
      tips.push('사회적 활동과 개인 시간의 균형 맞추기');
      tips.push('너무 많은 약속을 동시에 잡지 않기');
    }

    if (s > 55) {
      tips.push('변화가 예상될 때는 미리 정보를 수집하고 준비하기');
      tips.push('갈등 상황에서는 자신의 감정을 솔직하게 표현하기');
    }

    if (c > 55) {
      tips.push('완벽한 정보를 얻으려다 지나치게 시간 소요하지 않기');
      tips.push('데이터가 부족할 때는 경험과 직관도 활용하기');
    }

    return tips;
  };

  const triggers = getStressTriggers();
  const signals = getStressSignals();
  const strategies = getStressManagementStrategies();
  const prevention = getPreventionTips();

  return (
    <Card>
      <CardHeader
        title="스트레스 관리 가이드"
        description="나의 스트레스 요인과 관리 방법"
      />
      <CardBody>
        <div className="space-y-4">
          {/* Stress Triggers */}
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              나의 스트레스 유발 요인
            </h4>
            <p className="text-xs text-gray-600 mb-2">다음 상황에서 스트레스를 받을 수 있습니다:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {triggers.map((trigger, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0">⚠</span>
                  {trigger}
                </li>
              ))}
            </ul>
          </div>

          {/* Stress Signals */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              스트레스 신호
            </h4>
            <p className="text-xs text-gray-600 mb-2">내가 스트레스를 받고 있을 때 다음과 같은 신호가 나타날 수 있습니다:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              {signals.map((signal, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-orange-600 mr-2 flex-shrink-0">•</span>
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          {/* Management Strategies */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              스트레스 관리 전략
            </h4>
            <p className="text-xs text-gray-600 mb-2">스트레스를 받고 있을 때 다음 방법을 시도해 보세요:</p>
            <ul className="space-y-1">
              {strategies.map((strategy, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">💡</span>
                  {strategy}
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention Tips */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              스트레스 예방 팁
            </h4>
            <p className="text-xs text-gray-600 mb-2">스트레스를 미리 예방하기 위한 방법입니다:</p>
            <ul className="space-y-1">
              {prevention.map((tip, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Resources */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              추가 도움이 필요할 때
            </h4>
            <p className="text-xs text-gray-700">
              스트레스가 일상생활에 심각한 영향을 미치거나, 우울감이 2주 이상 지속된다면
              전문가의 도움을 받는 것이 좋습니다. 심각한 경우에는 직장 상담사나 정신건강 전문가와
              상담하는 것을 권장합니다.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
