import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Typography, Card } from '@mui/material';
import { Notifications as NotificationsIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import money from '../assets/money.png';
import EarningsCard from './EarningsCard';
import BasicStack from './Earn';

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const userId = localStorage.getItem('telegramUserId') || '';

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

          <Box display="flex" alignItems="center">
            <NotificationsIcon sx={{ fontSize: '2rem', color: 'black' }} />
            <Box
              sx={{
                bgcolor: 'black',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                marginLeft: 2,
                marginRight: 2,
              }}
            />

          </Box>
        </Box>

        {/* Total Balance */}
        <Box width="100%">
          <Typography
            sx={{
              mt: 5,
              fontFamily: 'Montserrat, sans-serif',

              color: '#909eae',
              fontWeight: 'bold',
              fontSize: '1rem',
              textAlign: 'center',
            }}
          >
            TOTAL BALANCE
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={1}
          >
            <Typography
              sx={{
                color: 'black',
                fontFamily: 'Montserrat, sans-serif',

                fontWeight: 'bold',
                fontSize: '2.5rem',
                textAlign: 'center',
              }}
            >
              $121,293.00
            </Typography>
            <Typography
              sx={{
                color: 'green',
                fontFamily: 'Montserrat, sans-serif',

                fontWeight: 'light',
                fontSize: '1rem',
                mt: 1,
              }}
            >
              0.000% (+$12.110) last month
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
                  fontSize: '0.9rem',
                }}
              >
                Design Your Earnings, Your Way Show Your Style on Every Swipe!
              </Typography>
            </Box>

            {/* Sağ Alt Köşede Sağ Ok İkonu */}
            <ArrowForwardIcon
              sx={{
                position: 'absolute',
                bottom: 10,
                
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
      <EarningsCard />
      <BasicStack />


      
    </Box>
  );
};

export default App;
