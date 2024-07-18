import React from 'react';

interface ProfileProps {
  username: string;
  userId: number; // Burayı number olarak tanımlayın
  photoUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, userId, photoUrl }) => {
  return (
    <div className="main-content">
      <h2>Kullanıcı Adı: {username}</h2>
      <h2>Kullanıcı ID: {userId}</h2>
      {photoUrl && <img src={photoUrl} alt="Profil" className="profile-pic" />}
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum eius veniam tenetur, veritatis sit ea rem molestias quibusdam ipsa, impedit aut? Sint saepe in magnam officia repellendus repudiandae quam dolorem.
    </div>
  );
};

export default Profile;
