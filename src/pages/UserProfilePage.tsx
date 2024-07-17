import React from 'react';
import Profile from './Profile';
import { useLocation, useNavigate } from 'react-router-dom';

interface UserProfilePageProps {
  username: string;
  userId: number;
  photoUrl: string;
}

const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as UserProfilePageProps | null;

  if (!state) {
    // If state is null, redirect to home or handle the case as needed
    navigate('/vite-react-router/', { replace: true });
    return null;
  }

  const { username, userId, photoUrl } = state;

  return (
    <div>
      <h1>Profil Sayfası</h1>
      <Profile username={username} userId={userId} photoUrl={photoUrl} />
    </div>
  );
};

export default UserProfilePage;
