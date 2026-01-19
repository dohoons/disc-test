/**
 * DecisionMakingComparison Component
 * Displays decision-making style comparison between two profiles
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface DecisionMakingComparisonProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function DecisionMakingComparison({ userResults, partnerResults }: DecisionMakingComparisonProps) {
  const getDecisionMakingStyle = (profile: DISCProfile) => {
    const { scores } = profile;
    const d = scores.dominance;
    const i = scores.influence;
    const s = scores.steadiness;
    const c = scores.conscientiousness;

    const styles: string[] = [];

    // Task vs People orientation
    const taskOriented = d + c;
    const peopleOriented = i + s;

    if (taskOriented > peopleOriented + 20) {
      styles.push('과제 중심적 의사결정');
    } else if (peopleOriented > taskOriented + 20) {
      styles.push('사람 중심적 의사결정');
    } else {
      styles.push('균형 잡힌 의사결정');
    }

    // Speed
    const fastDecider = d + i;
    const carefulDecider = s + c;

    if (fastDecider > carefulDecider + 20) {
      styles.push('빠른 결정 선호');
    } else if (carefulDecider > fastDecider + 20) {
      styles.push('신중한 결정 선호');
    } else {
      styles.push('상황에 따른 결정 속도');
    }

    // Risk tolerance
    if (d > 60 && c < 50) {
      styles.push('높은 위험 감내');
    } else if (c > 60 && d < 50) {
      styles.push('낮은 위험 감내 (보수적)');
    } else {
      styles.push('중간 수준 위험 감내');
    }

    // Information needs
    if (c > 60 || s > 60) {
      styles.push('충분한 정보 필요');
    } else if (d > 60) {
      styles.push('핵심 정보만으로 결정');
    } else {
      styles.push('적정 수준의 정보 필요');
    }

    return styles;
  };

  const userStyles = getDecisionMakingStyle(userResults);
  const partnerStyles = getDecisionMakingStyle(partnerResults);

  const getComparisonInsight = () => {
    const userD = userResults.scores.dominance;
    const userI = userResults.scores.influence;
    const userS = userResults.scores.steadiness;
    const userC = userResults.scores.conscientiousness;

    const partnerD = partnerResults.scores.dominance;
    const partnerI = partnerResults.scores.influence;
    const partnerS = partnerResults.scores.steadiness;
    const partnerC = partnerResults.scores.conscientiousness;

    const userSpeed = userD + userI;
    const partnerSpeed = partnerD + partnerI;
    const userThoroughness = userS + userC;
    const partnerThoroughness = partnerS + partnerC;

    const insights: string[] = [];

    // Speed comparison
    if (Math.abs(userSpeed - partnerSpeed) > 30) {
      if (userSpeed > partnerSpeed) {
        insights.push('나는 동료보다 더 빠르게 결정하는 경향이 있어, 동료가 충분히 검토할 시간을 주는 것이 중요합니다.');
      } else {
        insights.push('동료는 나보다 더 빠르게 결정하는 경향이 있어, 신중하게 검토가 필요한 사안은 미리 언급하는 것이 좋습니다.');
      }
    }

    // Thoroughness comparison
    if (Math.abs(userThoroughness - partnerThoroughness) > 30) {
      if (userThoroughness > partnerThoroughness) {
        insights.push('나는 동료보다 더 꼼꼼하게 분석하는 경향이 있어, 결론을 너무 미루지 않도록 주의가 필요합니다.');
      } else {
        insights.push('동료는 나보다 더 꼼꼼하게 분석하는 경향이 있어, 충분한 데이터를 제공하면 의사결정에 도움이 됩니다.');
      }
    }

    // Risk comparison
    const userRisk = userD - userC;
    const partnerRisk = partnerD - partnerC;

    if (Math.abs(userRisk - partnerRisk) > 30) {
      if (userRisk > partnerRisk) {
        insights.push('나는 동료보다 더 모험적인 결정을 선호하여, 리스크를 함께 검토하는 과정이 필요합니다.');
      } else {
        insights.push('동료는 나보다 더 모험적인 결정을 선호하여, 리스크를 구체적으로 제시하는 것이 좋습니다.');
      }
    }

    if (insights.length === 0) {
      insights.push('두 분은 의사결정 스타일이 비슷하여, 의사결정 과정에서 큰 갈등 없이 협력할 수 있습니다.');
    }

    return insights;
  };

  const comparisonInsights = getComparisonInsight();

  return (
    <Card>
      <CardHeader
        title="의사결정 스타일 비교"
        description="서로 다른 의사결정 스타일 이해하기"
      />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Decision Style */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              {userResults.profileName}의 의사결정 스타일
            </h4>
            <ul className="space-y-2">
              {userStyles.map((style, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {style}
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Decision Style */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              {partnerResults.profileName}의 의사결정 스타일
            </h4>
            <ul className="space-y-2">
              {partnerStyles.map((style, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {style}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Insights */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            의사결정 시 참고사항
          </h4>
          <ul className="space-y-2">
            {comparisonInsights.map((insight, idx) => (
              <li key={idx} className="text-xs text-gray-700 flex items-start">
                <span className="text-yellow-600 mr-2">→</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
