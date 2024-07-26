import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
  },
});

const WheelComponent = () => {
  const [points, setPoints] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const pointsArray = [10, 20, 30, 100, 200, 300];

  useEffect(() => {
    const handleSpin = () => {
      const randomIndex = Math.floor(Math.random() * pointsArray.length);
      const randomPoints = pointsArray[randomIndex];
      setPoints(randomPoints);
      localStorage.setItem('points', randomPoints.toString());
    };

    if (isSpinning) {
      handleSpin();
      setIsSpinning(false);
    }
  }, [isSpinning]);

  const handleSpinClick = () => {
    setIsSpinning(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Wheel of Fortune
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSpinClick}
            disabled={isSpinning}
          >
            Spin the Wheel!
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align="center">
            You got {points} points!
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default WheelComponent;