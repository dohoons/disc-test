/**
 * CollaborationPage Component
 * Allows users to compare their DISC profile with a partner's profile
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResults } from '../context';
import { compressResult } from '../lib/utils/dataCompression';
import { Button, Card } from '../components/common';
import { ShareResults } from '../components/collaboration/ShareResults';
import { ShareCollaborationResults } from '../components/collaboration/ShareCollaborationResults';
import { SynergyMeter } from '../components/collaboration/SynergyMeter';
import { ComparisonView } from '../components/collaboration/ComparisonView';
import { CommunicationGuide } from '../components/collaboration/CommunicationGuide';

export default function CollaborationPage() {
  const [searchParams] = useSearchParams();
  const { userResults, partnerResults, setPartnerResults, loadFromShareData, setUserResults, getShareableData } = useResults();
  const [userData, setUserData] = useState('');
  const [partnerData, setPartnerData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for partner data in URL - this comes from SharedResultsPage
    const partnerDataParam = searchParams.get('partnerData');
    const sharedData = searchParams.get('data');

    if (partnerDataParam) {
      setPartnerData(decodeURIComponent(partnerDataParam));
      // Extract and load the partner data automatically
      const urlMatch = partnerDataParam.match(/\/shared\/([^/?]+)/);
      const dataToLoad = urlMatch ? urlMatch[1] : partnerDataParam.trim();
      const profile = loadFromShareData(dataToLoad);
      if (profile) {
        setPartnerResults(profile);
        // Save to localStorage for persistence
        try {
          localStorage.setItem('disc_partner_url', partnerDataParam);
        } catch (error) {
          console.error('Failed to save partner URL to localStorage:', error);
        }
      }
    }

    // Check for shared data in URL - this is the user's own results
    if (sharedData) {
      const profile = loadFromShareData(sharedData);
      if (profile) {
        // Set as user's own results
        setUserResults(profile);
        // Also populate the user input field with the share URL
        const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
        const shareUrl = `${baseUrl}/shared/${sharedData}`;
        setUserData(shareUrl);
      }
    } else if (userResults) {
      // User came directly from ResultsPage with results in memory
      // Generate and display the share URL for easy copying
      const shareData = getShareableData();
      if (shareData) {
        const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
        const compressedData = compressResult(shareData);
        const shareUrl = `${baseUrl}/shared/${compressedData}`;
        setUserData(shareUrl);
      }
    }

    // Load partner URL from localStorage only if not already set from URL parameter
    if (!partnerDataParam) {
      try {
        const savedPartnerUrl = localStorage.getItem('disc_partner_url');
        if (savedPartnerUrl) {
          setPartnerData(savedPartnerUrl);
        }
      } catch (error) {
        console.error('Failed to load partner URL from localStorage:', error);
      }
    }
  }, [searchParams, loadFromShareData, setUserResults, setPartnerResults, userResults, getShareableData]);

  const handleLoadUser = () => {
    if (!userData.trim()) {
      setError('내 결과 공유 링크를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Extract data from URL if full URL is pasted
      const urlMatch = userData.match(/\/shared\/([^/?]+)/);
      const dataToLoad = urlMatch ? urlMatch[1] : userData.trim();

      const profile = loadFromShareData(dataToLoad);
      if (profile) {
        // Store as user results
        setUserResults(profile);
        setUserData('');
      } else {
        setError('유효하지 않은 공유 링크입니다. 다시 확인해주세요.');
      }
    } catch (err) {
      setError('공유 링크를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadPartner = () => {
    if (!partnerData.trim()) {
      setError('동료 결과 공유 링크를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Extract data from URL if full URL is pasted
      const urlMatch = partnerData.match(/\/shared\/([^/?]+)/);
      const dataToLoad = urlMatch ? urlMatch[1] : partnerData.trim();

      const profile = loadFromShareData(dataToLoad);
      if (profile) {
        setPartnerResults(profile);
        // Save partner URL to localStorage for persistence
        try {
          localStorage.setItem('disc_partner_url', partnerData);
        } catch (error) {
          console.error('Failed to save partner URL to localStorage:', error);
        }
      } else {
        setError('유효하지 않은 공유 링크입니다. 다시 확인해주세요.');
      }
    } catch (err) {
      setError('공유 링크를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            협업 분석
          </h1>
          <p className="text-gray-600">
            내 결과와 동료 결과를 불러와서 시너지를 분석해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Load User Results */}
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  내 결과 불러오기
                </h3>
                <p className="text-sm text-gray-600">
                  내 검사 결과 공유 링크를 입력하세요
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={userData}
                  onChange={(e) => setUserData(e.target.value)}
                  placeholder="내 결과 공유 링크를 붙여넣으세요"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />

                <Button
                  onClick={handleLoadUser}
                  disabled={isLoading || !userData.trim()}
                  variant="primary"
                  fullWidth
                >
                  {isLoading ? '불러오는 중...' : '내 결과 불러오기'}
                </Button>

                {/* User Profile Summary */}
                {userResults && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">내 프로필:</span> {userResults.primaryType}
                      {userResults.secondaryType} ({userResults.profileName})
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Load Partner Results */}
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  동료 결과 불러오기
                </h3>
                <p className="text-sm text-gray-600">
                  동료가 공유한 링크를 입력하세요
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={partnerData}
                  onChange={(e) => setPartnerData(e.target.value)}
                  placeholder="동료 결과 공유 링크를 붙여넣으세요"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />

                <Button
                  onClick={handleLoadPartner}
                  disabled={isLoading || !partnerData.trim()}
                  variant="primary"
                  fullWidth
                >
                  {isLoading ? '불러오는 중...' : '동료 결과 불러오기'}
                </Button>

                {/* Partner Profile Summary */}
                {partnerResults && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">동료 프로필:</span> {partnerResults.primaryType}
                      {partnerResults.secondaryType} ({partnerResults.profileName})
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Share My Results (only if user has results but no partner results) */}
            {userResults && !partnerResults && <ShareResults />}

            {/* Share Collaboration Results (only if both user and partner have results) */}
            {userResults && partnerResults && <ShareCollaborationResults />}

            {/* Synergy Score */}
            {userResults && partnerResults && (
              <SynergyMeter
                synergyScore={Math.round(
                  (calculateSynergyScore(userResults, partnerResults))
                )}
                compatibilityLevel={getCompatibilityLevel(
                  calculateSynergyScore(userResults, partnerResults)
                )}
              />
            )}
          </div>

          {/* Right Column - Comparison & Guide */}
          <div className="lg:col-span-2">
            {!userResults || !partnerResults ? (
              <Card>
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    두 결과를 모두 불러오세요
                  </h3>
                  <p className="text-gray-600 mb-4">
                    내 결과와 동료 결과를 모두 불러오면 시너지 분석을 확인할 수 있습니다.
                  </p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className={userResults ? "text-green-600 font-medium" : "text-gray-400"}>
                      {userResults ? '✓ 내 결과 완료' : '○ 내 결과 필요'}
                    </div>
                    <div className={partnerResults ? "text-green-600 font-medium" : "text-gray-400"}>
                      {partnerResults ? '✓ 동료 결과 완료' : '○ 동료 결과 필요'}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                <ComparisonView userResults={userResults} partnerResults={partnerResults} />
                <CommunicationGuide userResults={userResults} partnerResults={partnerResults} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions (should be in synergy algorithm, but including here for simplicity)
function calculateSynergyScore(user: any, partner: any): number {
  const diffs = [
    Math.abs(user.scores.dominance - partner.scores.dominance),
    Math.abs(user.scores.influence - partner.scores.influence),
    Math.abs(user.scores.steadiness - partner.scores.steadiness),
    Math.abs(user.scores.conscientiousness - partner.scores.conscientiousness),
  ];
  const avgDiff = diffs.reduce((a: number, b: number) => a + b, 0) / diffs.length;
  return 100 - avgDiff;
}

function getCompatibilityLevel(score: number): string {
  if (score >= 80) return '훌륭한 조합';
  if (score >= 65) return '좋은 조합';
  if (score >= 50) return '보통의 조합';
  return '도전적인 조합';
}
