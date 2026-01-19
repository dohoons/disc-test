/**
 * QuizNavigation Component
 * Navigation controls for the quiz (previous/next buttons, question picker)
 */

import { useQuiz } from '../../context/QuizContext';
import { ProgressBar } from '../common';

interface QuizNavigationProps {
  onComplete?: () => void;
}

export function QuizNavigation({ onComplete }: QuizNavigationProps) {
  const {
    currentQuestion,
    totalQuestions,
    responses,
    goToQuestion,
  } = useQuiz();

  // Generate question numbers for navigation
  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <ProgressBar progress={(responses.length / totalQuestions) * 100} showLabel />
      </div>

      {/* Question Navigator */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {questionNumbers.map((num) => {
            const isAnswered = responses.some((r) => r.questionId === num);
            const isCurrent = num === currentQuestion + 1;

            return (
              <button
                key={num}
                onClick={() => goToQuestion(num - 1)}
                className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md scale-110'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                aria-label={`문제 ${num}로 이동`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
