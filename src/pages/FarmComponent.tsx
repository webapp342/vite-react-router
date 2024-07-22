import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';

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
    const isRunning = localStorage.getItem('isRunning');
    setIsFarming(isRunning === 'true');
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
