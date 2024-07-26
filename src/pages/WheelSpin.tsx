import React, { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';

interface Point {
  value: number;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
  },
});

const WheelComponent: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const pointsArray: Point[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 100 },
    { value: 200 },
    { value: 300 },
  ];

  useEffect(() => {
    const handleSpin = () => {
      const randomIndex = Math.floor(Math.random() * pointsArray.length);
      const randomPoints = pointsArray[randomIndex].value;
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
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <div style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '10px solid #333',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              <Typography variant="h2" component="h2">
                {points}
              </Typography>
            </div>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {pointsArray.map((point, index) => (
                <div key={index} style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}>
                  {point.value}
                </div>
              ))}
            </div>
          </div>
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
      </Grid>
    </ThemeProvider>
  );
};

export default WheelComponent;