import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const [rotateDeg, setRotateDeg] = useState<number>(0);

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
      setRotateDeg(Math.floor(Math.random() * 360));
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
          <div
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              border: '10px solid #333',
              position: 'relative',
              transform: `rotate(${rotateDeg}deg)`,
              transition: 'transform 2s ease-in-out',
            }}
          >
            {pointsArray.map((point, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${index * 60}deg)`,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                {point.value}
              </div>
            ))}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              <Typography variant="h2" component="h2">
                {points}
              </Typography>
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