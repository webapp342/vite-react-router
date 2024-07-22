import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ExtendedWebAppUser } from './types'; // Import for user type

interface FirestoreData {
  invite_link: string;
  farm: number;
  user_id: string;
  score: number;
  isRunning: boolean;
  pointsAdded: boolean;
}

const UserProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<ExtendedWebAppUser | null>(null);
  const [firestoreData, setFirestoreData] = useState<FirestoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        setUserData(user);
        const telegramUserId = user.id.toString();

        // Check for data in localStorage
        const cachedUserData = localStorage.getItem(`user_${telegramUserId}`);
        const cachedCountdownData = localStorage.getItem(`countdown_${telegramUserId}`);

        if (cachedUserData && cachedCountdownData) {
          try {
            const parsedUserData = JSON.parse(cachedUserData);
            const parsedCountdownData = JSON.parse(cachedCountdownData);

            setFirestoreData({
              invite_link: parsedUserData.invite_link || 'No invite link found',
              farm: typeof parsedUserData.farm === 'number' ? parsedUserData.farm : 0,
              user_id: parsedUserData.user_id || 'No user ID found',
              score: typeof parsedUserData.score === 'number' ? parsedUserData.score : 0,
              isRunning: !!parsedCountdownData.isRunning,
              pointsAdded: !!parsedCountdownData.pointsAdded,
            });
          } catch (e) {
            setError('Error parsing data from local storage');
          }
        } else {
          // If no data in localStorage, set error state
          setError('No data found in local storage');
        }
        setLoading(false);
      } else {
        console.error('User data is not available');
        setError('User data is not available');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!firestoreData) {
    return <div>No data found</div>;
  }

  return (
    <div className="main-content">
      <h2>User Details</h2>
      {userData && firestoreData && (
        <>
          <h3>Local Storage Data</h3>
          <p><strong>Invite Link:</strong> {firestoreData.invite_link}</p>
          <p><strong>Farm:</strong> {firestoreData.farm}</p>
          <p><strong>User ID:</strong> {firestoreData.user_id}</p>
          <p><strong>Score:</strong> {firestoreData.score}</p>
          <h3>Countdown Data</h3>
          <p><strong>Is Running:</strong> {firestoreData.isRunning ? 'Yes' : 'No'}</p>
          <p><strong>Points Added:</strong> {firestoreData.pointsAdded ? 'Yes' : 'No'}</p>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
