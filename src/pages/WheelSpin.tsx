import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // Total rotation angle
  const [points, setPoints] = useState<number[]>([]);
  const pointValues = [10, 50, 100];
  const segmentAngle = 360 / pointValues.length;
  const segmentMidAngle = segmentAngle / 2; // Segmentlerin ortasına denk gelecek açı

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
    const fullSpin = 360 * 10; // 10 tam dönüş
    const angleToRotate = randomIndex * segmentAngle;
    const spinAngle = fullSpin + angleToRotate + segmentMidAngle;

    setRotation(prevRotation => prevRotation + spinAngle);

    setTimeout(() => {
      setRotation(prevRotation => (prevRotation + angleToRotate + segmentMidAngle) % 360);
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
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 4s ease-out',
            background: `conic-gradient(
              #ffcc00 0deg ${segmentAngle}deg,
              #ff6666 ${segmentAngle}deg ${2 * segmentAngle}deg,
              #66b2ff ${2 * segmentAngle}deg 360deg
            )`,
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
                transform: `rotate(${index * segmentAngle + segmentMidAngle}deg)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#000',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)',
                zIndex: 2,
              }}
            >
              {point}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '-20px', // Oku doğru hizalamak için yukarıya taşı
            left: '50%',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '20px solid #ff0000',
            transform: 'translateX(-50%)',
            zIndex: 1,
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
