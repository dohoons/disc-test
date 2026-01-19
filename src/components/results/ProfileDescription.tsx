/**
 * ProfileDescription Component
 * Displays detailed description of the user's DISC profile
 */

import { getProfileDescription } from '../../lib/disc/profiles';
import { DISCProfile } from '../../lib/disc/scoring';
import { Card, CardHeader, CardBody } from '../common';

interface ProfileDescriptionProps {
  profile: DISCProfile;
}

export function ProfileDescription({ profile }: ProfileDescriptionProps) {
  const description = getProfileDescription(profile.primaryType, profile.secondaryType);

  return (
    <Card>
      <CardHeader
        title={description.name}
        description={description.tagline}
      />

      <CardBody>
        {/* Description */}
        <p className="text-gray-700 mb-6">{description.description}</p>

        {/* Primary/Secondary Types */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">주요 유형</div>
            <div className="text-2xl font-bold text-disc-d">{profile.primaryType}</div>
          </div>
          <div className="flex-1 p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">보조 유형</div>
            <div className="text-2xl font-bold text-disc-i">{profile.secondaryType}</div>
          </div>
        </div>

        {/* Strengths */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            강점
          </h4>
          <ul className="space-y-2">
            {description.strengths.map((strength, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            성장 영역
          </h4>
          <ul className="space-y-2">
            {description.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-orange-600 mr-2">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>

        {/* Motivations & Fears */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">동기 부여 요소</h4>
            <ul className="space-y-1">
              {description.motivations.slice(0, 3).map((motivation, index) => (
                <li key={index} className="text-xs text-gray-700">
                  • {motivation}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">두려워하는 것</h4>
            <ul className="space-y-1">
              {description.fears.slice(0, 3).map((fear, index) => (
                <li key={index} className="text-xs text-gray-700">
                  • {fear}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
