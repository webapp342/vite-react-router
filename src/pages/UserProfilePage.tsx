import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
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

        // Dinleyici ekleyerek Firestore verilerini izleyin
        const unsubscribe = onSnapshot(doc(db, 'users', telegramUserId), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as FirestoreData;
            setFirestoreData(data);

            // Veriyi localStorage'a kaydet
            localStorage.setItem(`user_${telegramUserId}`, JSON.stringify(data));
            localStorage.setItem('isRunning', data.isRunning ? 'true' : 'false');
          } else {
            // Firestore'da veri bulunamazsa, hata durumunu ayarla
            setError('No data found in Firestore');
          }
          setLoading(false);
        }, (error) => {
          console.error('Error fetching user data from Firestore: ', error);
          setError('Error fetching user data from Firestore');
          setLoading(false);
        });

        return () => unsubscribe();
      } else {
        console.error('User data is not available');
        setError('User data is not available');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // localStorage ile Firestore arasında veri senkronizasyonu sağlamak için
  useEffect(() => {
    if (firestoreData) {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        const telegramUserId = user.id.toString();

        const cachedUserData = localStorage.getItem(`user_${telegramUserId}`);
        const cachedCountdownData = localStorage.getItem(`countdown_${telegramUserId}`);

        if (cachedUserData && cachedCountdownData) {
          try {
            const parsedUserData = JSON.parse(cachedUserData);
            const parsedCountdownData = JSON.parse(cachedCountdownData);

            const isRunning = !!parsedCountdownData.isRunning;
            const pointsAdded = !!parsedCountdownData.pointsAdded;

            const newFirestoreData = {
              ...parsedUserData,
              isRunning,
              pointsAdded,
            };

            // Firestore'u güncelle
            setDoc(doc(db, 'users', telegramUserId), newFirestoreData, { merge: true });
          } catch (e) {
            setError('Error parsing data from local storage');
          }
        }
      }
    }
  }, [firestoreData]);

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
