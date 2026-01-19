/**
 * SharedResultsPage Component
 * Displays shared DISC results from a URL
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResults } from '../context';
import { Button, Spinner } from '../components/common';
import { DISCRadarChart } from '../components/results/DISCRadarChart';
import { ProfileDescription } from '../components/results/ProfileDescription';
import { BehavioralIndicators } from '../components/results/BehavioralIndicators';
import { ActionPlan } from '../components/results/ActionPlan';
import { CommunicationStyleGuide } from '../components/results/CommunicationStyleGuide';
import { DecisionMakingStyle } from '../components/results/DecisionMakingStyle';
import { StressManagementGuide } from '../components/results/StressManagementGuide';

export default function SharedResultsPage() {
  const { data } = useParams();
  const navigate = useNavigate();
  const { loadFromShareData } = useResults();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!data) {
      setError('공유 데이터가 없습니다.');
      setLoading(false);
      return;
    }

    const loadedProfile = loadFromShareData(data);
    if (loadedProfile) {
      setProfile(loadedProfile);
      setLoading(false);
    } else {
      setError('유효하지 않은 공유 링크입니다.');
      setLoading(false);
    }
  }, [data, loadFromShareData]);

  const handleCollaborate = () => {
    // Navigate with the share data as partner data
    const baseUrl = (window.location.origin + import.meta.env.BASE_URL).replace(/\/$/, '');
    const partnerUrl = `${baseUrl}/shared/${data}`;
    navigate(`/collaborate?partnerData=${encodeURIComponent(partnerUrl)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="xl" label="결과를 불러오는 중..." />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              결과를 불러올 수 없습니다
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => navigate('/')} variant="primary">
              홈으로 가기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            공유된 DISC 결과
          </h1>
          <p className="text-gray-600">
            {profile.primaryType}{profile.secondaryType} 유형 프로필
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <Button onClick={handleCollaborate} size="lg" variant="primary">
            나와의 시너지 분석하기
          </Button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <DISCRadarChart scores={profile.scores} />
            <BehavioralIndicators scores={profile.scores} />
          </div>

          <div>
            <ProfileDescription profile={profile} />
          </div>
        </div>

        {/* Communication & Decision Making */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommunicationStyleGuide profile={profile} />
          <DecisionMakingStyle profile={profile} />
        </div>

        {/* Stress Management */}
        <div className="mt-6">
          <StressManagementGuide profile={profile} />
        </div>

        {/* Action Plan */}
        <div className="mt-6">
          <ActionPlan
            primaryType={profile.primaryType}
            secondaryType={profile.secondaryType}
          />
        </div>

        {/* Info */}
        <div className="mt-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              협업 분석으로 시너지 확인하기
            </h3>
            <p className="text-gray-700 mb-4">
              이 결과와 본인의 결과를 비교하여 시너지를 분석할 수 있습니다.
              위 버튼을 클릭하여 협업 분석을 시작하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
