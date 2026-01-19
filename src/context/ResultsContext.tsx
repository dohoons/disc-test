/**
 * Results Context
 * Manages DISC assessment results and collaboration data
 */

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { DISCProfile, calculateDISCScores, determineDISCProfile } from '../lib/disc/scoring';
import { QuizResponses } from '../lib/disc/questions';
import { getProfileDescription } from '../lib/disc/profiles';
import { ShareableResult, decompressResult } from '../lib/utils/dataCompression';

interface ResultsContextType {
  userResults: DISCProfile | null;
  partnerResults: DISCProfile | null;
  setResults: (responses: QuizResponses) => void;
  setUserResults: (results: DISCProfile) => void;
  setPartnerResults: (results: DISCProfile) => void;
  resetResults: () => void;
  getShareableData: () => ShareableResult | null;
  loadFromShareData: (data: string) => DISCProfile | null;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [userResults, setUserResults] = useState<DISCProfile | null>(null);
  const [partnerResults, setPartnerResultsState] = useState<DISCProfile | null>(null);

  // Load results from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('disc_results');
      if (saved) {
        setUserResults(JSON.parse(saved));
      }

      const savedPartner = localStorage.getItem('disc_partner_results');
      if (savedPartner) {
        setPartnerResultsState(JSON.parse(savedPartner));
      }
    } catch (error) {
      console.error('Failed to load results from localStorage:', error);
    }
  }, []);

  const setResults = useCallback((responses: QuizResponses) => {
    const scores = calculateDISCScores(responses);
    const profile = determineDISCProfile(scores);

    // Add profile name from descriptions
    const description = getProfileDescription(profile.primaryType, profile.secondaryType);
    const enhancedProfile: DISCProfile = {
      ...profile,
      profileName: description.name,
    };

    setUserResults(enhancedProfile);

    // Save to localStorage
    try {
      localStorage.setItem('disc_results', JSON.stringify(enhancedProfile));
    } catch (error) {
      console.error('Failed to save results to localStorage:', error);
    }
  }, []);

  const setPartnerResults = useCallback((results: DISCProfile) => {
    setPartnerResultsState(results);
    // Save to localStorage
    try {
      localStorage.setItem('disc_partner_results', JSON.stringify(results));
    } catch (error) {
      console.error('Failed to save partner results to localStorage:', error);
    }
  }, []);

  const setUserResultsDirect = useCallback((results: DISCProfile) => {
    setUserResults(results);
    // Save to localStorage
    try {
      localStorage.setItem('disc_results', JSON.stringify(results));
    } catch (error) {
      console.error('Failed to save results to localStorage:', error);
    }
  }, []);

  const resetResults = useCallback(() => {
    setUserResults(null);
    setPartnerResultsState(null);
    try {
      localStorage.removeItem('disc_results');
      localStorage.removeItem('disc_partner_results');
    } catch (error) {
      console.error('Failed to clear results from localStorage:', error);
    }
  }, []);

  const getShareableData = useCallback((): ShareableResult | null => {
    if (!userResults) return null;

    return {
      scores: userResults.scores,
      primaryType: userResults.primaryType,
      secondaryType: userResults.secondaryType,
      profileName: userResults.profileName,
      timestamp: Date.now(),
    };
  }, [userResults]);

  const loadFromShareData = useCallback((data: string): DISCProfile | null => {
    try {
      const shareable = decompressResult(data);
      if (!shareable) return null;

      const profile = determineDISCProfile(shareable.scores);
      const description = getProfileDescription(profile.primaryType, profile.secondaryType);

      return {
        ...profile,
        profileName: description.name,
      };
    } catch (error) {
      console.error('Failed to load shared results:', error);
      return null;
    }
  }, []);

  return (
    <ResultsContext.Provider
      value={{
        userResults,
        partnerResults,
        setResults,
        setUserResults: setUserResultsDirect,
        setPartnerResults,
        resetResults,
        getShareableData,
        loadFromShareData,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults() {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error('useResults must be used within a ResultsProvider');
  }
  return context;
}
