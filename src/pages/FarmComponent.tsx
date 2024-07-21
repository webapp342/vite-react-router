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

            // Update localStorage with the latest Firestore data
            localStorage.setItem(`user_${telegramUserId}`, JSON.stringify({
              farm: updatedFarmedAmount,
              invite_link: updatedInviteLink,
            }));

            // Update state
            setFarmedAmount(updatedFarmedAmount);
            setInviteLink(updatedInviteLink);
          } else {
            await setDoc(docRef, { farm: 0, invite_link: 'No invite link found' });
          }
        } else {
          await setDoc(docRef, { farm: 0, invite_link: 'No invite link found' });
        }
      } catch (error) {
        console.error('Error fetching or updating user data: ', error);
      }
    };

    initializeUser();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFarming) {
      timer = setTimeout(() => {
        setLastFarmedAmount(100); // Amount farmed per session
        const newFarmedAmount = farmedAmount + 100;
        setFarmedAmount(newFarmedAmount);

        // Update Firestore with new farmed amount
        if (userId) {
          const docRef = doc(db, 'users', userId);
          setDoc(docRef, { farm: newFarmedAmount }, { merge: true })
            .then(() => {
              console.log('Farmed amount updated successfully in Firestore.');

              // Update localStorage with the new farmed amount
              localStorage.setItem(`user_${userId}`, JSON.stringify({
                farm: newFarmedAmount,
                invite_link: inviteLink,
              }));
            })
            .catch((error) => {
              console.error('Error updating farmed amount in Firestore: ', error);
            });
        }
        setIsFarming(false);
      }, 60000); // Assuming 60 seconds for farming session duration
    }

    return () => clearTimeout(timer);
  }, [isFarming, farmedAmount, userId, inviteLink]);

  const handleFarm = () => {
    setIsFarming(true);
    setLastFarmedAmount(0); // Reset last farm amount at the start

    // Update Firestore with new farming status
    if (userId) {
      const docRef = doc(db, 'users', userId);
      setDoc(docRef, { farm: farmedAmount }, { merge: true })
        .then(() => {
          console.log('Farm status updated successfully in Firestore.');

          // Update localStorage with the new farming status
          localStorage.setItem(`user_${userId}`, JSON.stringify({
            farm: farmedAmount,
            invite_link: inviteLink,
          }));
        })
        .catch((error) => {
          console.error('Error updating farming status in Firestore: ', error);
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
            ? `Farming ${Math.round(lastFarmedAmount)} / 100` 
            : 'Farm'
          }
        </button>
      </div>
    </BackgroundBox>
  );
};

export default IntegratedComponent;
