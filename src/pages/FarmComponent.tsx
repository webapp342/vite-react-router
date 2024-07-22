import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';

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
  }, []);

  return (
    <BackgroundBox isRunning={isRunning}>
      <div className="main-content">
        <p><strong>Is Running:</strong> {isRunning ? 'Yes' : 'No'}</p>
      </div>
    </BackgroundBox>
  );
};

export default IntegratedComponent;
