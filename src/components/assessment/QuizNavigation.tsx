/**
 * QuizNavigation Component
 * Navigation controls for the quiz (previous/next buttons, question picker)
 */

import { useQuiz } from '../../context/QuizContext';
import { Button, ProgressBar } from '../common';

interface QuizNavigationProps {
  onComplete?: () => void;
}

export function QuizNavigation({ onComplete }: QuizNavigationProps) {
  const {
    currentQuestion,
    totalQuestions,
    responses,
    canGoPrevious,
    canGoNext,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    isComplete,
  } = useQuiz();

  // Check if current question is answered
  const isCurrentAnswered = responses.some((r) => r.questionId === currentQuestion + 1);

  const handleNext = () => {
    if (canGoNext) {
      nextQuestion();
    } else if (isComplete && onComplete) {
      onComplete();
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

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

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={!canGoPrevious}
        >
          ← 이전
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {responses.length} / {totalQuestions} 완료
          </span>

          {isComplete ? (
            <Button variant="primary" onClick={handleComplete} size="lg">
              결과 보기
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canGoNext || !isCurrentAnswered}
            >
              다음 →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
