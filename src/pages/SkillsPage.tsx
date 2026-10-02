import React from 'react';
import { StudentProfile } from '../types';
import { Card, Badge, ProgressBar } from '../components/ui';
import { skillsByCareer } from '../data/skills';
import { BookOpen, Zap } from 'lucide-react';

interface SkillsPageProps {
  profile: StudentProfile;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ profile }) => {
  const careerSkills = skillsByCareer[profile.careerGoal] || [];
  const currentSkillsLower = profile.currentSkills.map(s => s.toLowerCase());

  const categorized = {
    strong: careerSkills.filter(s => currentSkillsLower.includes(s.name.toLowerCase())),
    missing: careerSkills.filter(s => !currentSkillsLower.includes(s.name.toLowerCase())),
  };

  const skillCoverage = (categorized.strong.length / careerSkills.length) * 100;

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skill Gap Analysis</h1>
        <p className="text-gray-400">Skills needed for {profile.careerGoal}</p>
      </div>

      {/* Overall Progress */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Overall Skill Coverage</h2>
        <ProgressBar value={categorized.strong.length} max={careerSkills.length} label="Skills Mastered" showLabel={true} />
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-gray-400 text-sm">Strong Skills</p>
            <p className="text-2xl font-bold text-emerald-400">{categorized.strong.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Skills to Master</p>
            <p className="text-2xl font-bold text-amber-400">{categorized.missing.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Coverage</p>
            <p className="text-2xl font-bold text-blue-400">{skillCoverage.toFixed(0)}%</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strong Skills */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Zap className="text-emerald-400" size={24} />
            <span>Strong Skills ({categorized.strong.length})</span>
          </h2>
          <div className="space-y-3">
            {categorized.strong.length > 0 ? (
              categorized.strong.map((skill) => (
                <Card key={skill.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <p className="text-gray-400 text-sm">{skill.description}</p>
                    </div>
                    <Badge variant="success">{skill.importance}</Badge>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8">
                <p className="text-gray-400">No strong skills yet. Add them to your profile to see them here.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Skills to Master */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <BookOpen className="text-amber-400" size={24} />
            <span>Skills to Master ({categorized.missing.length})</span>
          </h2>
          <div className="space-y-3">
            {categorized.missing.length > 0 ? (
              categorized.missing.map((skill) => (
                <Card key={skill.id} className="space-y-3 hover:border-blue-600/50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{skill.description}</p>
                      <Badge variant="info">{skill.importance}</Badge>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="font-medium text-gray-400 mb-2">Learning Resources:</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.learningResources.map((resource, idx) => (
                        <Badge key={idx} variant="warning">{resource}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8">
                <p className="text-gray-400">Great! You've mastered all the essential skills!</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <Card>
        <h2 className="text-2xl font-bold mb-6">Skills by Importance</h2>
        <div className="space-y-6">
          {(['High', 'Medium', 'Low'] as const).map(importance => {
            const skillsByImportance = careerSkills.filter(s => s.importance === importance);
            const masteredCount = skillsByImportance.filter(s => 
              currentSkillsLower.includes(s.name.toLowerCase())
            ).length;

            return (
              <div key={importance}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{importance} Priority ({masteredCount}/{skillsByImportance.length})</h3>
                  <Badge variant={importance === 'High' ? 'error' : importance === 'Medium' ? 'warning' : 'info'}>
                    {((masteredCount / skillsByImportance.length) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <ProgressBar value={masteredCount} max={skillsByImportance.length} showLabel={false} />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
