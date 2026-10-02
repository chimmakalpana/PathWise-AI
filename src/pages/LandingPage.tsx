import React from 'react';
import { ArrowRight, CheckCircle, Zap, BookOpen, Code2 } from 'lucide-react';
import { Button, Card } from '../components/ui';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-24">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium">
            ✨ Your Personalized Career Navigator
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            PathWise AI
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto">
            Navigate your career path with personalized learning roadmaps, skill assessments, and AI-powered guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGetStarted} className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: BookOpen,
              title: 'Personalized Roadmaps',
              description: 'Get career-specific learning paths tailored to your goals and skills',
            },
            {
              icon: Zap,
              title: 'AI Career Advisor',
              description: 'Get intelligent career guidance without needing any API keys',
            },
            {
              icon: Code2,
              title: 'Project Recommendations',
              description: 'Build portfolio projects that matter for your target role',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Icon className="text-blue-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Create Profile', desc: 'Tell us your career goals' },
              { step: '2', title: 'Get Roadmap', desc: 'Personalized learning path' },
              { step: '3', title: 'Build Projects', desc: 'Create portfolio pieces' },
              { step: '4', title: 'Land Jobs', desc: 'Be interview ready' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Students Choose PathWise AI</h2>
          <div className="space-y-4">
            {[
              'No expensive subscriptions or premium features required',
              'Works completely offline - your data stays on your device',
              'AI Advisor powered by intelligent rule-based recommendations',
              'Recommended projects from industry experts',
              'Mock interviews with scoring and feedback',
              'Progress tracking and achievement badges',
              'Resume analyzer and feedback',
              'Responsive design - works perfectly on mobile, tablet, and desktop',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { stat: '10+', label: 'Career Paths' },
            { stat: '100+', label: 'Learning Items' },
            { stat: '50+', label: 'Mock Questions' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{item.stat}</div>
              <div className="text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-700/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
          <p className="text-gray-300 mb-6">
            Join students who are already building their portfolios and preparing for their dream roles.
          </p>
          <Button size="lg" onClick={onGetStarted}>
            Create Your Profile Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>PathWise AI © 2024 - Your Personalized Career Navigator</p>
        <p className="mt-2">No backend required • Local data persistence • Free forever</p>
      </footer>
    </div>
  );
};
