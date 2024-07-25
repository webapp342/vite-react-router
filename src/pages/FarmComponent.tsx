import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
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
  backgroundImage: isRunning ? `url(${backgroundGif})` : `url(${backgroundJpg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 1s ease',
}));

const IntegratedComponent: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Function to handle localStorage updates
  const updateIsRunning = () => {
    const storedIsRunning = localStorage.getItem('isRunning');
    if (storedIsRunning !== null) {
      setIsRunning(storedIsRunning === 'true');
    }
  };

  useEffect(() => {
    // Initial fetch from localStorage
    updateIsRunning();

    // Event listener for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isRunning') {
        updateIsRunning();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to start the counter
  const startCounter = () => {
    localStorage.setItem('isRunning', 'true');
    setIsRunning(true);
    // Here you can also add your counter logic
  };

  return (
    <BackgroundBox isRunning={isRunning}>
      <div className="main-content">
        <UserDetails />
        <p><strong>Is Running:</strong> {isRunning ? 'Yes' : 'No'}</p>
        <Button variant="contained" color="primary" onClick={startCounter} disabled={isRunning}>
          Start Counter
        </Button>
      </div>
    </BackgroundBox>
  );
};

export default IntegratedComponent;
