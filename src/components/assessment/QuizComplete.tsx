/**
 * QuizComplete Component
 * Screen shown when quiz is completed and redirecting to results
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../common';

export function QuizComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to results page after a short delay
    const timer = setTimeout(() => {
      navigate('/results');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Spinner size="xl" label="검사 결과를 분석 중입니다..." />
    </div>
  );
}
