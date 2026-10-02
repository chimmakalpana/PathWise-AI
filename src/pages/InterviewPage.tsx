import React, { useState } from 'react';
import { StudentProfile, InterviewAttempt } from '../types';
import { Card, Button, Badge, Textarea } from '../components/ui';
import { interviewQuestions } from '../data/interviewQuestions';
import { calculateInterviewScore } from '../utils/calculations';


interface InterviewPageProps {
  profile: StudentProfile;
  interviewAttempts: InterviewAttempt[];
  onAnswerSubmit: (attempt: InterviewAttempt) => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({
  interviewAttempts,
  onAnswerSubmit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const categories = ['Java', 'Python', 'Web Development', 'SQL', 'Data Structures', 'AI/ML', 'HR'];

  const getCategoryQuestions = () => {
    return interviewQuestions.filter(q => q.category === selectedCategory);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowAnswer(false);
    setScore(null);
  };

  const handleStartQuestion = () => {
    const categoryQuestions = getCategoryQuestions();
    const random = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    setCurrentQuestion(random);
    setUserAnswer('');
    setShowAnswer(false);
    setScore(null);
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const calculatedScore = calculateInterviewScore(currentQuestion, userAnswer);
    setScore(calculatedScore);

    onAnswerSubmit({
      id: Date.now().toString(),
      questionId: currentQuestion.id,
      userAnswer,
      score: calculatedScore,
      timestamp: new Date().toISOString(),
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(null);
    setUserAnswer('');
    setShowAnswer(false);
    setScore(null);
  };

  const categoryStats = categories.map(cat => ({
    category: cat,
    total: interviewQuestions.filter(q => q.category === cat).length,
    attempted: interviewAttempts.filter(a => {
      const q = interviewQuestions.find(qx => qx.id === a.questionId);
      return q?.category === cat;
    }).length,
    avgScore: interviewAttempts
      .filter(a => {
        const q = interviewQuestions.find(qx => qx.id === a.questionId);
        return q?.category === cat;
      })
      .reduce((sum, a) => sum + a.score, 0) / Math.max(1, interviewAttempts.filter(a => {
        const q = interviewQuestions.find(qx => qx.id === a.questionId);
        return q?.category === cat;
      }).length),
  }));

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mock Interview Preparation</h1>
        <p className="text-gray-400">Practice common interview questions with scoring</p>
      </div>

      {/* Stats */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Your Interview Stats</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Total Attempts</p>
            <p className="text-3xl font-bold text-blue-400">{interviewAttempts.length}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Average Score</p>
            <p className="text-3xl font-bold text-emerald-400">
              {interviewAttempts.length > 0 
                ? Math.round(interviewAttempts.reduce((sum, a) => sum + a.score, 0) / interviewAttempts.length)
                : 0}%
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Categories Practiced</p>
            <p className="text-3xl font-bold text-purple-400">
              {new Set(interviewAttempts.map(a => interviewQuestions.find(q => q.id === a.questionId)?.category)).size}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Questions */}
        <div className="lg:col-span-2">
          {!currentQuestion ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Select a Category</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {categories.map((category) => {
                  const questions = interviewQuestions.filter(q => q.category === category);
                  return (
                    <Card
                      key={category}
                      hover
                      className="cursor-pointer"
                      onClick={() => handleSelectCategory(category)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{category}</h3>
                        <Badge variant="info">{questions.length} Q</Badge>
                      </div>
                      <Button size="sm" className="w-full mt-4" onClick={() => {handleSelectCategory(category); setTimeout(handleStartQuestion, 100);}}>
                        Start
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="info">{currentQuestion.category}</Badge>
                  <Badge variant="warning">{currentQuestion.difficulty}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Answer</label>
                    <Textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      rows={6}
                      disabled={score !== null}
                    />
                  </div>

                  {score === null ? (
                    <Button onClick={handleSubmitAnswer} size="lg" className="w-full">
                      Submit Answer
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Card className="bg-blue-900/20 border-blue-700">
                        <div className="text-center">
                          <p className="text-gray-300 text-sm mb-2">Your Score</p>
                          <p className="text-4xl font-bold text-blue-400">{score}%</p>
                        </div>
                      </Card>

                      <div>
                        <button
                          onClick={() => setShowAnswer(!showAnswer)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-2"
                        >
                          <span>{showAnswer ? '▼' : '▶'}</span>
                          <span>{showAnswer ? 'Hide' : 'Show'} Sample Answer</span>
                        </button>
                        {showAnswer && (
                          <Card className="mt-3 bg-gray-800/50">
                            <p className="text-gray-300 mb-3">{currentQuestion.sampleAnswer}</p>
                            <div>
                              <p className="text-xs text-gray-400 mb-2">Key Keywords:</p>
                              <div className="flex flex-wrap gap-2">
                                {currentQuestion.keywords.map((kw: string, idx: number) => (
                                  <Badge key={idx} variant="info">{kw}</Badge>
                                ))}
                              </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-700">
                              <p className="text-xs text-gray-400 mb-2">Explanation:</p>
                              <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
                            </div>
                          </Card>
                        )}
                      </div>

                      <Button onClick={handleNextQuestion} size="lg" className="w-full" variant="secondary">
                        Next Question
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Category Stats */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Category Progress</h2>
          <div className="space-y-3">
            {categoryStats.map((stat) => (
              <Card key={stat.category} hover>
                <h3 className="font-semibold mb-2">{stat.category}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Questions</span>
                    <span className="font-medium">{stat.attempted}/{stat.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Score</span>
                    <span className={`font-medium ${stat.avgScore >= 70 ? 'text-emerald-400' : stat.avgScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                      {isNaN(stat.avgScore) ? '—' : `${Math.round(stat.avgScore)}%`}
                    </span>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-700 rounded h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${stat.avgScore >= 70 ? 'bg-emerald-600' : stat.avgScore >= 50 ? 'bg-amber-600' : 'bg-red-600'}`}
                    style={{ width: `${stat.avgScore}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
