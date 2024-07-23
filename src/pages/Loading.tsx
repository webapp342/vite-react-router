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
        // Get Telegram user data using the Telegram Web App SDK
        const user = WebApp.initDataUnsafe?.user;
        if (!user) {
          throw new Error('Telegram user data is not available');
        }

        const telegramUserId = user.id.toString();

        // Save user ID to localStorage
        localStorage.setItem('telegramUserId', telegramUserId);

        // Fetch data from Firestore's 'users' collection
        const userDocRef = doc(db, 'users', telegramUserId);
        const userDocSnap = await getDoc(userDocRef);

        let userData;
        if (userDocSnap.exists()) {
          userData = userDocSnap.data();
        } else {
          // Create default data if no document exists
          userData = {
            invite_link: 'No invite link found',
          };
          await setDoc(userDocRef, userData);
        }

        // Save user data to localStorage
        localStorage.setItem(`user_${telegramUserId}`, JSON.stringify(userData));

        // Fetch data from Firestore's 'countdowns' collection
        const countdownDocRef = doc(db, 'countdowns', telegramUserId);
        const countdownDocSnap = await getDoc(countdownDocRef);

        let countdownData;
        if (countdownDocSnap.exists()) {
          countdownData = countdownDocSnap.data();
        } else {
          // Create default data if no document exists
          countdownData = {
            isRunning: false,
          };
          await setDoc(countdownDocRef, countdownData);
        }

        // Save countdown data to localStorage
        localStorage.setItem(`countdown_${telegramUserId}`, JSON.stringify(countdownData));

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
