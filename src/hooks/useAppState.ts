import { useState, useEffect, useCallback } from 'react';
import { StudentProfile, AppState } from '../types';

const STORAGE_KEY = 'pathwise-ai-state';

const initialState: AppState = {
  profile: null,
  currentPage: 'landing',
  completedRoadmapItems: [],
  completedProjects: [],
  interviewAttempts: [],
  unlockedAchievements: [],
  adviceHistory: [],
  resumeAnalysis: null,
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load state from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoading]);

  const setProfile = useCallback((profile: StudentProfile | null) => {
    setState(prev => ({
      ...prev,
      profile,
      currentPage: profile ? 'dashboard' : 'landing',
    }));
  }, []);

  const setCurrentPage = useCallback((page: AppState['currentPage']) => {
    setState(prev => ({ ...prev, currentPage: page }));
  }, []);

  const completeRoadmapItem = useCallback((itemId: string) => {
    setState(prev => ({
      ...prev,
      completedRoadmapItems: [...new Set([...prev.completedRoadmapItems, itemId])],
    }));
  }, []);

  const completeProject = useCallback((projectId: string) => {
    setState(prev => ({
      ...prev,
      completedProjects: [...new Set([...prev.completedProjects, projectId])],
    }));
  }, []);

  const addInterviewAttempt = useCallback((attempt: AppState['interviewAttempts'][0]) => {
    setState(prev => ({
      ...prev,
      interviewAttempts: [...prev.interviewAttempts, attempt],
    }));
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setState(prev => ({
      ...prev,
      unlockedAchievements: [...new Set([...prev.unlockedAchievements, achievementId])],
    }));
  }, []);

  const addAdviceMessage = useCallback((message: AppState['adviceHistory'][0]) => {
    setState(prev => ({
      ...prev,
      adviceHistory: [...prev.adviceHistory, message],
    }));
  }, []);

  const setResumeAnalysis = useCallback((analysis: AppState['resumeAnalysis']) => {
    setState(prev => ({
      ...prev,
      resumeAnalysis: analysis,
    }));
  }, []);

  const clearAllData = useCallback(() => {
    setState(initialState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    state,
    isLoading,
    setProfile,
    setCurrentPage,
    completeRoadmapItem,
    completeProject,
    addInterviewAttempt,
    unlockAchievement,
    addAdviceMessage,
    setResumeAnalysis,
    clearAllData,
  };
};
