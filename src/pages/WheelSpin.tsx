import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

interface WheelProps {
  onSpin: (point: number) => void;
}

const Wheel: React.FC<WheelProps> = ({ onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const points = [10, 50, 100];
  const segmentAngle = 360 / points.length;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * points.length);
    const selectedPoint = points[randomIndex];
    const spinAngle = 3600 + randomIndex * segmentAngle; // Çarkın 10 tur döneceğini varsayıyoruz

    const wheelElement = document.getElementById('wheel');
    if (wheelElement) {
      wheelElement.style.transition = 'transform 4s ease-out';
      wheelElement.style.transform = `rotate(${spinAngle}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      onSpin(selectedPoint);
    }, 4000);
  };

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
          {points.map((point, index) => (
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
    </Box>
  );
};

export default Wheel;
