import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import './WheelSpin.css'; // CSS dosyasını import ediyoruz

const WheelSpin: React.FC = () => {
  const [points, setPoints] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const rewardOptions = [10, 50, 100, 250, 1000];
  const wheelRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
      const pointsArray = JSON.parse(storedPoints);
      const total = pointsArray.reduce((acc: number, curr: number) => acc + curr, 0);
      setTotalPoints(total);
    }
  }, []);

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * rewardOptions.length);
    const selectedPoints = rewardOptions[randomIndex];

    const randomDegree = 3600 + randomIndex * (360 / rewardOptions.length); // Çarkı 10 tur döndür ve rastgele bir noktada durdur
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${randomDegree}deg)`;
    }

    setTimeout(() => {
      setPoints(selectedPoints);
      savePoints(selectedPoints);
      setSpinning(false);
    }, 4000); // 4 saniye döndürme süresi
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
      <Box className="wheel-container" mt={2} mb={2}>
        <div className="wheel" ref={wheelRef}>
          {rewardOptions.map((option, index) => (
            <div key={index} className="segment">
              {option}
            </div>
          ))}
        </div>
        <div className="arrow"></div>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSpin} disabled={spinning}>
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
