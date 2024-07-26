import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';

const WheelSpin: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const rewardOptions = [10, 50, 100, 250, 1000];

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
      const pointsArray = JSON.parse(storedPoints);
      const total = pointsArray.reduce((acc: number, curr: number) => acc + curr, 0);
      setTotalPoints(total);
    }
  }, []);

  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * rewardOptions.length);
    const selectedPoints = rewardOptions[randomIndex];
    setPoints(selectedPoints);
    savePoints(selectedPoints);
  };

  const savePoints = (newPoints: number) => {
    const storedPoints = localStorage.getItem('points');
    const pointsArray = storedPoints ? JSON.parse(storedPoints) : [];
    pointsArray.push(newPoints);
    localStorage.setItem('points', JSON.stringify(pointsArray));
    
    const updatedTotal = pointsArray.reduce((acc: number, curr: number) => acc + curr, 0);
    setTotalPoints(updatedTotal);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Çarkı Çevir!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSpin}>
        Çarkı Çevir
      </Button>
      {points !== null && (
        <Typography variant="h6" mt={2}>
          Kazandığınız Puan: {points}
        </Typography>
      )}
      <Typography variant="h6" mt={2}>
        Toplam Puan: {totalPoints}
      </Typography>
    </Box>
  );
};

export default WheelSpin;
