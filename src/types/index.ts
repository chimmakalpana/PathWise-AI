export type CareerGoal = 
  | 'Software Developer'
  | 'Full-Stack Developer'
  | 'Java Developer'
  | 'Python Developer'
  | 'Data Analyst'
  | 'Data Scientist'
  | 'AI/ML Engineer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Cloud/DevOps Engineer';

export type SkillLevel = 'Strong' | 'Partial' | 'Missing';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type RoadmapStage = 
  | 'Fundamentals'
  | 'Core Skills'
  | 'Advanced Skills'
  | 'Projects'
  | 'Interview Preparation'
  | 'Job Readiness';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  year: number;
  careerGoal: CareerGoal;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  interests: string[];
  currentSkills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  importance: 'High' | 'Medium' | 'Low';
  category: string;
  description: string;
  learningResources: string[];
  careerGoals: CareerGoal[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  stage: RoadmapStage;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  completed: boolean;
  careerGoal: CareerGoal;
  learningObjectives: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  skillsPracticed: string[];
  technologies: string[];
  careerGoals: CareerGoal[];
  resumeValue: string;
  estimatedHours: number;
  completed: boolean;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: DifficultyLevel;
  sampleAnswer: string;
  keywords: string[];
  explanation: string;
}

export interface InterviewAttempt {
  id: string;
  questionId: string;
  userAnswer: string;
  score: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  criteria: string;
}

export interface ResumeAnalysis {
  score: number;
  hasContactInfo: boolean;
  hasEducation: boolean;
  hasExperience: boolean;
  hasProjects: boolean;
  hasSkills: boolean;
  hasGitHub: boolean;
  hasLinkedIn: boolean;
  skills: string[];
  missingKeywords: string[];
  suggestions: string[];
  atsScore: number;
}

export interface CareerAdvisorMessage {
  id: string;
  type: 'user' | 'advisor';
  content: string;
  timestamp: string;
}

export interface AppState {
  profile: StudentProfile | null;
  currentPage: 'landing' | 'onboarding' | 'dashboard' | 'profile' | 'skills' | 'roadmap' | 'projects' | 'interview' | 'advisor' | 'progress' | 'resume';
  completedRoadmapItems: string[];
  completedProjects: string[];
  interviewAttempts: InterviewAttempt[];
  unlockedAchievements: string[];
  adviceHistory: CareerAdvisorMessage[];
  resumeAnalysis: ResumeAnalysis | null;
}
