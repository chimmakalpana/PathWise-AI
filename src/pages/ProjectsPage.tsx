import React from 'react';
import { StudentProfile } from '../types';
import { Card, Button, Badge } from '../components/ui';
import { projectsByCareer } from '../data/projects';
import { Code2, CheckCircle2 } from 'lucide-react';

interface ProjectsPageProps {
  profile: StudentProfile;
  completedProjects: string[];
  onProjectComplete: (projectId: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  profile,
  completedProjects,
  onProjectComplete,
}) => {
  const projects = projectsByCareer[profile.careerGoal] || [];

  const completed = projects.filter(p => completedProjects.includes(p.id));
  const inProgress = projects.filter(p => !completedProjects.includes(p.id));

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Project Recommendations</h1>
        <p className="text-gray-400">Build portfolio projects for {profile.careerGoal}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="text-3xl font-bold text-blue-400 mb-2">{projects.length}</div>
          <p className="text-gray-400">Total Projects</p>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-emerald-400 mb-2">{completed.length}</div>
          <p className="text-gray-400">Completed</p>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-amber-400 mb-2">{inProgress.length}</div>
          <p className="text-gray-400">To Explore</p>
        </Card>
      </div>

      {/* Completed Projects */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <CheckCircle2 className="text-emerald-400" size={24} />
            <span>Completed Projects ({completed.length})</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((project) => (
              <Card key={project.id} className="flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold line-through text-gray-400">{project.title}</h3>
                    <Badge variant="success">Done!</Badge>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Skills Practiced:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skillsPracticed.map((skill, idx) => (
                          <Badge key={idx} variant="info" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onProjectComplete(project.id)}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Mark Incomplete
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Projects by Difficulty */}
      {inProgress.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
            <Code2 className="text-blue-400" size={24} />
            <span>Available Projects ({inProgress.length})</span>
          </h2>

          {(['Beginner', 'Intermediate', 'Advanced'] as const).map(difficulty => {
            const byDifficulty = inProgress.filter(p => p.difficulty === difficulty);
            if (byDifficulty.length === 0) return null;

            return (
              <div key={difficulty} className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{difficulty} Projects ({byDifficulty.length})</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {byDifficulty.map((project) => (
                    <Card key={project.id} hover className="flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold flex-1">{project.title}</h3>
                          <Badge variant="info">{project.difficulty}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-400 mb-2">Skills Practiced:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.skillsPracticed.map((skill, idx) => (
                                <Badge key={idx} variant="info" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-gray-400 mb-2">Technologies:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="warning" className="text-xs">{tech}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-900/20 border border-blue-700/50 rounded p-3">
                            <p className="text-xs text-blue-300">
                              <span className="font-semibold">Resume Value:</span> {project.resumeValue}
                            </p>
                          </div>

                          <div className="flex items-center text-xs text-gray-400">
                            <span>⏱ {project.estimatedHours} hours</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => onProjectComplete(project.id)}
                        size="sm"
                        className="w-full"
                      >
                        Start Project
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Project Tips</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Start with Beginner projects to build confidence</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Host your projects on GitHub for portfolio building</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Write detailed README files explaining your projects</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Add live demos or deployment links to your GitHub repos</span>
          </li>
          <li className="flex space-x-2">
            <span className="text-blue-400">→</span>
            <span>Showcase these projects in interviews and on your resume</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
