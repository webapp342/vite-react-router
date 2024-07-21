import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import WebApp from '@twa-dev/sdk';

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
  const [inviteLink, setInviteLink] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(0);
  const [farmedAmount, setFarmedAmount] = useState<number>(0);
  const [isFarming, setIsFarming] = useState<boolean>(false);
  const [lastFarmedAmount, setLastFarmedAmount] = useState<number>(0);

  useEffect(() => {
    const initializeUser = async () => {
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        const telegramUserId = user.id.toString();
        setUserId(telegramUserId);

        // Check localStorage for cached data
        const cachedData = localStorage.getItem(`user_${telegramUserId}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setFarmedAmount(parsedData.farm || 0);
          setInviteLink(parsedData.invite_link || 'No invite link found');
          setCountdown(parsedData.countdown || 0); // Get countdown from localStorage
        } else {
          setFarmedAmount(0);
          setInviteLink('No invite link found');
        }

        // Synchronize data with Firestore in the background
        synchronizeDataWithFirestore(telegramUserId);
      } else {
        console.error('Failed to get user data from Telegram Web Apps SDK');
        setInviteLink('No user data available');
        setFarmedAmount(0);
      }
    };

    const synchronizeDataWithFirestore = async (telegramUserId: string) => {
      try {
        const docRef = doc(db, 'users', telegramUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data) {
            const updatedFarmedAmount = data.farm || 0;
            const updatedInviteLink = data.invite_link || 'No invite link found';
            const updatedCountdown = data.countdown || 0; // Get countdown from Firestore

            // Update localStorage with the latest Firestore data
            localStorage.setItem(`user_${telegramUserId}`, JSON.stringify({
              farm: updatedFarmedAmount,
              invite_link: updatedInviteLink,
              countdown: updatedCountdown, // Save countdown
            }));

            // Update state
            setFarmedAmount(updatedFarmedAmount);
            setInviteLink(updatedInviteLink);
            setCountdown(updatedCountdown);
          } else {
            await setDoc(docRef, { farm: 0, invite_link: 'No invite link found', countdown: 0 });
          }
        } else {
          await setDoc(docRef, { farm: 0, invite_link: 'No invite link found', countdown: 0 });
        }
      } catch (error) {
        console.error('Error fetching or updating user data: ', error);
      }
    };

    initializeUser();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFarming && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
        setLastFarmedAmount((60 - countdown) * (100 / 60)); // Amount farmed per second
      }, 1000);
    } else if (isFarming && countdown === 0) {
      setIsFarming(false);
      const newFarmedAmount = farmedAmount + 100;
      setFarmedAmount(newFarmedAmount);
      setLastFarmedAmount(100); // Last farming increment

      // Update Firestore with new farmed amount and reset countdown
      if (userId) {
        const docRef = doc(db, 'users', userId);
        setDoc(docRef, { farm: newFarmedAmount, countdown: 0 }, { merge: true })
          .then(() => {
            console.log('Farmed amount updated successfully in Firestore.');

            // Update localStorage with the new farmed amount and reset countdown
            localStorage.setItem(`user_${userId}`, JSON.stringify({
              farm: newFarmedAmount,
              invite_link: inviteLink,
              countdown: 0,
            }));
          })
          .catch((error) => {
            console.error('Error updating farmed amount in Firestore: ', error);
          });
      }
    }

    return () => clearTimeout(timer);
  }, [isFarming, countdown, farmedAmount, userId, inviteLink]);

  const handleFarm = () => {
    setIsFarming(true);
    setCountdown(60);
    setLastFarmedAmount(0); // Reset last farm amount at the start

    // Update Firestore with new countdown
    if (userId) {
      const docRef = doc(db, 'users', userId);
      setDoc(docRef, { countdown: 60 }, { merge: true })
        .then(() => {
          console.log('Countdown updated successfully in Firestore.');

          // Update localStorage with the new countdown
          localStorage.setItem(`user_${userId}`, JSON.stringify({
            farm: farmedAmount,
            invite_link: inviteLink,
            countdown: 60,
          }));
        })
        .catch((error) => {
          console.error('Error updating countdown in Firestore: ', error);
        });
    }
  };

  return (
    <BackgroundBox isFarming={isFarming}>
      <div className="main-content">
        <div>User ID: {userId}</div>
        <div>Invite Link: {inviteLink}</div>
        <div>Total Farmed Amount: {farmedAmount}</div>
        <div>Last Farmed Amount: {Math.round(lastFarmedAmount)} / 100</div>
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

export default IntegratedComponent;
