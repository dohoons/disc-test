/**
 * SharedCollaborationPage Component
 * Displays shared collaboration analysis results
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResults } from '../context';
import { SynergyMeter } from '../components/collaboration/SynergyMeter';
import { ComparisonView } from '../components/collaboration/ComparisonView';
import { CommunicationGuide } from '../components/collaboration/CommunicationGuide';
import { ShareCollaborationResults } from '../components/collaboration/ShareCollaborationResults';
import { Card } from '../components/common';
import { calculateSynergy } from '../lib/collaboration/synergyAlgorithm';

export default function SharedCollaborationPage() {
  const { data } = useParams<{ data: string }>();
  const { loadFromCollaborationShareData, setUserResults, setPartnerResults, userResults, partnerResults } = useResults();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!data) {
      setError('유효하지 않은 공유 링크입니다.');
      setIsLoading(false);
      return;
    }

    const collaborationData = loadFromCollaborationShareData(data);
    if (collaborationData) {
      setUserResults(collaborationData.userResults);
      setPartnerResults(collaborationData.partnerResults);
    } else {
      setError('협업 분석 데이터를 불러오는 중 오류가 발생했습니다.');
    }
    setIsLoading(false);
  }, [data, loadFromCollaborationShareData, setUserResults, setPartnerResults]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userResults || !partnerResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                오류가 발생했습니다
              </h3>
              <p className="text-gray-600">
                {error || '협업 분석 데이터를 불러올 수 없습니다.'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            협업 분석 결과
          </h1>
          <p className="text-gray-600">
            {userResults.profileName}와 {partnerResults.profileName}의 협업 시너지 분석
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info & Share */}
          <div className="space-y-6">
            {/* User & Partner Profiles */}
            <Card>
              <div className="p-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">내 프로필:</span> {userResults.primaryType}
                    {userResults.secondaryType} ({userResults.profileName})
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">동료 프로필:</span> {partnerResults.primaryType}
                    {partnerResults.secondaryType} ({partnerResults.profileName})
                  </p>
                </div>
              </div>
            </Card>

            {/* Synergy Score */}
            <SynergyMeter
              synergyScore={calculateSynergy(userResults, partnerResults).synergyScore}
              compatibilityLevel={calculateSynergy(userResults, partnerResults).compatibilityLevel}
            />

            {/* Share */}
            <ShareCollaborationResults />
          </div>

          {/* Right Column - Comparison & Guide */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <ComparisonView userResults={userResults} partnerResults={partnerResults} />
              <CommunicationGuide userResults={userResults} partnerResults={partnerResults} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
