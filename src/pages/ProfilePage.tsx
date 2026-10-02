import React, { useState } from 'react';
import { StudentProfile, CareerGoal } from '../types';
import { Card, Button, Input, Select, Textarea, Badge } from '../components/ui';
import { getCareerGoalsOptions } from '../utils/calculations';

interface ProfilePageProps {
  profile: StudentProfile;
  onProfileUpdate: (profile: StudentProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    onProfileUpdate({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-6 p-4 lg:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-lg font-medium">{profile.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-lg font-medium break-all">{profile.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-lg font-medium">{new Date(profile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>

          {/* Education */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">College</p>
                <p className="text-lg font-medium">{profile.college}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Branch</p>
                <p className="text-lg font-medium">{profile.branch}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Year</p>
                <p className="text-lg font-medium">{profile.year}{'st|nd|rd|th'.split('|')[profile.year - 1]} Year</p>
              </div>
            </div>
          </Card>

          {/* Career Info */}
          <Card className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Career Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Career Goal</p>
                <Badge variant="info">{profile.careerGoal}</Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Experience Level</p>
                <Badge variant="warning">{profile.experienceLevel}</Badge>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Current Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.currentSkills.length > 0 ? (
                profile.currentSkills.map((skill, index) => (
                  <Badge key={index} variant="success">{skill}</Badge>
                ))
              ) : (
                <p className="text-gray-400">No skills added yet</p>
              )}
            </div>
          </Card>

          {/* Interests */}
          <Card className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <Badge key={index} variant="info">{interest}</Badge>
                ))
              ) : (
                <p className="text-gray-400">No interests added yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Edit Profile</h1>

      <Card className="space-y-6">
        <form onSubmit={(e) => {e.preventDefault(); handleSave()}} className="space-y-6">
          {/* Personal */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">College</label>
                <Input
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Branch</label>
                  <Input
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
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

          {/* Career */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Career</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Career Goal</label>
                <Select
                  options={getCareerGoalsOptions().map(g => ({ value: g, label: g }))}
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value as CareerGoal })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience Level</label>
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
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">Current Skills (comma-separated)</label>
            <Textarea
              value={formData.currentSkills.join(', ')}
              onChange={(e) => setFormData({ ...formData, currentSkills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
              rows={3}
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium mb-2">Interests (comma-separated)</label>
            <Textarea
              value={formData.interests.join(', ')}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">Save Changes</Button>
            <Button type="button" variant="secondary" size="lg" className="flex-1" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
