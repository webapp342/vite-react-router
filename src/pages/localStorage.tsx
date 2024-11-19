import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Typography, Card, IconButton } from '@mui/material';
import {  ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import money from '../assets/money.png';
// import EarningsCard from './EarningsCard';
import Calculator from './Calculator';

import BasicStack from './Earn';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const userId = localStorage.getItem('telegramUserId') || '';
 
  const [isVisible, setIsVisible] = useState(false); // Başlangıçta gizli

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);

      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSpinPoints(data?.spinPoints || 0);
          setPoints(data?.points || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [userId, spinPoints, points]);

  return (
    <Box>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          overflowX: 'hidden',
        }}
      >
        {/* Üst Bilgilendirme */}
        <Box
          display="flex"
          p={1}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
         <Box
  component="div"
  sx={{
    fontSize: '1.5rem',
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Montserrat, sans-serif',
    display: 'inline-block',
    background: 'linear-gradient(90deg, #031340, #08AEEA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}
>
  CAPVERSAL
</Box>

          <Box padding={1} gap={1} display="flex" alignItems="center" justifyContent={'space-between'}>
            <AdminPanelSettingsOutlinedIcon  sx={{ fontSize: '2rem', color: 'black' }} />
                        <PersonOutlinedIcon sx={{mr:'1', fontSize: '2rem', color: 'black' }} />

            <Box/>

          </Box>
        </Box>

        <Box width="100%">
        <Box
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  mt={1}
>
  {/* Başlık ve Görünürlük İkonu */}
  <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
    <Typography
      sx={{
        fontFamily: 'Montserrat, sans-serif',
        color: '#909eae',
        fontWeight: 'bold',
        fontSize: '1rem',
      }}
    >
      TOTAL BALANCE
    </Typography>
    <IconButton onClick={() => setIsVisible(!isVisible)} sx={{ ml: 1 }}>
      {isVisible ? (
        <VisibilityIcon sx={{ color: 'black' }} /> // Eğer görünürse "göz açık" ikonu
      ) : (
        <VisibilityOffIcon sx={{ color: '#909eae' }} /> // Gizli olduğunda "göz kapalı" ikonu
      )}
    </IconButton>
  </Box>

  {/* İçerik */}
  <Typography
    sx={{
      color: 'black',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'bold',
      fontSize: '2.5rem',
      textAlign: 'center',
    }}
  >
    {isVisible
      ? `$981,234.92` // Eğer görünürse gerçek değer
      : '***********'.repeat(points.toString().length)} {/* Gizli olduğunda yıldız */}
  </Typography>

  {/* Yüzde ve Artış Bilgisi */}
  <Typography
    sx={{
      color: 'green',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 'light',
      fontSize: '1rem',
      mt: 1,
    }}
  >
    {isVisible
      ? '0.000% (+$12.110) last month' // Görünürse gerçek metin
      : '***********'.repeat(points.toString().length)} {/* Gizli olduğunda yıldız */}
  </Typography>
</Box>


    </Box>

        {/* Kart Alanı */}
        <Box mt={3} display="flex" justifyContent="center">
          <Card
            sx={{
              width: '95%',
              borderRadius: 3,
              backgroundColor: '#1e2a3a',
              display: 'flex',
              padding: 2,
              position: 'relative', // Sağ alt köşedeki ikon için gerekli
            }}
          >
            {/* Sol Bölüm */}
            <Box
              width="25%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="img"
                src={money}
                alt="Logo"
                sx={{
                  width: '140px',
                  height: '100px',
                  borderRadius: '12px',
                }}
              />
            </Box>

            {/* Sağ Bölüm */}
            <Box
              width="60%"
              display="flex"
              ml={3}
              flexDirection="column"
              justifyContent="center"
            >
              <Typography
                sx={{ color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold', fontSize: '1rem' }}
              >
                Set-up your Earnings
              </Typography>
              <Typography
              mt={1}
                sx={{
                  fontFamily: 'Montserrat, sans-serif',

                  color: '#909eae',
                  fontWeight: 'light',
                  fontSize: '0.8rem',
                }}
              >
Earning Passive Income is Just a Few Clicks Away !   </Typography>
            </Box>

            {/* Sağ Alt Köşede Sağ Ok İkonu */}
            <ArrowForwardIcon
              sx={{
                position: 'absolute',
                bottom: 25,
                
                right: 20,
                color: 'white',
                fontSize: '1.5rem',
              }}
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Box>
      <PointsManager />
      <BasicStack />

      <      Calculator
 />



      
    </Box>
  );
};

export default App;
