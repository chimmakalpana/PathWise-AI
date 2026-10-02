import { useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { SkillsPage } from './pages/SkillsPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { InterviewPage } from './pages/InterviewPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { ProgressPage } from './pages/ProgressPage';
import { ResumePage } from './pages/ResumePage';
import { calculateAchievementUnlocks } from './utils/calculations';

function App() {
  const {
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
  } = useAppState();

  // Check for achievement unlocks when progress changes
  useEffect(() => {
    if (state.profile) {
      const newUnlocks = calculateAchievementUnlocks(
        state.profile,
        state.completedRoadmapItems,
        state.completedProjects,
        state.interviewAttempts,
        state.unlockedAchievements
      );

      const newAchievements = newUnlocks.filter(id => !state.unlockedAchievements.includes(id));
      newAchievements.forEach(id => unlockAchievement(id));
    }
  }, [state.completedRoadmapItems.length, state.completedProjects.length, state.interviewAttempts.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading PathWise AI...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    clearAllData();
  };

  const renderPage = () => {
    if (!state.profile) {
      if (state.currentPage === 'onboarding') {
        return <OnboardingPage onProfileCreated={setProfile} />;
      }
      return <LandingPage onGetStarted={() => setCurrentPage('onboarding')} />;
    }

    switch (state.currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            profile={state.profile}
            completedRoadmapItems={state.completedRoadmapItems}
            completedProjects={state.completedProjects}
            interviewAttempts={state.interviewAttempts}
            onNavigateTo={page => setCurrentPage(page as any)}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            profile={state.profile}
            onProfileUpdate={(profile) => {
              setProfile(profile);
              setCurrentPage('dashboard');
            }}
          />
        );
      case 'skills':
        return <SkillsPage profile={state.profile} />;
      case 'roadmap':
        return (
          <RoadmapPage
            profile={state.profile}
            completedItems={state.completedRoadmapItems}
            onItemComplete={completeRoadmapItem}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            profile={state.profile}
            completedProjects={state.completedProjects}
            onProjectComplete={completeProject}
          />
        );
      case 'interview':
        return (
          <InterviewPage
            profile={state.profile}
            interviewAttempts={state.interviewAttempts}
            onAnswerSubmit={addInterviewAttempt}
          />
        );
      case 'advisor':
        return (
          <AdvisorPage
            profile={state.profile}
            messages={state.adviceHistory}
            onSendMessage={addAdviceMessage}
          />
        );
      case 'progress':
        return (
          <ProgressPage
            profile={state.profile}
            completedRoadmapItems={state.completedRoadmapItems}
            completedProjects={state.completedProjects}
            interviewAttempts={state.interviewAttempts}
            unlockedAchievements={state.unlockedAchievements}
          />
        );
      case 'resume':
        return (
          <ResumePage
            profile={state.profile}
            analysis={state.resumeAnalysis}
            onAnalyze={setResumeAnalysis}
          />
        );
      default:
        return (
          <DashboardPage
            profile={state.profile}
            completedRoadmapItems={state.completedRoadmapItems}
            completedProjects={state.completedProjects}
            interviewAttempts={state.interviewAttempts}
            onNavigateTo={page => setCurrentPage(page as any)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {state.profile && (
        <Navigation
          currentPage={state.currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
          profileName={state.profile.name}
        />
      )}
      <main className="min-h-screen">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
