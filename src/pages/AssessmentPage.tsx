/**
 * AssessmentPage Component
 * Main page for the DISC assessment quiz
 */

import { useState, useEffect } from 'react';
import { useQuiz, useResults } from '../context';
import { QuizStart, QuizQuestion, QuizNavigation, QuizComplete } from '../components/assessment';

type QuizStep = 'start' | 'question' | 'complete';

export default function AssessmentPage() {
  const { responses, totalQuestions, isComplete, resetQuiz } = useQuiz();
  const { setResults } = useResults();
  const [currentStep, setCurrentStep] = useState<QuizStep>('start');
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    // Check if user has already started the quiz
    if (responses.length > 0) {
      setCurrentStep('question');
      setShowNavigation(true);
    }
  }, [responses.length]);

  const handleStart = () => {
    setCurrentStep('question');
    setShowNavigation(true);
  };

  const handleComplete = () => {
    if (isComplete && responses.length === totalQuestions) {
      // Calculate and save results
      setResults(responses);
      setCurrentStep('complete');
    }
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentStep('start');
    setShowNavigation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            DISC 성격 유형 검사
          </h1>
          {showNavigation && (
            <p className="text-gray-600">
              총 {totalQuestions}문제 중 {responses.length}문제 완료
            </p>
          )}
        </div>

        {/* Quiz Content */}
        {currentStep === 'start' && <QuizStart onStart={handleStart} />}

        {currentStep === 'question' && (
          <>
            <QuizQuestion onComplete={handleComplete} />
            <div className="mt-6">
              <QuizNavigation onComplete={handleComplete} />
            </div>
          </>
        )}

        {currentStep === 'complete' && <QuizComplete />}

        {/* Restart Option */}
        {showNavigation && currentStep !== 'complete' && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRestart}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              처음부터 다시 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
