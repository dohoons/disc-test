/**
 * Quiz Context
 * Manages quiz state including responses, current question, and completion status
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { discQuestions, QuizResponses, QuestionResponse } from '../lib/disc/questions';

interface QuizContextType {
  currentQuestion: number;
  responses: QuizResponses;
  isComplete: boolean;
  totalQuestions: number;
  answerQuestion: (questionId: number, mostLike: string, leastLike: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (questionId: number) => void;
  resetQuiz: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  progress: number;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuizResponses>([]);

  const totalQuestions = discQuestions.length;
  const isComplete = responses.length === totalQuestions;

  const answerQuestion = useCallback((questionId: number, mostLike: string, leastLike: string) => {
    setResponses((prev) => {
      const existingIndex = prev.findIndex((r) => r.questionId === questionId);
      const newResponse: QuestionResponse = {
        questionId,
        mostLike,
        leastLike,
      };

      if (existingIndex >= 0) {
        // Update existing response
        const newResponses = [...prev];
        newResponses[existingIndex] = newResponse;
        return newResponses;
      } else {
        // Add new response
        return [...prev, newResponse];
      }
    });
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion, totalQuestions]);

  const previousQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const goToQuestion = useCallback((questionId: number) => {
    if (questionId >= 0 && questionId < totalQuestions) {
      setCurrentQuestion(questionId);
    }
  }, [totalQuestions]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setResponses([]);
  }, []);

  const canGoNext = currentQuestion < totalQuestions - 1;
  const canGoPrevious = currentQuestion > 0;
  const progress = Math.round((responses.length / totalQuestions) * 100);

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        responses,
        isComplete,
        totalQuestions,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        resetQuiz,
        canGoNext,
        canGoPrevious,
        progress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
