import { StudentProfile, CareerGoal, RoadmapItem, Project, InterviewAttempt } from '../types';
import { skillsByCareer } from '../data/skills';
import { roadmapsByCareer } from '../data/roadmaps';
import { projectsByCareer } from '../data/projects';
import { achievements } from '../data/achievements';

export const calculateReadinessScore = (
  profile: StudentProfile | null,
  completedRoadmapItems: string[],
  completedProjects: string[],
  interviewAttempts: InterviewAttempt[]
): number => {
  if (!profile) return 0;

  let score = 0;
  const weights = {
    skills: 0.2,
    roadmap: 0.3,
    projects: 0.25,
    interview: 0.15,
    resume: 0.1,
  };

  // Skills coverage (0-100)
  const careerSkills = skillsByCareer[profile.careerGoal] || [];
  const strongSkills = profile.currentSkills.length;
  const skillsCoverage = careerSkills.length > 0 ? (strongSkills / careerSkills.length) * 100 : 0;
  score += Math.min(skillsCoverage, 100) * weights.skills;

  // Roadmap completion (0-100)
  const careerRoadmap = roadmapsByCareer[profile.careerGoal] || [];
  const roadmapCompletion = careerRoadmap.length > 0 ? (completedRoadmapItems.length / careerRoadmap.length) * 100 : 0;
  score += Math.min(roadmapCompletion, 100) * weights.roadmap;

  // Projects completion (0-100)
  const careerProjects = projectsByCareer[profile.careerGoal] || [];
  const projectsCompletion = careerProjects.length > 0 ? (completedProjects.length / careerProjects.length) * 100 : 0;
  score += Math.min(projectsCompletion, 100) * weights.projects;

  // Interview attempts (0-100)
  const interviewScore = Math.min((interviewAttempts.length / 5) * 100, 100);
  score += interviewScore * weights.interview;

  // Resume readiness (0-100)
  const hasBasicInfo = !!profile.email && !!profile.name && !!profile.college;
  const resumeScore = hasBasicInfo ? 50 : 0;
  score += resumeScore * weights.resume;

  return Math.round(score);
};

export const calculateSkillsGaps = (
  careerGoal: CareerGoal,
  currentSkills: string[]
): { missing: number; partial: number; strong: number } => {
  const careerSkills = skillsByCareer[careerGoal] || [];
  const currentSkillsLower = currentSkills.map(s => s.toLowerCase());

  let missing = 0;
  let partial = 0;
  let strong = 0;

  careerSkills.forEach(skill => {
    const hasSkill = currentSkillsLower.includes(skill.name.toLowerCase());
    if (hasSkill) {
      strong++;
    } else {
      missing++;
    }
  });

  return { missing, partial, strong };
};

export const getNextRecommendedItem = (
  careerGoal: CareerGoal,
  completedRoadmapItems: string[]
): RoadmapItem | null => {
  const roadmap = roadmapsByCareer[careerGoal] || [];
  const completed = new Set(completedRoadmapItems);
  
  for (const item of roadmap) {
    if (!completed.has(item.id)) {
      return item;
    }
  }
  return null;
};

export const getTopRecommendedProject = (
  careerGoal: CareerGoal,
  completedProjects: string[]
): Project | null => {
  const projects = projectsByCareer[careerGoal] || [];
  const completed = new Set(completedProjects);
  
  for (const project of projects) {
    if (!completed.has(project.id) && project.difficulty === 'Beginner') {
      return project;
    }
  }
  
  for (const project of projects) {
    if (!completed.has(project.id)) {
      return project;
    }
  }
  return null;
};

export const calculateAchievementUnlocks = (
  profile: StudentProfile | null,
  completedRoadmapItems: string[],
  completedProjects: string[],
  interviewAttempts: InterviewAttempt[],
  unlockedAchievements: string[]
): string[] => {
  if (!profile) return [];

  const newUnlocks: string[] = [...unlockedAchievements];

  // First Step
  if (completedRoadmapItems.length >= 1 && !unlockedAchievements.includes('ach-1')) {
    newUnlocks.push('ach-1');
  }

  // Skill Builder
  if (completedRoadmapItems.length >= 5 && !unlockedAchievements.includes('ach-2')) {
    newUnlocks.push('ach-2');
  }

  // Project Starter
  if (completedProjects.length >= 1 && !unlockedAchievements.includes('ach-3')) {
    newUnlocks.push('ach-3');
  }

  // Project Pro
  if (completedProjects.length >= 5 && !unlockedAchievements.includes('ach-4')) {
    newUnlocks.push('ach-4');
  }

  // Interview Ready
  if (interviewAttempts.length >= 5 && !unlockedAchievements.includes('ach-5')) {
    newUnlocks.push('ach-5');
  }

  // Consistent Learner
  if (completedRoadmapItems.length >= 10 && !unlockedAchievements.includes('ach-7')) {
    newUnlocks.push('ach-7');
  }

  // Interview Champion
  if (interviewAttempts.length >= 10 && !unlockedAchievements.includes('ach-10')) {
    newUnlocks.push('ach-10');
  }

  return newUnlocks;
};

export const getAchievementById = (id: string) => {
  return achievements.find(a => a.id === id);
};

export const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.ceil(hours * 60)} min`;
  if (hours === 1) return '1 hour';
  return `${hours} hours`;
};

export const getCareerGoalsOptions = (): CareerGoal[] => [
  'Software Developer',
  'Full-Stack Developer',
  'Java Developer',
  'Python Developer',
  'Data Analyst',
  'Data Scientist',
  'AI/ML Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Cloud/DevOps Engineer',
];

export const calculateInterviewScore = (question: any, userAnswer: string): number => {
  if (!userAnswer.trim()) return 0;

  const answerLower = userAnswer.toLowerCase();
  const keywordsMatched = question.keywords.filter((keyword: string) =>
    answerLower.includes(keyword.toLowerCase())
  ).length;

  const coverage = (keywordsMatched / question.keywords.length) * 100;
  const lengthScore = Math.min((userAnswer.length / 200) * 100, 100);

  return Math.round((coverage * 0.6 + lengthScore * 0.4));
};

export const generateAIAdvice = (profile: StudentProfile | null, topic: string): string => {
  if (!profile) return 'Please complete your profile first.';

  const skillGaps = calculateSkillsGaps(profile.careerGoal, profile.currentSkills);
  const nextItem = getNextRecommendedItem(profile.careerGoal, []);

  const responses: Record<string, string> = {
    'What should I learn next?': 
      `Based on your ${profile.careerGoal} goal and current skills, I recommend: ${
        nextItem ? nextItem.title : 'focusing on fundamentals first'
      }. You're missing ${skillGaps.missing} important skills. Start with the foundational topics to build a strong base.`,
    
    'What skills am I missing?':
      `For a ${profile.careerGoal}, you need ${skillGaps.missing} more skills. Focus on: data structures, algorithms, and your chosen technology stack. Your current skills (${
        profile.currentSkills.length > 0 ? profile.currentSkills.slice(0, 3).join(', ') : 'none yet'
      }) are a good start!`,
    
    'Which project should I build?':
      `I recommend starting with beginner-level projects that practice your current skills. Begin with smaller projects to build confidence, then graduate to more complex ones. This helps showcase your abilities on your resume.`,
    
    'Am I ready for internships?':
      `You need to strengthen your portfolio and technical skills. Complete at least 2-3 solid projects, practice mock interviews, and ensure your resume highlights your achievements. Keep building!`,
    
    'How can I improve my resume?':
      `Include: 1) Strong technical skills section, 2) 2-3 completed projects with GitHub links, 3) Relevant coursework, 4) Achievements and awards, 5) Contact info. Tailor it to each ${profile.careerGoal} role.`,
    
    'What should I prepare for interviews?':
      `Focus on: 1) Data structures and algorithms, 2) System design basics, 3) Behavioral questions (STAR method), 4) Project walkthrough, 5) Mock interviews. Practice regularly on platforms like LeetCode.`,
  };

  return responses[topic] || `For your ${profile.careerGoal} journey, focus on consistent practice, building real projects, and continuously learning new skills. You're on the right track!`;
};
