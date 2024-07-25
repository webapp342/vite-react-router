import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';
import UserDetails from "./UserDetails.tsx";

// Styled component for background
const BackgroundBox = styled(Box)<{ isRunning: boolean }>(({ isRunning }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: isRunning
    ? `url(${backgroundGif})`
    : `url(${backgroundJpg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 1s ease',
}));

const IntegratedComponent: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const storedIsRunning = localStorage.getItem('isRunning');
    if (storedIsRunning === null) {
      console.warn('No "isRunning" value found in local storage');
    } else {
      console.log(`Fetched "isRunning" value: ${storedIsRunning}`);
      setIsRunning(storedIsRunning === 'true');
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isRunning') {
        console.log(`Storage event detected. New value: ${event.newValue}`);
        setIsRunning(event.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BackgroundBox isRunning={isRunning}>
      <div className="main-content">
        <UserDetails />
        <p><strong>Is Running:</strong> {isRunning ? 'Yes' : 'No'}</p>
      </div>
    </BackgroundBox>
  );
};

export default IntegratedComponent;
