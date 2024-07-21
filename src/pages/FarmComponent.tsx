import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import { doc, getDoc } from 'firebase/firestore';
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
          const docRef = doc(db, 'users', telegramUserId);
          console.log(`Fetching document from Firestore: ${docRef.path}`);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setInviteLink(data.invite_link || 'No invite link found');
            console.log(`Fetched invite link: ${data.invite_link}`);
          } else {
            console.log('Document does not exist');
            setInviteLink('No invite link found');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
          setInviteLink('Error fetching invite link');
        }
      } else {
        console.error('Failed to get user data from Telegram Web Apps SDK');
        setInviteLink('No user data available');
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <BackgroundBox isFarming={false}>
      <div className="main-content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>User ID: {userId}</div>
            <div>Invite Link: {inviteLink}</div>
          </div>
        )}
      </div>
    </BackgroundBox>
  );
};

export default FarmComponent;
