import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from './firebaseConfig';
import { Box, Typography, IconButton, Stack } from '@mui/material';
//import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import ton from '../assets/ton_logo_dark_background.svg';
import BellIcon from '@mui/icons-material/Notifications'; // MUI'den bildirim ikonu
import {  Person as PersonIcon,  ArrowUpward, ArrowDownward } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Three from './Three.tsx';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';


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
      p={2}
      m={1}
      mt={0}
      
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
            backgroundColor:'white',
        borderBottomRightRadius:15, borderBottomLeftRadius:15, boxSizing: 'border-box' }}
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
  borderRadius={3}
  mt={0.5}
  m={1}
  p={2}
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="flex-start"
  sx={{
    background:
    'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
    boxShadow: 2,
}}
>
          <Typography sx={{ mt:2, color: '#909eae', fontWeight: 'light', fontSize: '1' }}>Total Investment</Typography>
          <Box display="flex" flexDirection="column" width="100%">

            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Typography sx={{ color: 'white', fontWeight: 'light', fontSize: '2rem' }}>$7,500.00{' '}
  <Typography component="span" sx={{ color: 'lightgreen', fontWeight: 'light', fontSize: '1rem' }}>
    +5.76%
  </Typography></Typography>
              <Box display="flex" alignItems="center">
                <IconButton sx={{ color: 'white' }}>
                  <VisibilityIcon />
                </IconButton>
                
              </Box>
            </Box>
            <Typography sx={{ color: '#909eae', fontWeight: 'light', fontSize: '1rem', marginBottom: 1 }}>
  Your profit is  {' '}
  <Typography component="span" sx={{ color: 'lightblue', fontWeight: 'light', fontSize: '1.1rem' }}>
     $19.053
  </Typography>
</Typography>


            
<Box
      borderRadius={2}
      sx={{
mt : 2,
        width: '100%',
      }}
    >
      <Stack  direction="row" alignItems="center" justifyContent="space-between" width="100%">

         {/* Yukarı Yönlü İkon */}
         <Stack direction="column" alignItems="center" width="60%">
        <Box sx={{
                      padding: 1, // Daha geniş padding

            backgroundColor: '#e9ebef',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%', // Genişliği tamamen doldur
          }}>
            <ArrowUpward sx={{ color: 'black' }} />
          </Box>
          <Typography sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}>Profit</Typography>
        </Stack>

        {/* Aşağı Yönlü İkon */}
        <Stack direction="column" alignItems="center" width="60%">
        <Box sx={{
            backgroundColor: '#e9ebef',
            borderRadius: 4,
            padding: 1, // Daha geniş padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%', // Genişliği tamamen doldur
          }}>
            <ArrowDownward sx={{ color: 'black' }} />
          </Box>
          <Typography sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}>Profit</Typography>
        </Stack>

        
        {/* APY Kısmı */}
        <Stack direction="column" alignItems="center" width="60%">
          <Box sx={{
            backgroundColor: '#e9ebef',
            borderRadius: 4,
            padding: 1, // Daha geniş padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%', // Genişliği tamamen doldur
          }}>
            <AddIcon  sx={{ color: 'black' }} />
          </Box>
          <Typography sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}>Profit</Typography>
        </Stack>

        {/* Profit Kısmı */}
        <Stack direction="column" alignItems="center" width="60%">
        <Box sx={{
            backgroundColor: '#e9ebef',
            borderRadius: 4,
            padding: 1, // Daha geniş padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70%', // Genişliği tamamen doldur
          }}>
            <DashboardIcon sx={{ color: 'black' }} />
          </Box>
          <Typography sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}>Profit</Typography>
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
      <Three />

      
    
   
      {/* Buraya başka içerikler ekleyebilirsiniz */}
    </Box>
  );
};

export default App;
