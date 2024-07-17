import React from 'react';

interface ProfileProps {
  username: string;
  userId: number; // Burayı number olarak tanımlayın
  photoUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, userId, photoUrl }) => {
  return (
    <div className="profile">
      <h2>Kullanıcı Adı: {username}</h2>
      <h2>Kullanıcı ID: {userId}</h2>
      {photoUrl && <img src={photoUrl} alt="Profil" className="profile-pic" />}
    </div>
  );
};

export default Profile;
