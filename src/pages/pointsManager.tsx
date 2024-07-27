import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firebase konfigürasyonunuzu import edin
import { Box, Typography, Paper } from '@mui/material'; // MUI bileşenleri

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const userId = localStorage.getItem('telegramUserId') || '';

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);

      // Veritabanı değişikliklerini dinle
      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSpinPoints(data?.spinPoints || 0);
          setPoints(data?.points || 0);
        }
      });

      // Unsubscribe on component unmount
      return () => unsubscribe();
    }
  }, [userId]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      p={1} // Daha küçük padding
      zIndex={1000} // Diğer içeriklerin üstünde görünmesini sağlar
      display="flex"
      justifyContent="space-between" // Eşit şekilde yayılır ve uçlara yapışır
      alignItems="center"
      sx={{ boxSizing: 'border-box' }} // Box'ın içerik boyutlarına göre ayarlanmasını sağlar
    >
      <Paper elevation={3} sx={{ padding: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>S:</Typography>
        <Typography variant="h6" color="textPrimary">{spinPoints}</Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 1, display: 'flex', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>P:</Typography>
        <Typography variant="h6" color="textPrimary">{points}</Typography>
      </Paper>
    </Box>
  );
};

export default PointsManager;
