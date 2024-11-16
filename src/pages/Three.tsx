import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box} from '@mui/material';
import CryptoTable from './CryptoTable.tsx';
//import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import ton from '../assets/ton_logo_dark_background.svg';



// import { useSpring, animated } from '@react-spring/web';
// import styled from 'styled-components';


const Three: React.FC = () => {
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
    <Box>
    {/* Üst Kısım */}
    <Box
      width="100%"
      zIndex={1000}
      justifyContent="space-between"
      alignItems="center"
      sx={{ boxSizing: 'border-box' }}
    >
           <CryptoTable />

     
    </Box>

  {/* Ana İçerik */}
  

       
        
        </Box>
    

  );

};


export default Three ;
