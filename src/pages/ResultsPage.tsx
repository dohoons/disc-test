/**
 * ResultsPage Component
 * Displays the DISC assessment results
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz, useResults } from '../context';
import { Button } from '../components/common';
import { DISCRadarChart } from '../components/results/DISCRadarChart';
import { ProfileDescription } from '../components/results/ProfileDescription';
import { BehavioralIndicators } from '../components/results/BehavioralIndicators';
import { ActionPlan } from '../components/results/ActionPlan';
import { ScoreDisplay } from '../components/results/ScoreDisplay';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();
  const { userResults, resetResults } = useResults();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has completed the quiz
    if (!userResults) {
      navigate('/assessment');
    }
  }, [userResults, navigate]);

  if (!mounted || !userResults) {
    return null;
  }

  const handleRetake = () => {
    resetQuiz();
    resetResults();
    navigate('/assessment');
  };

  const handleCollaborate = () => {
    navigate('/collaborate');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            검사 결과
          </h1>
          <p className="text-gray-600">
            DISC 성격 유형 분석 결과입니다
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button onClick={handleRetake} variant="outline">
            다시 검사하기
          </Button>
          <Button onClick={handleCollaborate} variant="primary">
            협업 분석하기
          </Button>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ScoreDisplay
              scores={userResults.scores}
              primaryType={userResults.primaryType}
              secondaryType={userResults.secondaryType}
            />
            <BehavioralIndicators scores={userResults.scores} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DISCRadarChart scores={userResults.scores} />
            <ProfileDescription profile={userResults} />
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="mt-6">
          <ActionPlan
            primaryType={userResults.primaryType}
            secondaryType={userResults.secondaryType}
          />
        </div>

        {/* Share Section */}
        <div className="mt-6">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              결과 공유하기
            </h3>
            <p className="text-gray-600 mb-4">
              URL을 통해 동료와 결과를 공유하고 시너지를 분석하세요
            </p>
            <Button onClick={handleCollaborate} size="lg">
              협업 분석 시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
