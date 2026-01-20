/**
 * StressTriggers Component
 * Displays stress triggers and warning signs for both profiles
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface StressTriggersProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function StressTriggers({ userResults, partnerResults }: StressTriggersProps) {
  const getStressTriggers = (profile: DISCProfile) => {
    const { scores } = profile;
    const d = scores.dominance;
    const i = scores.influence;
    const s = scores.steadiness;
    const c = scores.conscientiousness;

    const triggers: string[] = [];
    const warningSigns: string[] = [];

    // D type stress triggers
    if (d > 50) {
      triggers.push('사소한 것까지 간섭받기');
      triggers.push('결과 없는 긴 회의');
      triggers.push('자율성 침해');
      triggers.push('경쟁에서 패배');

      warningSigns.push('인내심 상실');
      warningSigns.push('지배적 행동 강화');
      warningSigns.push('과도하게 비판적');
      warningSigns.push('결정 서두르기');
    }

    // I type stress triggers
    if (i > 50) {
      triggers.push('사회적 고립');
      triggers.push('무관심이나 무시');
      triggers.push('반복적인 일상 작업');
      triggers.push('부정적 피드백');

      warningSigns.push('과도한 말하기');
      warningSigns.push('주의 산만');
      warningSigns.push('감정적 반응');
      warningSigns.push('성과 저하');
    }

    // S type stress triggers
    if (s > 50) {
      triggers.push('예고 없는 변화');
      triggers.push('갈등 상황');
      triggers.push('명확하지 않은 기대');
      triggers.push('시간 압박');

      warningSigns.push('위축됨');
      warningSigns.push('의견 억누름');
      warningSigns.push('수동적');
      warningSigns.push('저항');
    }

    // C type stress triggers
    if (c > 50) {
      triggers.push('불충분한 정보');
      triggers.push('빠른 의사결정 압박');
      triggers.push('비판이나 실수 지적');
      triggers.push('체계 없는 업무 환경');

      warningSigns.push('과도한 분석');
      warningSigns.push('완벽주의');
      warningSigns.push('결정 회피');
      warningSigns.push('비판적 태도');
    }

    return { triggers, warningSigns };
  };

  const userStress = getStressTriggers(userResults);
  const partnerStress = getStressTriggers(partnerResults);

  const getCollaborationTips = () => {
    const tips: string[] = [];

    // D + S combination
    if (userResults.scores.dominance > 55 && partnerResults.scores.steadiness > 55) {
      tips.push('D 유형은 갑작스러운 변화를 피하고, S 유형에게 충분한 적응 시간을 주세요.');
      tips.push('S 유형은 D 유형의 빠른 속도를 이해하고, 필요한 경우 속도 조절을 요청하세요.');
    } else if (userResults.scores.steadiness > 55 && partnerResults.scores.dominance > 55) {
      tips.push('S 유형은 D 유형의 빠른 속도를 이해하고, 필요한 경우 속도 조절을 요청하세요.');
      tips.push('D 유형은 갑작스러운 변화를 피하고, S 유형에게 충분한 적응 시간을 주세요.');
    }

    // I + C combination
    if (userResults.scores.influence > 55 && partnerResults.scores.conscientiousness > 55) {
      tips.push('I 유형은 C 유형이 디테일에 집중할 시간을 주세요.');
      tips.push('C 유형은 I 유형의 아이디어를 환영하고, 데이터로 지원하세요.');
    } else if (userResults.scores.conscientiousness > 55 && partnerResults.scores.influence > 55) {
      tips.push('C 유형은 I 유형의 아이디어를 환영하고, 데이터로 지원하세요.');
      tips.push('I 유형은 C 유형이 디테일에 집중할 시간을 주세요.');
    }

    // Both high D
    if (userResults.scores.dominance > 60 && partnerResults.scores.dominance > 60) {
      tips.push('둘 다 빠른 결정을 선호하므로, 의사결정 과정에서 리더십 역할을 명확히 하세요.');
      tips.push('권력 다툼을 피하기 위해 각자의 영역을 존중하세요.');
    }

    // Both high C
    if (userResults.scores.conscientiousness > 60 && partnerResults.scores.conscientiousness > 60) {
      tips.push('둘 다 분석적이므로, 분석 마비를 피하기 위해 의사결정 마감 기한을 설정하세요.');
      tips.push('완벽함보다는 적절한 해결책에 동의하는 규칙을 만드세요.');
    }

    return tips;
  };

  const collaborationTips = getCollaborationTips();

  return (
    <Card>
      <CardHeader
        title="스트레스 트리거와 대처 방법"
        description="서로의 스트레스 요인을 이해하고 예방하세요"
      />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Stress Triggers */}
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {userResults.profileName}의 스트레스 요인
              </h4>
              <ul className="space-y-1">
                {userStress.triggers.map((trigger, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">⚠</span>
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {userResults.profileName}의 스트레스 신호
              </h4>
              <ul className="space-y-1">
                {userStress.warningSigns.map((sign, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partner Stress Triggers */}
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {partnerResults.profileName}의 스트레스 요인
              </h4>
              <ul className="space-y-1">
                {partnerStress.triggers.map((trigger, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">⚠</span>
                    {trigger}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {partnerResults.profileName}의 스트레스 신호
              </h4>
              <ul className="space-y-1">
                {partnerStress.warningSigns.map((sign, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Collaboration Tips */}
        {collaborationTips.length > 0 && (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              서로의 스트레스를 줄이는 협업 팁
            </h4>
            <ul className="space-y-2">
              {collaborationTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-purple-600 mr-2">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
