import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const segmentAngle = 360 / 3; // Çarkın 3 segmenti var: 10, 50, 100
  const pointValues = [10, 50, 100];

  useEffect(() => {
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      setPoints(JSON.parse(savedPoints));
    }
  }, []);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * pointValues.length);
    const selectedPoint = pointValues[randomIndex];
    const spinAngle = 3600 + randomIndex * segmentAngle;

    const wheelElement = document.getElementById('wheel');
    if (wheelElement) {
      wheelElement.style.transition = 'transform 4s ease-out';
      wheelElement.style.transform = `rotate(${spinAngle}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      const newPoints = [...points, selectedPoint];
      setPoints(newPoints);
      localStorage.setItem('points', JSON.stringify(newPoints));
    }, 4000);
  };

  const totalPoints = points.reduce((acc, curr) => acc + curr, 0);

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Box sx={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
        <Box
          id="wheel"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '5px solid #ccc',
            position: 'relative',
            transform: 'rotate(0deg)',
          }}
        >
          {pointValues.map((point, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                backgroundColor: index % 2 === 0 ? '#ffcc00' : '#ff6666',
                transformOrigin: '100% 100%',
                transform: `rotate(${index * segmentAngle}deg)`,
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                color: '#fff',
              }}
            >
              {point}
            </Box>
          ))}
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSpin} disabled={spinning} sx={{ mt: 2 }}>
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Total Points: {totalPoints}
      </Typography>
      <Typography variant="body1">
        {points.length > 0 ? `Points History: ${points.join(', ')}` : 'No points yet.'}
      </Typography>
    </Box>
  );
};

export default Wheel;
