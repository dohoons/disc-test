/**
 * QuizQuestion Component
 * Displays a single quiz question with answer options
 */

import { useState } from 'react';
import { discQuestions, Statement } from '../../lib/disc/questions';
import { useQuiz } from '../../context/QuizContext';
import { Card } from '../common';

export function QuizQuestion() {
  const { currentQuestion, responses, answerQuestion } = useQuiz();
  const question = discQuestions[currentQuestion];

  const [mostLike, setMostLike] = useState<string | null>(
    responses.find((r) => r.questionId === question.id)?.mostLike || null
  );
  const [leastLike, setLeastLike] = useState<string | null>(
    responses.find((r) => r.questionId === question.id)?.leastLike || null
  );

  const handleStatementClick = (statementId: string, type: 'most' | 'least') => {
    if (type === 'most') {
      // If clicking the same statement that's already selected as most, deselect it
      if (mostLike === statementId) {
        setMostLike(null);
      } else {
        setMostLike(statementId);
        // If this was previously selected as least, remove it from least
        if (leastLike === statementId) {
          setLeastLike(null);
        }
      }
    } else {
      // If clicking the same statement that's already selected as least, deselect it
      if (leastLike === statementId) {
        setLeastLike(null);
      } else {
        setLeastLike(statementId);
        // If this was previously selected as most, remove it from most
        if (mostLike === statementId) {
          setMostLike(null);
        }
      }
    }

    // Save the response
    const newMostLike = mostLike === statementId && type === 'most' ? null : mostLike;
    const newLeastLike = leastLike === statementId && type === 'least' ? null : leastLike;

    if (type === 'most') {
      if (newMostLike !== null && newLeastLike !== null) {
        answerQuestion(question.id, newMostLike === statementId ? statementId : newMostLike!, newLeastLike);
      } else if (newMostLike !== null && leastLike !== null) {
        answerQuestion(question.id, newMostLike === statementId ? statementId : newMostLike!, leastLike);
      } else if (newMostLike !== null && leastLike === statementId && newLeastLike !== null) {
        answerQuestion(question.id, newMostLike!, newLeastLike);
      }
    } else {
      if (mostLike !== null && newLeastLike !== null) {
        answerQuestion(question.id, mostLike, newLeastLike);
      } else if (newLeastLike !== null && mostLike === statementId && newMostLike !== null) {
        answerQuestion(question.id, newMostLike, newLeastLike);
      }
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

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
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
      </Card>
    </div>
  );
}
