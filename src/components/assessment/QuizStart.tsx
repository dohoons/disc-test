/**
 * QuizStart Component
 * Introduction screen before starting the quiz
 */

import { useQuiz } from '../../context/QuizContext';
import { Button, Card } from '../common';

interface QuizStartProps {
  onStart?: () => void;
}

export function QuizStart({ onStart }: QuizStartProps) {
  const { totalQuestions, resetQuiz } = useQuiz();

  const handleStart = () => {
    resetQuiz();
    if (onStart) {
      onStart();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-disc-d via-disc-i to-disc-c flex items-center justify-center">
            <span className="text-white font-bold text-3xl">DISC</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            DISC 성격 유형 검사
          </h1>
          <p className="text-gray-600">
            자신의 행동 스타일을 이해하고 팀 협업을 개선해보세요.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">검사 안내</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              총 <span className="font-semibold">{totalQuestions}</span>개의 질문이 있습니다.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              각 질문에서 <span className="font-semibold">가장 나와 비슷한 것</span>과 <span className="font-semibold">가장 나와 다른 것</span>을 선택하세요.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              검사는 약 <span className="font-semibold">5-10분</span> 정도 소요됩니다.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              정직하고 직관적으로 답변해주세요.
            </li>
          </ul>
        </div>

        <Button fullWidth onClick={handleStart} size="lg">
          검사 시작하기
        </Button>
      </Card>
    </div>
  );
}
