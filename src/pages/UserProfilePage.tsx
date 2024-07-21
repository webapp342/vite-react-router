import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ExtendedWebAppUser } from './types'; // Kullanıcı tipi için gerekli olan import

const UserProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<ExtendedWebAppUser | null>(null);
  const [firestoreData, setFirestoreData] = useState<{ invite_link: string; farm: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        setUserData(user);
        const telegramUserId = user.id.toString();

        // Veriyi localStorage'dan kontrol et
        const cachedData = localStorage.getItem(`user_${telegramUserId}`);
        if (cachedData) {
          try {
            const parsedData = JSON.parse(cachedData);
            setFirestoreData({
              invite_link: parsedData.invite_link || 'No invite link found',
              farm: typeof parsedData.farm === 'number' ? parsedData.farm : 0, // Sayısal bir değer olup olmadığını kontrol et
            });
          } catch (e) {
            setError('Error parsing data from local storage');
          }
        } else {
          // Eğer localStorage'da veri bulunamazsa, hata durumunu ayarla
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
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
