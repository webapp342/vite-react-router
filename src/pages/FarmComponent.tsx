import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
  const [inviteLink, setInviteLink] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        const telegramUserId = user.id.toString();
        setUserId(telegramUserId);
        console.log(`Fetching user data for ID: ${telegramUserId}`);

        try {
          const docRef = doc(db, 'farm', telegramUserId); // Tek bir belge kullanıyoruz
          console.log(`Fetching document from Firestore: ${docRef.path}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('Document exists. Data:', data);

            // Check if 'totalFarmedAmount' exists
            if (data && 'totalFarmedAmount' in data) {
              console.log('Total farmed amount field exists. Value:', data.totalFarmedAmount);
              setFarmedAmount(data.totalFarmedAmount);
            } else {
              console.log('Total farmed amount field does not exist. Creating with default value of 0...');
              await setDoc(docRef, { totalFarmedAmount: 0 }, { merge: true });
              console.log('Total farmed amount field set to 0.');
              setFarmedAmount(0);
            }

            setInviteLink(data.invite_link || 'No invite link found');
            console.log(`Fetched invite link: ${data.invite_link}`);
          } else {
            console.log('Document does not exist. Creating new document...');
            await setDoc(docRef, { 
              invite_link: 'No invite link found', 
              totalFarmedAmount: 0 
            });
            console.log('New document created with initial values.');
            setInviteLink('No invite link found');
            setFarmedAmount(0);
          }
        } catch (error) {
          console.error('Error fetching or updating user data: ', error);
          setInviteLink('Error fetching invite link');
          setFarmedAmount(0);
        }
      } else {
        console.error('Failed to get user data from Telegram Web Apps SDK');
        setInviteLink('No user data available');
        setFarmedAmount(0);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
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

      if (userId) {
        const docRef = doc(db, 'farm', userId); // Tek bir belge kullanıyoruz
        setDoc(docRef, {
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
  }, [isFarming, countdown, farmedAmount, userId]);

  const handleFarm = () => {
    setIsFarming(true);
    setCountdown(60);
    setLastFarmedAmount(0);
  };

  return (
    <BackgroundBox isFarming={isFarming}>
      <div className="main-content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>User ID: {userId}</div>
            <div>Invite Link: {inviteLink}</div>
            <div>Total Farmed Amount: {farmedAmount}</div>
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
        )}
      </div>
    </BackgroundBox>
  );
};

export default FarmComponent;
