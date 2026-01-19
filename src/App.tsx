/**
 * App Component
 * Main application with routing setup
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout';
import { QuizProvider } from './context/QuizContext';
import { ResultsProvider } from './context/ResultsContext';

// Pages (will be created)
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import CollaborationPage from './pages/CollaborationPage';
import SharedResultsPage from './pages/SharedResultsPage';

function App() {
  return (
    <QuizProvider>
      <ResultsProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/collaborate" element={<CollaborationPage />} />
            <Route path="/shared/:data" element={<SharedResultsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </ResultsProvider>
    </QuizProvider>
  );
}

export default App;
