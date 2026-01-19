/**
 * QuizQuestion Component
 * Displays a single quiz question with answer options
 */

import { useState, useCallback } from 'react';
import { discQuestions, Statement } from '../../lib/disc/questions';
import { useQuiz } from '../../context/QuizContext';
import { Card, Button } from '../common';

interface QuizQuestionProps {
  onComplete?: () => void;
}

export function QuizQuestion({ onComplete }: QuizQuestionProps) {
  const { currentQuestion, responses, answerQuestion, removeQuestionResponse, nextQuestion, canGoNext, isComplete, canGoPrevious, previousQuestion, totalQuestions } = useQuiz();
  const question = discQuestions[currentQuestion];

  // Check if current question is answered
  const isCurrentAnswered = responses.some((r) => r.questionId === question.id);

  const [mostLike, setMostLike] = useState<string | null>(
    responses.find((r) => r.questionId === question.id)?.mostLike || null
  );
  const [leastLike, setLeastLike] = useState<string | null>(
    responses.find((r) => r.questionId === question.id)?.leastLike || null
  );

  const handleStatementClick = (statementId: string, type: 'most' | 'least') => {
    // Calculate new state values first before updating
    let newMostLike: string | null = mostLike;
    let newLeastLike: string | null = leastLike;

    if (type === 'most') {
      // If clicking the same statement that's already selected as most, deselect it
      if (mostLike === statementId) {
        newMostLike = null;
      } else {
        newMostLike = statementId;
        // If this was previously selected as least, remove it from least
        if (leastLike === statementId) {
          newLeastLike = null;
        }
      }
    } else {
      // If clicking the same statement that's already selected as least, deselect it
      if (leastLike === statementId) {
        newLeastLike = null;
      } else {
        newLeastLike = statementId;
        // If this was previously selected as most, remove it from most
        if (mostLike === statementId) {
          newMostLike = null;
        }
      }
    }

    // Update state
    setMostLike(newMostLike);
    setLeastLike(newLeastLike);

    // Save the response only if both are selected
    if (newMostLike !== null && newLeastLike !== null) {
      answerQuestion(question.id, newMostLike, newLeastLike);
    } else {
      // Remove the response if either selection is cleared
      removeQuestionResponse(question.id);
    }
  };

  const isSelected = (statementId: string, type: 'most' | 'least') => {
    return type === 'most' ? mostLike === statementId : leastLike === statementId;
  };

  const getStatementClass = (statement: Statement, type: 'most' | 'least') => {
    const baseClass = 'p-4 rounded-lg border-2 cursor-pointer transition-all min-h-[80px] flex items-center justify-center text-center';
    const selectedClass = isSelected(statement.id, type)
      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
      : 'border-gray-200 hover:border-gray-300 bg-white';

    return `${baseClass} ${selectedClass}`;
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && mostLike && leastLike) {
        e.preventDefault();
        if (isComplete && onComplete) {
          onComplete();
        } else if (canGoNext) {
          nextQuestion();
        }
      }
    },
    [mostLike, leastLike, canGoNext, isComplete, onComplete, nextQuestion]
  );

  return (
    <div className="max-w-3xl mx-auto" onKeyDown={handleKeyDown} tabIndex={-1}>
      <Card className="px-5 md:px-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">
              질문 {currentQuestion + 1} / {discQuestions.length}
            </span>
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            각 문장을 읽고 가장 나와 비슷한 것과 가장 나와 다른 것을 선택하세요.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-8">
          {/* Most Like Column */}
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              가장 나와 비슷한 것
            </h3>
            <div className="space-y-3">
              {question.statements.map((statement) => (
                <button
                  key={statement.id}
                  onClick={() => handleStatementClick(statement.id, 'most')}
                  className={getStatementClass(statement, 'most')}
                  type="button"
                  aria-pressed={isSelected(statement.id, 'most')}
                >
                  <span className="text-sm md:text-base">{statement.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Least Like Column */}
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
              가장 나와 다른 것
            </h3>
            <div className="space-y-3">
              {question.statements.map((statement) => (
                <button
                  key={statement.id}
                  onClick={() => handleStatementClick(statement.id, 'least')}
                  className={getStatementClass(statement, 'least')}
                  type="button"
                  aria-pressed={isSelected(statement.id, 'least')}
                >
                  <span className="text-sm md:text-base">{statement.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selection Status */}
        <div className="mt-6 py-4 px-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {mostLike ? (
                <span className="text-green-700 font-medium">✓ 가장 비슷한 것 선택됨</span>
              ) : (
                <span>가장 비슷한 것을 선택해주세요</span>
              )}
            </span>
            <span className="text-gray-600">
              {leastLike ? (
                <span className="text-red-700 font-medium">✓ 가장 다른 것 선택됨</span>
              ) : (
                <span>가장 다른 것을 선택해주세요</span>
              )}
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="sticky bottom-0 flex items-center justify-between py-4 -mx-5 px-5 bg-white border-t border-gray-200 md:static md:border-0 md:py-0 md:-mx-6 md:px-6 mt-6">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            size="sm"
          >
            ← 이전
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {responses.length} / {totalQuestions}
            </span>

            {isComplete ? (
              <Button variant="primary" onClick={onComplete} size="sm">
                결과 보기
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  if (canGoNext) nextQuestion();
                }}
                disabled={!canGoNext || !isCurrentAnswered}
                size="sm"
              >
                다음 →
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
