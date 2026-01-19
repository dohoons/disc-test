/**
 * IndividualProfileCards Component
 * Displays communication style summary for each person
 */

import { DISCProfile } from '../../lib/disc/scoring';
import { getCommunicationStyle } from '../../lib/collaboration/communicationTips';
import { Card, CardHeader, CardBody } from '../common';

interface IndividualProfileCardsProps {
  userResults: DISCProfile;
  partnerResults: DISCProfile;
}

export function IndividualProfileCards({ userResults, partnerResults }: IndividualProfileCardsProps) {
  const userStyle = getCommunicationStyle(userResults.primaryType);
  const partnerStyle = getCommunicationStyle(partnerResults.primaryType);

  const renderProfileCard = (
    name: string,
    profile: DISCProfile,
    style: ReturnType<typeof getCommunicationStyle>,
    bgColor: string,
    borderColor: string
  ) => (
    <div className={`p-4 rounded-lg border-2 ${borderColor} ${bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-bold text-gray-900">{name}</h4>
        <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-full">
          {profile.primaryType}
          {profile.secondaryType}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        {/* Prefers */}
        <div>
          <div className="font-semibold text-gray-900 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            선호하는 것
          </div>
          <ul className="text-gray-700 space-y-0.5 ml-5">
            {style.prefers.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-xs">• {item}</li>
            ))}
          </ul>
        </div>

        {/* Avoids */}
        <div>
          <div className="font-semibold text-gray-900 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            피하는 것
          </div>
          <ul className="text-gray-700 space-y-0.5 ml-5">
            {style.avoids.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-xs">• {item}</li>
            ))}
          </ul>
        </div>

        {/* Best Practices */}
        <div>
          <div className="font-semibold text-gray-900 mb-1 flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            효과적인 접근
          </div>
          <ul className="text-gray-700 space-y-0.5 ml-5">
            {style.bestPractices.slice(0, 3).map((item, idx) => (
              <li key={idx} className="text-xs">• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader
        title="개별 프로필 분석"
        description="각자의 커뮤니케이션 스타일 이해하기"
      />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderProfileCard(
            userResults.profileName,
            userResults,
            userStyle,
            'bg-blue-50',
            'border-blue-200'
          )}
          {renderProfileCard(
            partnerResults.profileName,
            partnerResults,
            partnerStyle,
            'bg-green-50',
            'border-green-200'
          )}
        </div>
      </CardBody>
    </Card>
  );
}
