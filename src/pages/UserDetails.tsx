import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ExtendedWebAppUser } from './types'; // Kullanıcı tipi için gerekli olan import

const UserDetails: React.FC = () => {
  const [userData, setUserData] = useState<ExtendedWebAppUser | null>(null);

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
    if (user) {
      setUserData(user);
    } else {
      console.error('User data is not available');
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Username:</strong> {userData.username || 'No username available'}</p>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>First Name:</strong> {userData.first_name}</p>
      <p><strong>Last Name:</strong> {userData.last_name || 'No last name available'}</p>
      <p><strong>Language Code:</strong> {userData.language_code}</p>
      <p>
        <strong>Profile Photo:</strong><br />
        {userData.photo ? (
          <img src={`https://api.telegram.org/file/bot<YOUR_BOT_TOKEN>/${userData.photo.big_file_id}`} alt="Profile" />
        ) : (
          'No photo available'
        )}
      </p>
    </div>
  );
};

export default UserDetails;
