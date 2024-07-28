import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Typography, Paper } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import logo from '../assets/ton_logo_dark_background.svg';
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
    padding: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    width: '28%',
    height: '50px',
    boxSizing: 'border-box',
    justifyContent: 'center',
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
      sx={{ boxSizing: 'border-box' }}
    >
      <Paper elevation={3} sx={{ ...boxStyles }}>
        <SportsEsportsIcon sx={{ marginRight: 1, fontSize: '1rem', color: 'white' }} />
        <Typography variant="subtitle2" color="white" sx={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
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
      <Paper elevation={3} sx={{ ...boxStyles, width: '40%' }}>
        <Typography variant="subtitle2" color="white" sx={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Profil</Typography>
      </Paper>
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
        <img src={logo} alt="Ton Logo" style={{ width: 28, height: 28 }} />
      </Paper>
    </Box>
  );
};

export default PointsManager;
