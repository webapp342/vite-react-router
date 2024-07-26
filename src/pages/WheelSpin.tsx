import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // Total rotation angle
  const [points, setPoints] = useState<number[]>([]);
  const pointValues = [10, 50, 100];
  const segmentAngle = 360 / pointValues.length;

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
    const spinAngle = 3600 + randomIndex * segmentAngle; // Total rotation angle

    setRotation(rotation + spinAngle);

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
      <Box sx={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
        <Box
          id="wheel"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '10px solid #333',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s ease-out',
            background: 'conic-gradient(from 0deg, #ffcc00, #ff6666, #66b2ff, #ffcc00)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          {pointValues.map((point, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                width: '50%',
                height: '50%',
                backgroundColor: 'transparent',
                transformOrigin: '100% 100%',
                transform: `rotate(${index * segmentAngle}deg)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                color: '#fff',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
              }}
            >
              {point}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '20px',
            height: '20px',
            backgroundColor: '#000',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '20px solid #ff0000',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSpin} disabled={spinning} sx={{ mt: 2 }}>
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Total Points: {totalPoints}
      </Typography>
    </Box>
  );
};

export default Wheel;
