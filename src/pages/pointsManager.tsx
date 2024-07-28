import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firebase konfigürasyonunuzu import edin
import { Box, Typography, Paper } from '@mui/material'; // MUI bileşenleri
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/ton_logo_dark_background.svg'; // SVG dosyasını img olarak import edin

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

  const boxStyles = {
    padding: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '27%',
    height: '50px', // Sabit yükseklik
    boxSizing: 'border-box',
    justifyContent: 'center'
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      p={1} // Daha küçük padding
      zIndex={1000} // Diğer içeriklerin üstünde görünmesini sağlar
      display="flex"
      justifyContent="space-between" // Kutuları eşit boşlukla yayar
      alignItems="center"
      sx={{ boxSizing: 'border-box' }} // Box'ın içerik boyutlarına göre ayarlanmasını sağlar
    >
      <Paper elevation={3} sx={{ ...boxStyles }}>
        <SportsEsportsIcon sx={{ marginRight: 1, fontSize: '1rem', color: 'white' }} />
        <Typography variant="body2" color="white">{spinPoints}</Typography>
      </Paper>
      <Paper elevation={3} sx={{ ...boxStyles, width: '40%' }}>
        <AccountCircleIcon sx={{ marginRight: 1, fontSize: '1.25rem', color: 'white' }} />
        <Typography variant="body2" color="white">Profil</Typography>
      </Paper>
      <Paper elevation={3} sx={{ ...boxStyles }}>
        <Typography variant="body2" color="white" sx={{ marginRight: 1 }}>{points}</Typography>
        <img src={logo} alt="Ton Logo" style={{ width: 25, height: 25 }} /> {/* img etiketi ile SVG kullanımı */}
      </Paper>
    </Box>
  );
};

export default PointsManager;
