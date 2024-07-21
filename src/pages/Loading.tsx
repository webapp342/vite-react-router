import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import WebApp from '@twa-dev/sdk';

const Loading: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Telegram Web App SDK kullanarak Telegram ID'sini al
        const user = WebApp.initDataUnsafe?.user;
        if (!user) {
          throw new Error('Telegram user data is not available');
        }

        const telegramUserId = user.id.toString();

        // Firestore'dan veri al
        const docRef = doc(db, 'users', telegramUserId);
        const docSnap = await getDoc(docRef);

        let userData;
        if (docSnap.exists()) {
          // Eğer doküman varsa, verileri al
          userData = docSnap.data();
        } else {
          // Firestore'da veri yoksa, varsayılan değerlerle veri oluştur
          userData = {
            invite_link: 'No invite link found',
            farm: 0,
            clicks: 0,
            other_field: 'Default value', // Diğer alanlar eklenebilir
          };
          await setDoc(docRef, userData);
        }

        // Veriyi localStorage'a kaydet
        localStorage.setItem(`user_${telegramUserId}`, JSON.stringify(userData));
      } catch (error) {
        console.error('Error fetching or updating user data:', error);
        setError('An error occurred while fetching or updating data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Data has been successfully fetched and saved to local storage.</p>
      )}
    </div>
  );
};

export default Loading;
