import React from 'react';
import { StudentProfile } from '../types';
import { Card, Button, Badge, ProgressBar } from '../components/ui';
import { Zap, BookOpen, Code2, Target } from 'lucide-react';
import { calculateReadinessScore, calculateSkillsGaps, getNextRecommendedItem, getTopRecommendedProject } from '../utils/calculations';
import { roadmapsByCareer } from '../data/roadmaps';
import { projectsByCareer } from '../data/projects';

interface DashboardPageProps {
  profile: StudentProfile;
  completedRoadmapItems: string[];
  completedProjects: string[];
  interviewAttempts: any[];
  onNavigateTo: (page: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  completedRoadmapItems,
  completedProjects,
  interviewAttempts,
  onNavigateTo,
}) => {
  const readinessScore = calculateReadinessScore(profile, completedRoadmapItems, completedProjects, interviewAttempts);
  const skillGaps = calculateSkillsGaps(profile.careerGoal, profile.currentSkills);
  const nextItem = getNextRecommendedItem(profile.careerGoal, completedRoadmapItems);
  const topProject = getTopRecommendedProject(profile.careerGoal, completedProjects);

  const totalRoadmapItems = roadmapsByCareer[profile.careerGoal]?.length || 0;
  const totalProjects = projectsByCareer[profile.careerGoal]?.length || 0;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome back, {profile.name}! 👋</h1>
        <p className="text-gray-400">Career Goal: <span className="text-blue-400 font-semibold">{profile.careerGoal}</span></p>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Readiness Score */}
        <Card className="flex flex-col items-center justify-center py-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 relative">
            <div className="text-3xl font-bold text-white">{readinessScore}%</div>
            <svg className="absolute w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={`${(readinessScore / 100) * 283} 283`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h3 className="font-semibold text-center">Career Readiness</h3>
          <p className="text-xs text-gray-400 text-center mt-2">Based on skills, roadmap, and projects</p>
        </Card>

        {/* Roadmap Progress */}
        <Card className="flex flex-col justify-between py-6">
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen className="text-blue-400" size={24} />
            <h3 className="font-semibold">Roadmap</h3>
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-2">{completedRoadmapItems.length}/{totalRoadmapItems}</div>
          <ProgressBar value={completedRoadmapItems.length} max={totalRoadmapItems} showLabel={false} />
          <p className="text-xs text-gray-400 mt-3">Items completed</p>
        </Card>

        {/* Skills Progress */}
        <Card className="flex flex-col justify-between py-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-yellow-400" size={24} />
            <h3 className="font-semibold">Skills</h3>
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-2">{skillGaps.strong}</div>
          <ProgressBar value={skillGaps.strong} max={skillGaps.strong + skillGaps.missing} showLabel={false} />
          <p className="text-xs text-gray-400 mt-3">{skillGaps.missing} skills to master</p>
        </Card>

        {/* Projects Progress */}
        <Card className="flex flex-col justify-between py-6">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="text-purple-400" size={24} />
            <h3 className="font-semibold">Projects</h3>
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-2">{completedProjects.length}/{totalProjects}</div>
          <ProgressBar value={completedProjects.length} max={totalProjects} showLabel={false} />
          <p className="text-xs text-gray-400 mt-3">Projects built</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Next Recommended Item */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
            
            {nextItem && (
              <Card hover className="mb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="text-blue-400" size={20} />
                      <h3 className="text-lg font-semibold">Learning Roadmap</h3>
                    </div>
                    <p className="text-2xl font-bold mb-2">{nextItem.title}</p>
                    <p className="text-gray-400 mb-4">{nextItem.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="info">{nextItem.difficulty}</Badge>
                      <Badge variant="warning">{nextItem.stage}</Badge>
                      <Badge variant="success">{nextItem.estimatedHours} hours</Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigateTo('roadmap')}
                  variant="primary"
                  size="sm"
                >
                  View Roadmap
                </Button>
              </Card>
            )}

            {topProject && (
              <Card hover>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code2 className="text-purple-400" size={20} />
                      <h3 className="text-lg font-semibold">Recommended Project</h3>
                    </div>
                    <p className="text-2xl font-bold mb-2">{topProject.title}</p>
                    <p className="text-gray-400 mb-4">{topProject.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="info">{topProject.difficulty}</Badge>
                      <Badge variant="success">{topProject.estimatedHours} hours</Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigateTo('projects')}
                  variant="primary"
                  size="sm"
                >
                  Explore Projects
                </Button>
              </Card>
            )}
          </div>

          {/* Quick Stats */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <div className="text-3xl font-bold text-blue-400 mb-2">{profile.currentSkills.length}</div>
                <p className="text-gray-400 text-sm">Current Skills</p>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{interviewAttempts.length}</div>
                <p className="text-gray-400 text-sm">Interview Attempts</p>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-emerald-400 mb-2">{skillGaps.missing}</div>
                <p className="text-gray-400 text-sm">Skills to Master</p>
              </Card>
              <Card>
                <div className="text-3xl font-bold text-amber-400 mb-2">{totalRoadmapItems - completedRoadmapItems.length}</div>
                <p className="text-gray-400 text-sm">Roadmap Items Left</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => onNavigateTo('interview')}
              className="w-full justify-start"
              variant="secondary"
            >
              🎯 Mock Interview
            </Button>
            <Button
              onClick={() => onNavigateTo('advisor')}
              className="w-full justify-start"
              variant="secondary"
            >
              🤖 AI Career Advisor
            </Button>
            <Button
              onClick={() => onNavigateTo('skills')}
              className="w-full justify-start"
              variant="secondary"
            >
              🔧 Skill Gap Analysis
            </Button>
            <Button
              onClick={() => onNavigateTo('resume')}
              className="w-full justify-start"
              variant="secondary"
            >
              📄 Analyze Resume
            </Button>
            <Button
              onClick={() => onNavigateTo('progress')}
              className="w-full justify-start"
              variant="secondary"
            >
              📊 View Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
