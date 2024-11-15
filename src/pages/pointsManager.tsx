import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Typography, Paper } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ton from '../assets/ton_logo_dark_background.svg';
import logo from '../assets/SVG.svg';

import { useSpring, animated } from '@react-spring/web';

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [prevSpinPoints, setPrevSpinPoints] = useState<number>(0);
  const [prevPoints, setPrevPoints] = useState<number>(0);
  const [spinPointsColor, setSpinPointsColor] = useState<string>('white');
  const [pointsColor, setPointsColor] = useState<string>('white');
  const userId = localStorage.getItem('telegramUserId') || '';

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);

      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setPrevSpinPoints(spinPoints);
          setPrevPoints(points);
          setSpinPoints(data?.spinPoints || 0);
          setPoints(data?.points || 0);
        }
      });

      return () => unsubscribe();
    }
  }, [userId, spinPoints, points]);

  const spinPointsAnimation = useSpring({
    from: { number: prevSpinPoints, fontSize: '0.75rem' },
    to: { number: spinPoints, fontSize: '1rem' },
    config: { duration: 1500 },
    onStart: () => setSpinPointsColor('lightgreen'),
    onRest: () => setSpinPointsColor('white')
  });

  const pointsAnimation = useSpring({
    from: { number: prevPoints, fontSize: '0.75rem' },
    to: { number: points, fontSize: '1rem' },
    config: { duration: 1500 },
    onStart: () => setPointsColor('lightgreen'),
    onRest: () => setPointsColor('white')
  });

  const boxStyles = {
    padding: 2,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: '6px',
    width: '20%',
    height: '35px',
    boxSizing: 'border-box',
    border: '1px solid white' ,
    justifyContent: 'center',
   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      p={1}
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ boxSizing: 'border-box'}}
    >
      <Paper elevation={3} sx={{ ...boxStyles }}>
        <SportsEsportsIcon sx={{ marginRight: 1, fontSize: '2rem', color: 'white' }} />
        <Typography variant="subtitle2" color="black" sx={{    fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          <animated.span
            style={{
              ...spinPointsAnimation,
              color: spinPointsColor,
            }}
          >
            {spinPointsAnimation.number.to(n => n.toFixed(0))}
          </animated.span>
        </Typography>
      </Paper>
      <img 
    src={logo} 
    alt="Ton Logo" 
    style={{ 
    padding:2,   
    marginLeft: 2, 
    width: 180,  
    height: 32, 
    // border: '1px solid white' // Burada border ekleniyor
  }} 
/>
      <Paper elevation={3} sx={{ ...boxStyles }}>
        <Typography variant="subtitle2" color="white" sx={{ marginRight: 1, fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          <animated.span
            style={{
              ...pointsAnimation,
              color: pointsColor,
            }}
          >
            {pointsAnimation.number.to(n => n.toFixed(0))}
          </animated.span>
        </Typography>
        <img src={ton} alt="Ton Logo" style={{ width: 28, height: 28 }} />
      </Paper>
    </Box>
  );
};

export default PointsManager;
