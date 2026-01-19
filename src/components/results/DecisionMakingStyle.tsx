/**
 * DecisionMakingStyle Component
 * Displays personal decision-making style analysis
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface DecisionMakingStyleProps {
  profile: DISCProfile;
}

export function DecisionMakingStyle({ profile }: DecisionMakingStyleProps) {
  const { scores } = profile;
  const d = scores.dominance;
  const i = scores.influence;
  const s = scores.steadiness;
  const c = scores.conscientiousness;

  // Calculate decision-making characteristics
  const taskOriented = d + c;
  const peopleOriented = i + s;
  const fastDecider = d + i;
  const carefulDecider = s + c;

  const getDecisionSpeed = () => {
    if (fastDecider > carefulDecider + 20) {
      return {
        level: '빠른',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: '신속하게 결정하며 실행을 중시합니다.'
      };
    } else if (carefulDecider > fastDecider + 20) {
      return {
        level: '신중한',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: '충분한 정보와 분석 후 결정합니다.'
      };
    } else {
      return {
        level: '균형 잡힌',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: '상황에 따라 결정 속도를 조절합니다.'
      };
    }
  };

  const getTaskPeopleFocus = () => {
    if (taskOriented > peopleOriented + 20) {
      return {
        focus: '과제 중심',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        description: '결과, 효율성, 목표 달성에 집중합니다.'
      };
    } else if (peopleOriented > taskOriented + 20) {
      return {
        focus: '사람 중심',
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        description: '관계, 조화, 팀원의 감정을 고려합니다.'
      };
    } else {
      return {
        focus: '균형형',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: '과제와 사람 모두를 고려합니다.'
      };
    }
  };

  const getRiskProfile = () => {
    if (d > 60 && c < 50) {
      return {
        risk: '높은 위험 감내',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: '모험적 결정을 두려워하지 않으며 빠른 실행을 선호합니다.'
      };
    } else if (c > 60 && d < 50) {
      return {
        risk: '보수적',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: '확실한 데이터와 검증된 방법을 선호합니다.'
      };
    } else {
      return {
        risk: '중간 수준',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: '계산된 위험을 감수하며 안정과 성장의 균형을 찾습니다.'
      };
    }
  };

  const getInfoNeeds = () => {
    if (c > 60 || s > 60) {
      return {
        need: '상세한 정보 필요',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        description: '결정하기 전에 충분한 데이터와 분석이 필요합니다.'
      };
    } else if (d > 60) {
      return {
        need: '핵심 정보만',
        textColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        description: '핵심적인 정보만으로도 빠르게 결정할 수 있습니다.'
      };
    } else {
      return {
        need: '적정 수준 정보',
        textColor: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        description: '필요한 만큼의 정보를 수집한 후 결정합니다.'
      };
    }
  };

  const decisionSpeed = getDecisionSpeed();
  const taskPeopleFocus = getTaskPeopleFocus();
  const riskProfile = getRiskProfile();
  const infoNeeds = getInfoNeeds();

  const getStrengths = () => {
    const strengths: string[] = [];

    if (fastDecider > carefulDecider) {
      strengths.push('신속한 실행과 대응력');
    }
    if (carefulDecider > fastDecider) {
      strengths.push('신중하고 철저한 분석');
    }
    if (taskOriented > peopleOriented) {
      strengths.push('목표 지향적 접근');
    }
    if (peopleOriented > taskOriented) {
      strengths.push('팀원 조율과 합의 도출');
    }
    if (c > 55) {
      strengths.push('데이터 기반 의사결정');
    }
    if (d > 55) {
      strengths.push('결단력과 추진력');
    }

    return strengths;
  };

  const getChallenges = () => {
    const challenges: string[] = [];

    if (fastDecider > carefulDecider + 20) {
      challenges.push('충분한 정보 수집 없이 성급하게 결정할 수 있음');
    }
    if (carefulDecider > fastDecider + 20) {
      challenges.push('분석에 너무 많은 시간을 소요하여 기회를 놓칠 수 있음');
    }
    if (taskOriented > peopleOriented + 20) {
      challenges.push('사람의 감정이나 관계를 고려하지 않을 수 있음');
    }
    if (peopleOriented > taskOriented + 20) {
      challenges.push('갈등 회피로 인해 결정이 지연될 수 있음');
    }
    if (c > 60) {
      challenges.push('완벽한 정보를 찾으려다 결정을 미룰 수 있음');
    }

    return challenges;
  };

  const getImprovementTips = () => {
    const tips: string[] = [];

    if (fastDecider > carefulDecider + 20) {
      tips.push('중요한 결정을 내리기 전에 최소한의 핵심 정보를 확인하는 습관 들이기');
      tips.push('신속한 결정의 장점을 유지하면서도 필요할 때는 멈추고 생각할 시간 갖기');
    } else if (carefulDecider > fastDecider + 20) {
      tips.push('의사결정 마감 기한을 설정하여 분석에 너무 많은 시간 소요하지 않기');
      tips.push('80% 확실하면 결정하고, 실행하면서 수정하는 방식 연습하기');
    }

    if (taskOriented > peopleOriented + 20) {
      tips.push('결과뿐만 아니라 과정에서 사람들의 감정도 고려하기');
    } else if (peopleOriented > taskOriented + 20) {
      tips.push('필요한 경우에는 불편하더라도 결단을 내려야 할 때가 있음을 인지하기');
    }

    if (c > 60) {
      tips.push('완벽한 정보보다는 적절한 수준의 정보로도 결정할 수 있음을 기억하기');
    }

    if (d > 60) {
      tips.push('빠른 결정의 장점을 유지하면서도 중요한 결정은 철저히 검토하기');
    }

    if (tips.length === 0) {
      tips.push('현재의 균형 잡힌 의사결정 스타일을 유지하면서 다양한 상황에서 연습하기');
    }

    return tips;
  };

  const strengths = getStrengths();
  const challenges = getChallenges();
  const improvementTips = getImprovementTips();

  return (
    <Card>
      <CardHeader
        title="의사결정 스타일"
        description="나의 의사결정 특성 이해하기"
      />
      <CardBody>
        <div className="space-y-4">
          {/* Decision Characteristics */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-lg border ${decisionSpeed.borderColor} ${decisionSpeed.bgColor}`}>
              <div className="text-xs text-gray-600 mb-1">결정 속도</div>
              <div className={`text-sm font-bold ${decisionSpeed.textColor}`}>{decisionSpeed.level}</div>
            </div>
            <div className={`p-3 rounded-lg border ${taskPeopleFocus.borderColor} ${taskPeopleFocus.bgColor}`}>
              <div className="text-xs text-gray-600 mb-1">결정 초점</div>
              <div className={`text-sm font-bold ${taskPeopleFocus.textColor}`}>{taskPeopleFocus.focus}</div>
            </div>
            <div className={`p-3 rounded-lg border ${riskProfile.borderColor} ${riskProfile.bgColor}`}>
              <div className="text-xs text-gray-600 mb-1">위험 감내</div>
              <div className={`text-sm font-bold ${riskProfile.textColor}`}>{riskProfile.risk}</div>
            </div>
            <div className={`p-3 rounded-lg border ${infoNeeds.borderColor} ${infoNeeds.bgColor}`}>
              <div className="text-xs text-gray-600 mb-1">정보 필요성</div>
              <div className={`text-sm font-bold ${infoNeeds.textColor}`}>{infoNeeds.need}</div>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-700 leading-relaxed">
              <span className="font-semibold">종합 분석:</span>{' '}
              {decisionSpeed.description} {taskPeopleFocus.description}{' '}
              {riskProfile.description} {infoNeeds.description}
            </p>
          </div>

          {/* Strengths */}
          {strengths.length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                나의 의사결정 강점
              </h4>
              <ul className="space-y-1">
                {strengths.map((strength, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {challenges.length > 0 && (
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                주의해야 할 점
              </h4>
              <ul className="space-y-1">
                {challenges.map((challenge, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                    <span className="text-orange-600 mr-2">⚠</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Improvement Tips */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              의사결정 개발 팁
            </h4>
            <ul className="space-y-1">
              {improvementTips.map((tip, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">💡</span>
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
