import React, { useState } from 'react';
import { StudentProfile, CareerGoal } from '../types';
import { Button, Card, Input, Select, Textarea } from '../components/ui';
import { getCareerGoalsOptions } from '../utils/calculations';

interface OnboardingPageProps {
  onProfileCreated: (profile: StudentProfile) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    year: 1,
    careerGoal: 'Software Developer' as CareerGoal,
    experienceLevel: 'Beginner' as const,
    interests: '',
    currentSkills: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.college.trim()) newErrors.college = 'College is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const profile: StudentProfile = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      college: formData.college,
      branch: formData.branch,
      year: formData.year,
      careerGoal: formData.careerGoal,
      experienceLevel: formData.experienceLevel,
      interests: formData.interests.split(',').map(i => i.trim()).filter(i => i),
      currentSkills: formData.currentSkills.split(',').map(s => s.trim()).filter(s => s),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onProfileCreated(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-400">Let's personalize your career journey</p>
        </div>

        <Card className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">College *</label>
                  <Input
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="IIT Delhi"
                    className={errors.college ? 'border-red-500' : ''}
                  />
                  {errors.college && <p className="text-red-400 text-sm mt-1">{errors.college}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Branch *</label>
                    <Input
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      placeholder="Computer Science"
                      className={errors.branch ? 'border-red-500' : ''}
                    />
                    {errors.branch && <p className="text-red-400 text-sm mt-1">{errors.branch}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                    <Select
                      options={[
                        { value: '1', label: '1st Year' },
                        { value: '2', label: '2nd Year' },
                        { value: '3', label: '3rd Year' },
                        { value: '4', label: '4th Year' },
                      ]}
                      value={formData.year.toString()}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Career Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Career Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Career Goal</label>
                  <Select
                    options={getCareerGoalsOptions().map(g => ({ value: g, label: g }))}
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value as CareerGoal })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level</label>
                  <Select
                    options={[
                      { value: 'Beginner', label: 'Beginner' },
                      { value: 'Intermediate', label: 'Intermediate' },
                      { value: 'Advanced', label: 'Advanced' },
                    ]}
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Interests (comma-separated)</label>
                  <Textarea
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                    placeholder="Web development, Mobile apps, Data science"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Skills (comma-separated)</label>
                  <Textarea
                    value={formData.currentSkills}
                    onChange={(e) => setFormData({ ...formData, currentSkills: e.target.value })}
                    placeholder="JavaScript, HTML, CSS, Python"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="submit" size="lg" className="flex-1">
                Create Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
