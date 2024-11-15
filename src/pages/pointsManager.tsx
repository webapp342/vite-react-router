import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box} from '@mui/material';
//import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import ton from '../assets/ton_logo_dark_background.svg';
import logo from '../assets/cap.png';
import logo2 from '../assets/logo.png';
import profile from '../assets/profile.png';


// import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';


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
  const StyledDiv = styled.div`


    color: black;

    display: flex;
    background: #cff008;
border-radius: 50%;

border: 1px solid #cff008;

    align-items: center;


    width: 10%;

    height: 10%;

         display="flex"


    justify-content: center;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);


`;



const StyledDiv2 = styled.div`


color: black;

display: flex;
background: #2aff32;
border-radius: 50%;

border: 1px solid #2aff32;

align-items: center;


width: 10%;

height: 10%;

     display="flex"


justify-content: center;

box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);


`;
  return (
    <Box
      position="fixed"
      top={0}                                                                 
      left={0}
      width="100%"
      p={2}
      zIndex={1000}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ boxSizing: 'border-box'}}
    >
      <StyledDiv>      
       
    
      <img src={logo} alt="Ton Logo"  style={{ width: "100%", height: "100% "}} />
      </            StyledDiv>
                                                             
      <img 
    src={logo2} 
    alt="capversal" 
    style={{ 
    padding:5,   
    borderRadius: 7,
    marginLeft: 2, 
    width: "50%",  
    height: "100%", 
    // border: '1px solid white' // Burada border ekleniyor
  }} 
/>
<StyledDiv2>        
        <img src={profile} alt="Ton Logo"  style={{color:"#8f8f8f", width: "100%", height: "100% "}} />

      </ StyledDiv2>
    </Box>
  );

};

export default PointsManager;
