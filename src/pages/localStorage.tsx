import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Box, Typography,  Stack } from '@mui/material';
import { Person as PersonIcon, ArrowUpward} from '@mui/icons-material';
//import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import AssuredWorkloadRoundedIcon from '@mui/icons-material/AssuredWorkloadRounded';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
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
    <Box 
>
      {/* Üst Başlık ve İçerik Birleşik */}
      <Box
    
      
        p={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          background: 'linear-gradient(0deg, #2f537c 0%, #031340 100%);  )',
          boxShadow: 2,
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
     >
            <Typography sx={{ fontFamily: 'helvetica', color: 'gray', fontWeight: 'light', fontSize: '1rem' }}>
              Welcome Back,
            </Typography>
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}
            >
              Alireza Dehqan <WorkspacePremiumIcon sx={{fontSize:'1.6rem' , color: '#CD7F32' }} />
            </Typography>
          
          </Box>
          
          <Box display="flex" alignItems="center">
     <Box
        sx={{
          backgroundColor: '#CD7F32',
          borderRadius: 2,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
    
        }}
      >
 <Typography
    sx={{

      color: 'black',
    
      fontSize: '1rem',
      textAlign: 'center', // Ortalanmış
    }}
  >
   Bronze
  </Typography>      </Box>
      <Box
        sx={{
          backgroundColor: '#e9ebef',
          borderRadius: 2,
          padding: 1,
          display: 'flex',
          ml: 1,
          mr: 2,
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
        }}
      >
        
        <PersonIcon sx={{color: 'black' }} />
      </Box>

</Box>

        </Box>

        {/* Total Investment */}
        <Box width="100%">
  {/* Total Investment Başlık ve Değer */}
  <Typography
    sx={{
      mt: 5,
      color: 'white',
      fontWeight: 'light',
      fontSize: '1.5rem',
      textAlign: 'center', // Ortalanmış
    }}
  >
    Total Balance 
  </Typography>
  <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
    <Typography
      sx={{
        color: 'white',
        fontWeight: 'light',
        fontSize: '2rem',
        textAlign: 'center',
      }}
    >
      $0,0000 cUSD
    </Typography>
   { <Typography
      sx={{
        color: 'gray',
        fontWeight: 'light',
        fontSize: '1rem',
        mt:2,
        ml: 1, // Yatay boşluk
      }}
    >
      0.000%
    </Typography>}
  </Box>

  {/* Total Earnings ve Earning per day */}
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
    <Box textAlign="center" width="50%"> {/* Total Earnings Bölümü */}
   
      <Typography
        sx={{
          color: 'white',
          fontWeight: 'light',
          fontSize: '1.5rem',
         
        }}
      >
      $0,0000 cUSD
      </Typography>
      <Typography
        sx={{
          color: '#909eae',
          fontWeight: 'light',
          fontSize: '1rem',
        }}
      >
        Total Earnings
      </Typography>
    </Box>
    <Box textAlign="center" width="50%"> {/* Earning per day Bölümü */}
    
      <Typography
        sx={{
          color: 'white',
          fontWeight: 'light',
          fontSize: '1.5rem',
      
        }}
      >
      $0,0000 cUSD
      </Typography>
      <Typography
        sx={{
          color: '#909eae',
          fontWeight: 'light',
          fontSize: '1rem',
        }}
      >
        Est. Daily Earnings
      </Typography>
    </Box>
  </Box>
</Box>



          {/* Yatırım İşlemleri */}
          <Box borderRadius={2} sx={{ mt: 3, width: '100%' }}>
  <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
    {/* Withdraw */}
    <Stack direction="column" 
   
    alignItems="center" width="60%"> {/* Genişletilen alan */}
      <Box
        sx={{
          backgroundColor: '#e9ebef',
          borderRadius: 4,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
        }}
      >
        <ArrowUpward sx={{ color: 'black' }} />
      </Box>
      <Typography
        sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}
      >
        Withdraw
      </Typography>
    </Stack>

    {/* Invest */}
    <Stack direction="column" alignItems="center" width="25%"> {/* 50% alanın yarısı */}
      <Box
        sx={{
          backgroundColor: '#e9ebef',
          borderRadius: 4,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
        }}
      >
        <AutoGraphRoundedIcon sx={{ color: 'black' }} />
      </Box>
      <Typography
        sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}
      >
        Invest
      </Typography>
    </Stack>

    {/* More */}
    <Stack direction="column" alignItems="center" width="25%"> {/* 50% alanın diğer yarısı */}
      <Box
        sx={{
          backgroundColor: '#e9ebef',
          borderRadius: 4,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '70%',
        }}
      >
        <AssuredWorkloadRoundedIcon sx={{ color: 'black' }} />
      </Box>
      <Typography
        sx={{ mt: 1, color: 'white', fontWeight: 'light', fontSize: '0.9rem' }}
      >
        Compound
      </Typography>
    </Stack>
  </Stack>
</Box>
        </Box>
      </Box>

  );
};

const App = () => {
  return (
    <Box>
      <PointsManager />
      <BasicStack/>

    </Box>
  );
};

export default App;
