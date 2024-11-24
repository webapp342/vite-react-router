import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BasicStack from './Earn';       
import CryptoCards from '../pages/extras/CryptoCards';

import Calculator from './Calculator';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RedeemIcon from '@mui/icons-material/Redeem';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import LoupeIcon from '@mui/icons-material/Loupe';
import { Link } from 'react-router-dom';


const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const PointsManager: React.FC = () => {
  const totalBalance = `$9,481,234.92`;
  const percentageChange = '182.000% (+$5,156,100.110) last month';

  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor={'black'}
        sx={{
          background: 'linear-gradient(90deg, #283048, #414345)',
          overflowX: 'hidden',
        }}
      >
        <Box>
          {/* Üst Bilgilendirme */}
          <Box
            m={2}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '2rem', color: 'white' }} />
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            ></Typography>
            <PersonOutlinedIcon sx={{ fontSize: '2rem', color: 'white' }} />

          </Box>

          {/* Total Balance */}
          <Box mb={5} display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Box display="flex" alignItems="center">
              <Typography sx={{ color: '#909eae', fontWeight: 'bold', fontSize: '0.8rem' }}>
                TOTAL BALANCE
              </Typography>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }}>
              {totalBalance}
            </Typography>
            <Typography sx={{ color: '#00b894', fontSize: '1rem' }}>
              {percentageChange}
            </Typography>

            {/* Yan Yana Butonlar */}
            <Box display="flex" gap={2} mt={5} mb={-2}>
            <Button
                variant="contained"
                color="success"
                startIcon={<LoupeIcon />}
                 component={Link}
        to="/vite-react-router/farm"
                sx={{
                  textTransform: 'none', // Harfleri büyük yapmayı devre dışı bırakır
                  flex: 1, // Esnek genişlik
                  backgroundColor: '#00b894' ,
                }} 
              >
Deposit              </Button>
              <Button
                variant="contained"
                 component={Link}
        to="/vite-react-router/farm"
                startIcon={<ArrowCircleUpIcon />}
                sx={{
                  color:'black',
                  textTransform: 'none', // Harfleri büyük yapmayı devre dışı bırakır
                  backgroundColor: 'white',
                  flex: 1, // Esnek genişlik
                }}
              >
Withdraw              </Button>
<Button
             
                startIcon={<RedeemIcon />}
                 component={Link}
        to="/vite-react-router/task"
                sx={{
                  p:1,
                  fontWeight: 'light',
                  color:'black',
                  textTransform: 'none', // Harfleri büyük yapmayı devre dışı bırakır
                  backgroundColor: 'white',
                  flex: 1, // Esnek genişlik
                }}
              >
Earn              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Box>
      <PointsManager />
      <CryptoCards/>

      <BasicStack />

      <Calculator />
    </Box>
  );
};

export default App;
