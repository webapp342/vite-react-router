import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from './firebaseConfig';
import { Box, Typography, IconButton, Stack } from '@mui/material';
//import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import ton from '../assets/ton_logo_dark_background.svg';
import BellIcon from '@mui/icons-material/Notifications'; // MUI'den bildirim ikonu
import {  Person as PersonIcon, AttachMoney as MoneyIcon, AccountBalanceWallet as WalletIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import IkinciKart from './ikincikart.tsx';
import Three from './Three.tsx';


// import { useSpring, animated } from '@react-spring/web';
// import styled from 'styled-components';


const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
 // const [prevSpinPoints, setPrevSpinPoints] = useState<number>(0);
  // const [prevPoints, setPrevPoints] = useState<number>(0);
 // const [spinPointsColor, setSpinPointsColor] = useState<string>('white');
 // const [pointsColor, setPointsColor] = useState<string>('white');
  const userId = localStorage.getItem('telegramUserId') || '';

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);

      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
         // setPrevSpinPoints(spinPoints);
       //   setPrevPoints(points);
          setSpinPoints(data?.spinPoints || 0);
          setPoints(data?.points || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [userId, spinPoints, points]);

  // const spinPointsAnimation = useSpring({
    // from: { number: prevSpinPoints, fontSize: '0.75rem' },
    // to: { number: spinPoints, fontSize: '1rem' },
      // config: { duration: 1500 },
    // onStart: () => setSpinPointsColor('lightgreen'),
  // onRest: () => setSpinPointsColor('white')
 // });

 // const pointsAnimation = useSpring({
  //  from: { number: prevPoints, fontSize: '0.75rem' },
  //  to: { number: points, fontSize: '1rem' },
  //  config: { duration: 1500 },
  //  onStart: () => setPointsColor('lightgreen'),
 //   onRest: () => setPointsColor('white')
//  });
  




  return (
    <Box
    >
    {/* Üst Kısım */}
    <Box
      m={1}
      p={1}
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{  boxSizing: 'border-box' }}
    >
      <Box
      flexDirection={'column'}
      >
      <Typography 
        variant="subtitle2" 
        
        sx={{ 
          fontFamily: 'helvetica',
          color: '#8d8c85', fontWeight: 'light' }}
      >
        Welcome Back,
        
      </Typography>

      <Typography 
        variant="body1" 
        
        sx={{ color: 'black', fontWeight: 'bold' }}
      >
        Alireza Dehqan
        
      </Typography>
      </Box>
      
      
      <Box display="flex" alignItems="center">
        <IconButton sx={{ color: 'black', marginRight: 2 }}>
          <BellIcon />
        </IconButton>
        <IconButton sx={{ color: 'black' }}>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>

  {/* Ana İçerik */}
  <Box sx={{
  }}>
        {/* TOTAL SAVINGS Kısmı */}
        <Box
borderRadius={5}
p={2}
m={1}

          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            boxShadow: 3,
            backgroundColor: "#f6f5f0", padding: 2, marginBottom: 2 }}
        >
          <Typography sx={{ mt:2, color: '#8d8c85', fontWeight: 'light', fontSize: '0.8rem' }}>Total Balance</Typography>
          <Box display="flex" flexDirection="column" width="100%">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '2rem' }}>$ 7,500.00</Typography>
              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: 'black' }}>
                  <ArrowUpward />
                </IconButton>
                <IconButton sx={{ color: 'black' }}>
                  <ArrowDownward />
                </IconButton>
              </Box>
            </Box>
            <Typography sx={{color: '#8d8c85', fontWeight: 'light', fontSize: '0.8rem', marginBottom: 1 }}>Withdraw limit: $700</Typography>


            
            <Box
      borderRadius={2}
      sx={{
        mt:3
        , padding: 3, backgroundColor: "white", width: '100%', boxSizing: 'border-box' }} // Arka plan rengi beyaz
    >
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
        
        {/* APY Kısmı */}
        <Stack direction="row" alignItems="center">
          <Box sx={{ 
            backgroundColor: '#e9ebef ', 
            borderRadius: '50%', 
            padding: 0.1,
            display: 'flex', // Flexbox kullanarak içeriği ortala
            alignItems: 'center', // Dikey olarak ortala
            justifyContent: 'center', // Yatay olarak ortala
            width: '40px', // Yuvarlağın genişliği
            height: '40px', // Yuvarlağın yüksekliği
          }}>
            <MoneyIcon sx={{ color: 'black' }} />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography sx={{ color: '#8d8c85', fontWeight: 'light', fontSize: '0.6rem', }}>APY</Typography>
            <Typography sx={{ color: 'black', fontWeight: 'light', fontSize: '1rem' }}>27,40%</Typography>
          </Box>
        </Stack>

        {/* Dikey Çizgi */}
        <Box
          sx={{
            height: '40px', // Çizginin yüksekliği
            width: '2px',   // Çizginin kalınlığı
            backgroundColor: 'black', // Çizginin rengi
          }}
        />

        {/* Profit Kısmı */}
        <Stack direction="row" alignItems="center">
          <Box sx={{ 
            backgroundColor: '#e9ebef ', 
            borderRadius: '50%', 
            padding: 0.1,
            display: 'flex', // Flexbox kullanarak içeriği ortala
            alignItems: 'center', // Dikey olarak ortala
            justifyContent: 'center', // Yatay olarak ortala
            width: '40px', // Yuvarlağın genişliği
            height: '40px', // Yuvarlağın yüksekliği
          }}>
            <WalletIcon sx={{ color: 'black' }} />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography sx={{  color: '#8d8c85', fontWeight: 'light', fontSize: '0.6rem', }}>Profit</Typography>
            <Typography sx={{ color: 'black', fontWeight: 'light', fontSize: '1rem' }}>$700,00</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>

        

        
    
          </Box>
        </Box>

       
        
        </Box>
    
  </Box>
  );

};

const App = () => {
  return (
    <Box sx={{  }}>
      <PointsManager />
      <IkinciKart  />
      <Three />

      
    
   
      {/* Buraya başka içerikler ekleyebilirsiniz */}
    </Box>
  );
};

export default App;
