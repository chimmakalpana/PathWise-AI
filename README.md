# PathWise AI - Your Personalized Career Navigator

## 🎯 Overview

**PathWise AI** is a comprehensive, portfolio-ready web application designed to help students navigate their career journey in tech. It provides personalized learning roadmaps, skill assessments, project recommendations, mock interviews, and AI-powered career guidance—all completely offline and without requiring any API keys or subscriptions.

## 🌟 Problem Statement

Students preparing for internships and tech jobs often struggle with:
- Not knowing what skills they need for their target role
- Lack of structured learning paths
- No clear project portfolio strategy
- Limited interview preparation resources
- No way to track their progress

PathWise AI solves all of these problems with a self-contained, privacy-first application.

## ✨ Key Features

### 1. **Landing Page**
- Beautiful hero section with clear value proposition
- Feature highlights and how it works section
- Student-focused design with mobile optimization

### 2. **Student Profile & Onboarding**
- Comprehensive profile creation form
- Support for 10+ career goals
- Skills and interests tracking
- Profile editing capabilities

### 3. **Personalized Dashboard**
- Welcome message with career goal display
- Career readiness score (0-100%)
- Quick stats overview
- Next recommended learning items
- Quick action buttons
- Personalized progress tracking

### 4. **Skill Gap Analysis**
- Identify strong vs. missing skills
- Skills categorized by importance (High/Medium/Low)
- Learning resources for each skill
- Visual progress indicators

### 5. **Learning Roadmap**
- Stage-based progression:
  - Fundamentals
  - Core Skills
  - Advanced Skills
  - Projects
  - Interview Preparation
  - Job Readiness
- Completion tracking with checkboxes
- Estimated hours for each item
- Learning objectives

### 6. **Project Recommendations**
- 25+ career-specific projects
- Difficulty levels (Beginner/Intermediate/Advanced)
- Resume value explanations
- Technology stacks
- Skills practiced for each project
- Project completion tracking

### 7. **Mock Interview System**
- 50+ realistic interview questions
- 7 categories: Java, Python, Web Dev, SQL, Data Structures, AI/ML, HR
- Multiple difficulty levels
- Automated scoring based on keyword matching
- Sample answers and explanations
- Category-specific statistics

### 8. **AI Career Advisor**
- Rule-based local advisor (no API required)
- 6 suggested topic starters
- Personalized advice based on profile and progress
- Conversation history
- Smart recommendations

### 9. **Progress Tracking**
- Overall career readiness score
- Achievements and badges
- Detailed metrics breakdown
- Milestones tracking
- Interview performance analytics

### 10. **Resume Analyzer**
- Local resume analysis (no uploads)
- Checks for all resume sections
- ATS compatibility scoring
- Skill extraction
- Missing keywords identification
- Actionable improvement suggestions

### 11. **Responsive Navigation**
- Sidebar navigation on desktop
- Bottom navigation on mobile
- Quick access to all features

### 12. **Data Persistence**
- Complete localStorage integration
- All data stays on user's device
- No external servers required
- Data persists across sessions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage
- **Data Persistence**: Browser localStorage

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components
│   │   └── index.tsx    # Button, Card, Input, Badge, etc.
│   └── Navigation.tsx    # Sidebar/Mobile navigation
├── pages/
│   ├── LandingPage.tsx
│   ├── OnboardingPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProfilePage.tsx
│   ├── SkillsPage.tsx
│   ├── RoadmapPage.tsx
│   ├── ProjectsPage.tsx
│   ├── InterviewPage.tsx
│   ├── AdvisorPage.tsx
│   ├── ProgressPage.tsx
│   └── ResumePage.tsx
├── data/
│   ├── skills.ts          # Career-specific skills
│   ├── roadmaps.ts        # Learning roadmaps
│   ├── projects.ts        # Project recommendations
│   ├── interviewQuestions.ts  # Interview Q&A
│   └── achievements.ts    # Achievement definitions
├── hooks/
│   └── useAppState.ts     # State management hook
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── calculations.ts    # Helper functions
├── App.tsx                # Main app component
├── main.tsx               # React entry point
└── index.css              # Global styles
```

## 🚀 Features Overview

### Career Paths Supported
1. Software Developer
2. Full-Stack Developer
3. Java Developer
4. Python Developer
5. Data Analyst
6. Data Scientist
7. AI/ML Engineer
8. Frontend Developer
9. Backend Developer
10. Cloud/DevOps Engineer

### Data Models

- **StudentProfile**: Personal, educational, and career information
- **Skill**: Technology/competency with importance and resources
- **RoadmapItem**: Learning milestone with objectives and duration
- **Project**: Portfolio project with technologies and skills
- **InterviewQuestion**: Q&A with scoring keywords
- **Achievement**: Badges and milestones

## 💾 Data Persistence Strategy

All data is stored locally in the browser's localStorage:
- User profile
- Current skills
- Career goal
- Completed roadmap items
- Completed projects
- Interview attempt history
- Achievement unlocks
- Career advisor conversation history
- Resume analysis results

## 🎮 How to Use

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd PathWise-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

- **Mobile First Approach**: Optimized for phones primarily
- **Desktop Support**: Full-featured sidebar navigation
- **Tablet Friendly**: Adaptive grid layouts
- **Bottom Navigation**: Mobile quick access bar

## 🔐 Privacy & Security

- ✅ All data stored locally in browser
- ✅ No external API calls required
- ✅ No user data sent to servers
- ✅ Works completely offline
- ✅ No tracking or analytics

## 🤖 AI Career Advisor Implementation

The AI Advisor uses a **rule-based local system** that doesn't require API keys:

```typescript
generateAIAdvice(profile, topic) {
  // Analyzes user profile, skills, progress
  // Returns contextual advice based on career goal
  // Uses pattern matching for suggestions
}
```

**Future Enhancement**: Can be upgraded to use OpenAI/Gemini APIs while maintaining local fallback.

## 📊 Readiness Score Calculation

The career readiness score (0-100%) is calculated based on:

- **Skills Coverage** (20%): Strong skills ÷ Total required skills
- **Roadmap Completion** (30%): Completed items ÷ Total items
- **Projects** (25%): Completed projects ÷ Expected projects
- **Interview Practice** (15%): Interview attempts ÷ Target attempts
- **Resume** (10%): Resume completeness score

## 🎯 Interview Scoring System

Questions are scored based on:
- **Keyword Matching** (60%): How many keywords from the sample answer appear
- **Answer Length** (40%): Depth and detail of the response

Score Range:
- 80-100%: Excellent answer
- 60-79%: Good understanding
- 40-59%: Basic knowledge
- 0-39%: Needs improvement

## 🏆 Achievement System

Available achievements:
- 🎯 First Step (1 roadmap item)
- 🔧 Skill Builder (5 roadmap items)
- 📦 Project Starter (1 project)
- 🚀 Project Pro (5 projects)
- 💪 Interview Ready (5 interviews)
- 🌍 Career Explorer (Change goal 2x)
- 📚 Consistent Learner (10 items)
- 📄 Resume Master (Analyze resume)
- 🤖 Advisor Engaged (Get advice)
- 🏆 Interview Champion (10 interviews)

## 🔄 Future Enhancement Plan

### Phase 2 - Backend Integration
- Add Java Spring Boot + MySQL backend
- User authentication
- Cloud data sync
- Collaborative features

### Phase 3 - AI Integration
- Optional OpenAI/Gemini API integration
- Smart career recommendations
- Personalized learning paths
- Resume optimization suggestions

### Phase 4 - Advanced Features
- Video tutorials linking
- Live mentor matching
- Company-specific preparation
- Job board integration

## 📸 Screenshots

[Screenshots section placeholder]

## 🤝 Contributing

This is a portfolio project. Contributions and improvements are welcome!

## 📝 License

MIT License - Feel free to use this project as a portfolio piece.

## 👤 Author

Created as a comprehensive portfolio project demonstrating:
- Full-stack React application development
- TypeScript best practices
- State management with hooks
- Responsive UI/UX design
- Data structure and algorithm knowledge
- Career guidance expertise

## 🎓 Educational Value

This project showcases:
- Modern React patterns (hooks, components)
- TypeScript best practices
- Tailwind CSS for responsive design
- Local state persistence
- Complex data relationships
- UI/UX principles
- Domain modeling

## 📞 Support

For questions or issues:
1. Check the documentation
2. Review the code structure
3. Test the features thoroughly

---

**PathWise AI - Your Personalized Career Navigator** ✨

Navigate your tech career with confidence, clarity, and community support.