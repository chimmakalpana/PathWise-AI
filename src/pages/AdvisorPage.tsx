import React, { useState } from 'react';
import { StudentProfile, CareerAdvisorMessage } from '../types';
import { Card, Button, Input } from '../components/ui';
import { generateAIAdvice } from '../utils/calculations';
import { Send, Brain } from 'lucide-react';

interface AdvisorPageProps {
  profile: StudentProfile;
  messages: CareerAdvisorMessage[];
  onSendMessage: (message: CareerAdvisorMessage) => void;
}

export const AdvisorPage: React.FC<AdvisorPageProps> = ({
  profile,
  messages,
  onSendMessage,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedTopics = [
    'What should I learn next?',
    'What skills am I missing?',
    'Which project should I build?',
    'Am I ready for internships?',
    'How can I improve my resume?',
    'What should I prepare for interviews?',
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: CareerAdvisorMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    onSendMessage(userMessage);
    setUserInput('');

    // Generate advisor response
    setIsLoading(true);
    setTimeout(() => {
      const response = generateAIAdvice(profile, text);
      const advisorMessage: CareerAdvisorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'advisor',
        content: response,
        timestamp: new Date().toISOString(),
      };
      onSendMessage(advisorMessage);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto h-screen flex flex-col">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <Brain className="text-blue-400" size={32} />
          <span>AI Career Advisor</span>
        </h1>
        <p className="text-gray-400">Get personalized guidance for your {profile.careerGoal} journey</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400 mb-6">No messages yet. Ask me anything about your career!</p>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm font-medium mb-3">Suggested Topics:</p>
              {suggestedTopics.map((topic, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="sm"
                  className="w-full text-left justify-start"
                  onClick={() => handleSendMessage(topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600/30 border-blue-700'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                  }`}>
                    <span className="text-sm font-bold">
                      {message.type === 'user' ? 'You' : '🤖'}.charAt(0)
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300 leading-relaxed">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="flex items-center space-x-2">
                <Brain size={20} className="text-blue-400 animate-spin" />
                <p className="text-gray-400">Thinking...</p>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-400 font-medium">Quick Questions:</p>
          <div className="flex gap-2 overflow-x-auto">
            {suggestedTopics.map((topic, idx) => (
              <Button
                key={idx}
                variant="secondary"
                size="sm"
                onClick={() => handleSendMessage(topic)}
                className="whitespace-nowrap text-xs"
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
          placeholder="Ask me anything about your career..."
          disabled={isLoading}
        />
        <Button
          onClick={() => handleSendMessage(userInput)}
          disabled={isLoading || !userInput.trim()}
          size="lg"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};
