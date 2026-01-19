/**
 * CommunicationGuide Component
 * Displays collaboration tips and synergy analysis
 */

import { calculateSynergy } from '../../lib/collaboration/synergyAlgorithm';
import { getCommunicationTips } from '../../lib/collaboration/communicationTips';
import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface CommunicationGuideProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function CommunicationGuide({ userResults, partnerResults }: CommunicationGuideProps) {
  const synergy = calculateSynergy(userResults, partnerResults);
  const communicationTips = getCommunicationTips(
    userResults.primaryType,
    partnerResults.primaryType
  );

  return (
    <div className="space-y-6">
      {/* Strengths */}
      <Card>
        <CardHeader
          title="팀 강점"
          description="두 사람이 함께 할 때의 강점"
        />
        <CardBody>
          <ul className="space-y-2">
            {synergy.strengths.map((strength, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                {strength}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Potential Conflicts */}
      <Card>
        <CardHeader
          title="잠재적 갈등"
          description="주의가 필요한 영역"
        />
        <CardBody>
          <ul className="space-y-2">
            {synergy.potentialConflicts.map((conflict, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-orange-600 mr-2 flex-shrink-0">!</span>
                {conflict}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Collaboration Tips */}
      <Card>
        <CardHeader
          title="협업 팁"
          description="더 나은 협업을 위한 조언"
        />
        <CardBody>
          <ul className="space-y-3">
            {synergy.collaborationTips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Communication Tips */}
      <Card>
        <CardHeader
          title={`사람 ${userResults.primaryType} → 사람 ${partnerResults.primaryType}`}
          description={communicationTips.approach}
        />
        <CardBody>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">주요 전략</h4>
              <ul className="space-y-1">
                {communicationTips.keyStrategies.map((strategy, index) => (
                  <li key={index} className="text-xs text-gray-700">
                    • {strategy}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">추천 표현</h4>
                <ul className="space-y-1">
                  {communicationTips.phraseStarters.slice(0, 3).map((phrase, index) => (
                    <li key={index} className="text-xs text-gray-700 italic">
                      "{phrase}"
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">피해야 할 표현</h4>
                <ul className="space-y-1">
                  {communicationTips.phraseAvoiders.slice(0, 3).map((phrase, index) => (
                    <li key={index} className="text-xs text-gray-700 italic">
                      "{phrase}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Best Working Styles */}
      <Card>
        <CardHeader
          title="최적의 협업 스타일"
          description="두 사람이 함께 일하기 좋은 상황"
        />
        <CardBody>
          <ul className="space-y-2">
            {synergy.bestWorkingStyles.map((style, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                {style}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
