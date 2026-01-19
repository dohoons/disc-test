/**
 * ActionPlan Component
 * Displays actionable tips based on DISC profile
 */

import { getActionPlan } from '../../lib/disc/profiles';
import { DISCType } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface ActionPlanProps {
  primaryType: DISCType;
  secondaryType: DISCType;
}

export function ActionPlan({ primaryType, secondaryType }: ActionPlanProps) {
  const actionPlan = getActionPlan(primaryType, secondaryType);

  return (
    <Card>
      <CardHeader
        title="실천 가이드"
        description="자신의 성격 유형을 바탕으로 한 성장과 협업을 위한 팁"
      />

      <CardBody>
        <div className="space-y-6">
          {actionPlan.map((section, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">{section.category}</h4>
              <ul className="space-y-1">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Tips */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            더 알아보기
          </h4>
          <p className="text-sm text-gray-700">
            다른 DISC 유형과의 협업 방법을 알아보려면{' '}
            <a href="/collaborate" className="text-blue-600 hover:underline font-medium">
              협업 분석
            </a>
            페이지를 확인하세요.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
