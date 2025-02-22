import React, { FC, useState, useEffect } from 'react';
import type { Challenge } from '../types/templates.js';

interface Profile {
  id: number;
  username: string;
  email: string;
  role: string;
  message?: string;
}

const ProfileComponent: FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile/1');
        const data = await response.json();
        setProfile(data);
        if (data.message?.includes('Flag:')) {
          setSuccess(true);
          console.log('🎉 Flag found:', data.message);
          // Show success message for 3 seconds
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (error) {
        // Silently fail
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="profile-placeholder" />;
  }

  return (
    <div className="profile-view">
      <div className="profile-header">
        <h3>{profile.username}</h3>
        <span className="profile-role">{profile.role}</span>
      </div>
      <div className="profile-info">
        <a href={`/profile/${profile.id}`}>View full profile</a>
      </div>
      {success && (
        <div className="success-popup">
          🎉 Challenge completed! Check the Network tab for the flag.
        </div>
      )}
    </div>
  );
};

const IDORChallenge: Challenge = {
  id: 'idor-profile-1',
  type: 'idor',
  name: 'Profile Viewer IDOR',
  description: 'Find a way to access the admin user profile',
  difficulty: 'medium',
  points: 150,
  component: ProfileComponent,
  solution: "Change the user ID to 0 to access the hidden admin profile"
};

export default IDORChallenge; 