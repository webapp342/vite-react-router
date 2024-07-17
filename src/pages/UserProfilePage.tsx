import React from 'react';
import Profile from './Profile';
import { useLocation } from 'react-router-dom';

interface UserProfilePageProps {
  username: string;
  userId: number;
  photoUrl: string;
}

const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const { username, userId, photoUrl } = location.state as UserProfilePageProps;

  return (
    <div>
      <h1>Profil Sayfası</h1>
      <Profile username={username} userId={userId} photoUrl={photoUrl} />
    </div>
  );
};

export default UserProfilePage;
