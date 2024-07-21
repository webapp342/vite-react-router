import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import WebApp from "@twa-dev/sdk";

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

const FarmComponent: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(0);
  const [farmedAmount, setFarmedAmount] = useState<number>(0);
  const [isFarming, setIsFarming] = useState<boolean>(false);
  const [lastFarmedAmount, setLastFarmedAmount] = useState<number>(0);
  const [telegramUserId, setTelegramUserId] = useState<string>('');

  useEffect(() => {
    // Initialize Telegram Web Apps SDK and get user data
    const user = WebApp.initDataUnsafe?.user;
    if (user) {
      setTelegramUserId(user.id.toString()); // Ensure user ID is a string
    }

    let timer: NodeJS.Timeout;
    if (isFarming && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
        setLastFarmedAmount((60 - countdown) * (100 / 60));
      }, 1000);
    } else if (isFarming && countdown === 0) {
      setIsFarming(false);
      const newFarmedAmount = farmedAmount + 100;
      setFarmedAmount(newFarmedAmount);
      setLastFarmedAmount(100);

      // Save new farmed amount to Firestore
      if (telegramUserId) {
        setDoc(doc(db, 'farmData', telegramUserId), {
          totalFarmedAmount: newFarmedAmount
        }, { merge: true })
        .then(() => {
          console.log('Farmed amount saved to Firestore');
        })
        .catch((error) => {
          console.error('Error saving farmed amount to Firestore: ', error);
        });
      }
    }

    return () => clearTimeout(timer);
  }, [isFarming, countdown, farmedAmount, telegramUserId]);

  const handleFarm = () => {
    setIsFarming(true);
    setCountdown(60);
    setLastFarmedAmount(0);
  };

  return (
    <BackgroundBox isFarming={isFarming}>
      <div className="main-content">
        <div>
          Total Farmed Amount: {farmedAmount}
        </div>
        <div>
          Last Farmed Amount: {Math.round(lastFarmedAmount)} / 100
        </div>
        <button onClick={handleFarm} disabled={isFarming}>
          {isFarming 
            ? `Farming ${Math.round(lastFarmedAmount)} / 100 - Time remaining: ${countdown}s` 
            : 'Farm'
          }
        </button>
      </div>
    </BackgroundBox>
  );
};

export default FarmComponent;
