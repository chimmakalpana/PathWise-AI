import React from 'react';
import { StudentProfile } from '../types';
import { Card, Badge, ProgressBar } from '../components/ui';
import { roadmapsByCareer } from '../data/roadmaps';
import { CheckCircle2, Circle, BookOpen } from 'lucide-react';

interface RoadmapPageProps {
  profile: StudentProfile;
  completedItems: string[];
  onItemComplete: (itemId: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  profile,
  completedItems,
  onItemComplete,
}) => {
  const roadmap = roadmapsByCareer[profile.careerGoal] || [];
  
  // Group by stage
  const stages = ['Fundamentals', 'Core Skills', 'Advanced Skills', 'Projects', 'Interview Preparation', 'Job Readiness'] as const;
  const groupedRoadmap = stages.map(stage => ({
    stage,
    items: roadmap.filter(item => item.stage === stage),
  })).filter(group => group.items.length > 0);

  const totalItems = roadmap.length;
  const completedCount = completedItems.length;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Learning Roadmap</h1>
        <p className="text-gray-400">Your personalized path to becoming a {profile.careerGoal}</p>
      </div>

      {/* Overall Progress */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <p className="text-gray-400">{completedCount} of {totalItems} items completed</p>
          </div>
          <div className="text-4xl font-bold text-blue-400">{totalItems > 0 ? ((completedCount / totalItems) * 100).toFixed(0) : 0}%</div>
        </div>
        <div className="mt-4">
          <ProgressBar value={completedCount} max={totalItems} showLabel={false} />
        </div>
      </Card>

      {/* Roadmap by Stage */}
      <div className="space-y-8">
        {groupedRoadmap.map(({ stage, items }) => (
          <div key={stage}>
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <BookOpen className="text-blue-400" size={24} />
              <span>{stage}</span>
              <Badge variant="info">{items.filter(i => completedItems.includes(i.id)).length}/{items.length}</Badge>
            </h2>

            <div className="space-y-3">
              {items.map((item) => {
                const isCompleted = completedItems.includes(item.id);
                return (
                  <Card
                    key={item.id}
                    hover
                    className={`transition-all ${isCompleted ? 'opacity-75 border-emerald-700/50' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => onItemComplete(item.id)}
                        className="flex-shrink-0 mt-1 transition-all"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="text-emerald-400" size={24} />
                        ) : (
                          <Circle className="text-gray-600 hover:text-blue-400" size={24} />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {item.title}
                          </h3>
                          <Badge variant="info">{item.difficulty}</Badge>
                          <Badge variant="warning">{item.estimatedHours}h</Badge>
                        </div>

                        <p className={`mb-3 ${isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
                          {item.description}
                        </p>

                        {item.learningObjectives.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-300 mb-2">Learning Objectives:</p>
                            <ul className="space-y-1">
                              {item.learningObjectives.map((objective, idx) => (
                                <li key={idx} className="text-sm text-gray-400 flex items-center space-x-2">
                                  <span className="text-blue-400">✓</span>
                                  <span>{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <Badge variant="success">Completed</Badge>
                        ) : (
                          <Badge variant="warning">Not Started</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Tips for Success</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Follow the roadmap in order - each stage builds on the previous one</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Complete projects alongside learning to reinforce concepts</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Practice mock interviews at the interview preparation stage</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Review completed items regularly to maintain your knowledge</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
