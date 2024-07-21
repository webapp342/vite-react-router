import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import backgroundJpg from './background.jpg';
import backgroundGif from './background.gif';

// Styled component for background
const BackgroundBox = styled(Box)<{ isCounting: boolean }>(({ isCounting }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: isCounting
    ? `url(${backgroundGif})`
    : `url(${backgroundJpg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 1s ease',
}));

const CountdownComponent: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isCounting) {
      setCountdown(60);
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            setIsCounting(false);
            clearInterval(timer);
            return null;
          }
          return (prev || 0) - 1;
        });
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCounting]);

  const handleStart = () => {
    setIsCounting(true);
  };

  return (
    <BackgroundBox isCounting={isCounting}>
      {isCounting ? (
        <Typography variant="h4" color="white">
          {countdown !== null ? `${countdown} saniye` : 'Süre doldu!'}
        </Typography>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          sx={{ fontSize: '1.5rem', padding: '10px 20px' }}
        >
          Başla
        </Button>
      )}
    </BackgroundBox>
  );
};

export default CountdownComponent;