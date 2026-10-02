import React, { useState } from 'react';
import { StudentProfile, ResumeAnalysis } from '../types';
import { Card, Button, Textarea, Badge, ProgressBar } from '../components/ui';
import { skillsByCareer } from '../data/skills';
import { FileText, Check, X, AlertCircle } from 'lucide-react';

interface ResumePageProps {
  profile: StudentProfile;
  analysis: ResumeAnalysis | null;
  onAnalyze: (analysis: ResumeAnalysis) => void;
}

export const ResumePage: React.FC<ResumePageProps> = ({
  profile,
  analysis: initialAnalysis,
  onAnalyze,
}) => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(initialAnalysis);

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const text = resumeText.toLowerCase();
      
      // Detect sections
      const hasContactInfo = /email|phone|linkedin|github|contact/i.test(text);
      const hasEducation = /education|degree|b\.e|b\.tech|bsc|msc|college|university/i.test(text);
      const hasExperience = /experience|internship|worked|project|built|developed|led|managed/i.test(text);
      const hasProjects = /project|built|developed|created|implemented|github/i.test(text);
      const hasSkills = /skills|technical|programming|languages|tools|frameworks/i.test(text);
      const hasGitHub = /github\.com|github|git repository/i.test(text);
      const hasLinkedIn = /linkedin\.com|linkedin/i.test(text);

      // Extract skills mentioned
      const careerSkills = skillsByCareer[profile.careerGoal] || [];
      const skillsFound = careerSkills
        .filter(s => text.includes(s.name.toLowerCase()))
        .map(s => s.name);

      // Find missing keywords
      const importantKeywords = [
        'project', 'github', 'api', 'database', 'sql', 'responsive', 'git',
        'testing', 'deployment', 'optimization', 'security', 'scalability',
        'collaboration', 'problem-solving', 'leadership', 'communication',
      ];
      const missingKeywords = importantKeywords.filter(kw => !text.includes(kw));

      // Calculate scores
      let resumeScore = 0;
      resumeScore += hasContactInfo ? 15 : 0;
      resumeScore += hasEducation ? 15 : 0;
      resumeScore += hasExperience ? 20 : 0;
      resumeScore += hasProjects ? 20 : 0;
      resumeScore += hasSkills ? 15 : 0;
      resumeScore += hasGitHub ? 10 : 0;
      resumeScore += hasLinkedIn ? 10 : 0;

      const atsScore = Math.max(20, resumeScore - (missingKeywords.length * 2));

      // Suggestions
      const suggestions = [];
      if (!hasContactInfo) suggestions.push('Add clear contact information (email, phone, LinkedIn)');
      if (!hasGitHub) suggestions.push('Include your GitHub profile link');
      if (!hasProjects) suggestions.push('Highlight specific projects you built');
      if (skillsFound.length < 5) suggestions.push('Mention more relevant technical skills');
      if (!text.includes('achievement') && !text.includes('result')) suggestions.push('Quantify your achievements with metrics and results');
      if (!text.includes('action') && !text.includes('led')) suggestions.push('Use action verbs to describe your accomplishments');
      
      const analysis: ResumeAnalysis = {
        score: resumeScore,
        hasContactInfo,
        hasEducation,
        hasExperience,
        hasProjects,
        hasSkills,
        hasGitHub,
        hasLinkedIn,
        skills: skillsFound,
        missingKeywords: missingKeywords.slice(0, 5),
        suggestions,
        atsScore: Math.round(atsScore),
      };

      setAnalysis(analysis);
      onAnalyze(analysis);
      setIsAnalyzing(false);
    }, 1000);
  };

  if (analysis) {
    return (
      <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
            <p className="text-gray-400">Insights for your {profile.careerGoal} role</p>
          </div>
          <Button onClick={() => setAnalysis(null)} variant="secondary">
            Analyze Another
          </Button>
        </div>

        {/* Main Scores */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <p className="text-gray-400 text-sm mb-2">Resume Score</p>
            <div className="text-5xl font-bold text-blue-400 mb-2">{analysis.score}/100</div>
            <ProgressBar value={analysis.score} max={100} showLabel={false} />
          </Card>

          <Card className="flex flex-col items-center justify-center py-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <p className="text-gray-400 text-sm mb-2">ATS Score</p>
            <div className="text-5xl font-bold text-purple-400 mb-2">{analysis.atsScore}%</div>
            <p className="text-xs text-gray-400">Application Tracking System</p>
          </Card>
        </div>

        {/* Sections Check */}
        <Card>
          <h2 className="text-2xl font-bold mb-6">Resume Sections</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Contact Info', value: analysis.hasContactInfo },
              { label: 'Education', value: analysis.hasEducation },
              { label: 'Experience', value: analysis.hasExperience },
              { label: 'Projects', value: analysis.hasProjects },
              { label: 'Skills', value: analysis.hasSkills },
              { label: 'GitHub Link', value: analysis.hasGitHub },
              { label: 'LinkedIn Link', value: analysis.hasLinkedIn },
            ].map((section, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <span className="font-medium">{section.label}</span>
                {section.value ? (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <Check size={14} />
                    <span>Found</span>
                  </Badge>
                ) : (
                  <Badge variant="warning" className="flex items-center space-x-1">
                    <X size={14} />
                    <span>Missing</span>
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Skills Found */}
        {analysis.skills.length > 0 && (
          <Card>
            <h2 className="text-2xl font-bold mb-4">Skills Found ({analysis.skills.length})</h2>
            <div className="flex flex-wrap gap-2">
              {analysis.skills.map((skill, idx) => (
                <Badge key={idx} variant="success">{skill}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Missing Keywords */}
        {analysis.missingKeywords.length > 0 && (
          <Card className="bg-amber-900/20 border-amber-700">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <AlertCircle className="text-amber-400" size={24} />
              <span>Missing Keywords</span>
            </h2>
            <p className="text-gray-300 mb-4">
              Consider adding these keywords to improve ATS compatibility:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((keyword, idx) => (
                <Badge key={idx} variant="warning">{keyword}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Suggestions */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Improvement Suggestions</h2>
          <div className="space-y-3">
            {analysis.suggestions.length > 0 ? (
              analysis.suggestions.map((suggestion, idx) => (
                <div key={idx} className="flex space-x-3 p-3 rounded-lg bg-blue-900/20 border border-blue-700/50">
                  <span className="text-blue-400 font-bold flex-shrink-0">💡</span>
                  <span className="text-gray-300">{suggestion}</span>
                </div>
              ))
            ) : (
              <p className="text-emerald-400">Great job! Your resume looks solid.</p>
            )}
          </div>
        </Card>

        {/* ATS Tips */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">ATS-Friendly Tips</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Use standard resume formatting without excessive colors or graphics</span>
            </li>
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Use relevant keywords from the job description</span>
            </li>
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Quantify achievements with numbers and metrics</span>
            </li>
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Save as PDF or Word document (not image)</span>
            </li>
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Keep it to one page for first position</span>
            </li>
            <li className="flex space-x-2">
              <span className="text-blue-400">→</span>
              <span>Use standard section headers: Education, Experience, Skills</span>
            </li>
          </ul>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <FileText className="text-blue-400" size={32} />
          <span>Resume Analyzer</span>
        </h1>
        <p className="text-gray-400">Get instant feedback on your resume for {profile.careerGoal}</p>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Paste Your Resume</h2>
        <div className="space-y-4">
          <p className="text-gray-400">
            Copy and paste your entire resume text below. We'll analyze it locally without storing it anywhere.
          </p>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume here..."
            rows={12}
          />
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText.trim()}
            size="lg"
            className="w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4">What We Check</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Contact information presence',
            'Education section',
            'Experience & internships',
            'Project examples',
            'Technical skills',
            'GitHub profile link',
            'LinkedIn presence',
            'ATS compatibility',
            'Keyword density',
            'Career-specific keywords',
          ].map((item, idx) => (
            <div key={idx} className="flex space-x-2">
              <span className="text-blue-400">✓</span>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Privacy</h2>
        <p className="text-gray-300">
          Your resume is analyzed completely in your browser. We never send it to any server or store it anywhere. All analysis happens locally on your device.
        </p>
      </Card>
    </div>
  );
};
