import React from 'react';
import { StudentProfile, InterviewAttempt } from '../types';
import { Card, Badge, ProgressBar } from '../components/ui';
import { achievements } from '../data/achievements';
import { calculateReadinessScore, calculateAchievementUnlocks } from '../utils/calculations';
import { Award, Zap, BookOpen, Code2 } from 'lucide-react';

interface ProgressPageProps {
  profile: StudentProfile;
  completedRoadmapItems: string[];
  completedProjects: string[];
  interviewAttempts: InterviewAttempt[];
  unlockedAchievements: string[];
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  profile,
  completedRoadmapItems,
  completedProjects,
  interviewAttempts,
  unlockedAchievements,
}) => {
  const readinessScore = calculateReadinessScore(
    profile,
    completedRoadmapItems,
    completedProjects,
    interviewAttempts
  );

  const newUnlocks = calculateAchievementUnlocks(
    profile,
    completedRoadmapItems,
    completedProjects,
    interviewAttempts,
    unlockedAchievements
  );



  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-400">Track your career development journey</p>
      </div>

      {/* Main Readiness Score */}
      <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-700">
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-4">Career Readiness Score</h2>
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-6 relative shadow-lg">
            <div className="text-4xl font-bold text-white">{readinessScore}%</div>
          </div>
          <p className="text-gray-300 mb-4">
            {readinessScore >= 80 ? '🚀 Excellent! You\'re ready for interviews!' :
             readinessScore >= 60 ? '👍 Good progress! Keep building your portfolio.' :
             readinessScore >= 40 ? '📚 Keep learning and practicing.' :
             '🌱 Just getting started. Great job on beginning your journey!'}
          </p>
          <p className="text-gray-400 text-sm">Based on skills, roadmap, projects, and interview practice</p>
        </div>
      </Card>

      {/* Progress Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Roadmap Items', value: completedRoadmapItems.length, color: 'blue' },
          { icon: Code2, label: 'Projects Completed', value: completedProjects.length, color: 'purple' },
          { icon: Zap, label: 'Interviews Taken', value: interviewAttempts.length, color: 'yellow' },
          { icon: Award, label: 'Achievements', value: newUnlocks.length, color: 'emerald' },
        ].map((item, idx) => {
          const Icon = item.icon;
          const colorClasses: Record<string, string> = {
            blue: 'text-blue-400 bg-blue-900/20',
            purple: 'text-purple-400 bg-purple-900/20',
            yellow: 'text-yellow-400 bg-yellow-900/20',
            emerald: 'text-emerald-400 bg-emerald-900/20',
          };
          return (
            <Card key={idx}>
              <div className={`w-12 h-12 rounded-lg ${colorClasses[item.color]} flex items-center justify-center mb-3`}>
                <Icon size={24} />
              </div>
              <p className="text-gray-400 text-sm mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </Card>
          );
        })}
      </div>

      {/* Detailed Progress */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>
          <div className="space-y-4">
            <Card>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Roadmap Completion</span>
                  <Badge variant="info">{completedRoadmapItems.length} items</Badge>
                </div>
                <ProgressBar value={completedRoadmapItems.length} max={20} showLabel={false} />
              </div>
            </Card>

            <Card>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Project Completion</span>
                  <Badge variant="info">{completedProjects.length} projects</Badge>
                </div>
                <ProgressBar value={completedProjects.length} max={15} showLabel={false} />
              </div>
            </Card>

            <Card>
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Interview Practice</span>
                  <Badge variant="info">{interviewAttempts.length} attempts</Badge>
                </div>
                <ProgressBar value={interviewAttempts.length} max={20} showLabel={false} />
              </div>
            </Card>
          </div>
        </div>

        {/* Interview Performance */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Interview Performance</h2>
          <div className="space-y-4">
            {interviewAttempts.length > 0 ? (
              <>
                <Card>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Average Score</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {Math.round(interviewAttempts.reduce((sum, a) => sum + a.score, 0) / interviewAttempts.length)}%
                    </p>
                  </div>
                </Card>

                <Card>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best Score</span>
                      <span className="font-semibold text-emerald-400">
                        {Math.max(...interviewAttempts.map(a => a.score))}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lowest Score</span>
                      <span className="font-semibold text-amber-400">
                        {Math.min(...interviewAttempts.map(a => a.score))}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Attempts</span>
                      <span className="font-semibold">{interviewAttempts.length}</span>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="text-center py-8">
                <p className="text-gray-400">No interview attempts yet. Start practicing!</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const isUnlocked = newUnlocks.includes(achievement.id);
            return (
              <Card
                key={achievement.id}
                className={`text-center p-6 ${isUnlocked ? '' : 'opacity-50'}`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                {isUnlocked ? (
                  <Badge variant="success">Unlocked</Badge>
                ) : (
                  <Badge variant="info" className="text-xs">{achievement.criteria}</Badge>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Milestones */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Milestones</h2>
        <div className="space-y-4">
          {[
            { label: 'First Learning Item', completed: completedRoadmapItems.length >= 1, icon: '✅' },
            { label: 'First Project', completed: completedProjects.length >= 1, icon: '🎯' },
            { label: 'First Interview', completed: interviewAttempts.length >= 1, icon: '💪' },
            { label: '5 Roadmap Items', completed: completedRoadmapItems.length >= 5, icon: '📚' },
            { label: 'Ready for Internships', completed: readinessScore >= 60, icon: '🚀' },
            { label: 'Interview Champion', completed: interviewAttempts.length >= 10, icon: '🏆' },
          ].map((milestone, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-4 p-4 rounded-lg ${
                milestone.completed ? 'bg-emerald-900/20 border border-emerald-700/50' : 'bg-gray-800/30'
              }`}
            >
              <span className="text-2xl">{milestone.icon}</span>
              <div className="flex-1">
                <p className={milestone.completed ? 'text-emerald-300 font-semibold' : 'text-gray-400'}>
                  {milestone.label}
                </p>
              </div>
              {milestone.completed && <Badge variant="success">Achieved</Badge>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
