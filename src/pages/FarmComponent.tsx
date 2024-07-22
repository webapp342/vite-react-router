import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Styled component for background
const BackgroundBox = styled(Box)<{ isFarming: boolean }>(({ isFarming }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: isFarming
    ? `url(${backgroundGif})`
    : `url(${backgroundJpg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 1s ease',
}));

const IntegratedComponent: React.FC = () => {
  const [isFarming, setIsFarming] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const telegramUserId = localStorage.getItem('telegramUserId');
      if (telegramUserId) {
        try {
          const docRef = doc(db, 'countdowns', telegramUserId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsFarming(data.isRunning);
          } else {
            console.error('No such document in Firestore!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      } else {
        console.error('Telegram user ID not found in localStorage');
      }
    };

    fetchUserData();
  }, []);

  return (
    <BackgroundBox isFarming={isFarming}>
      <div className="main-content">
        {/* Content can be added here if needed */}
      </div>
    </BackgroundBox>
  );
};

export default IntegratedComponent;
