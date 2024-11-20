import React, { useState } from 'react';
import { Box, Typography, Card, IconButton } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import money from '../assets/money.png';
import BasicStack from './Earn';
import Calculator from './Calculator';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TradingViewWidget from "./extras/TradingViewWidget";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const PointsManager: React.FC = () => {

  const [isVisible, setIsVisible] = useState(true); // Varsayılan olarak açık

 
      

  const totalBalance = isVisible ? `$981,234.92` : '***********';
  const percentageChange = isVisible
    ? '0.000% (+$12.110) last month'
    : '***********';

  return (
    <ThemeProvider theme={theme}>
      <Box p={1} sx={{ overflowX: 'hidden' }}>
        {/* Üst Bilgilendirme */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          p={1}
        >
          <Box
            component="div"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #031340, #08AEEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CAPVERSAL
          </Box>
          <Box display="flex" gap={1}>
            <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
            <PersonOutlinedIcon sx={{ fontSize: '2rem', color: 'black' }} />
          </Box>
        </Box>

        {/* Total Balance */}
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Box display="flex" alignItems="center">
            <Typography sx={{ color: '#909eae', fontWeight: 'bold', fontSize: '1rem' }}>
              TOTAL BALANCE
            </Typography>
            <IconButton onClick={() => setIsVisible(!isVisible)} sx={{ ml: 1 }}>
              {isVisible ? (
                <VisibilityIcon sx={{ color: 'black' }} />
              ) : (
                <VisibilityOffIcon sx={{ color: '#909eae' }} />
              )}
            </IconButton>
          </Box>
          <Typography sx={{ color: 'black', fontWeight: 'bold', fontSize: '2.5rem' }}>
            {totalBalance}
          </Typography>
          <Typography sx={{ color: 'green', fontSize: '1rem', mt: 1 }}>
            {percentageChange}
          </Typography>
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
              position: 'relative',
            }}
          >
            <Box width="25%" display="flex" justifyContent="center" alignItems="center">
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
            <Box
              width="60%"
              ml={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                Set-up your Earnings
              </Typography>
              <Typography
                mt={1}
                sx={{ color: '#909eae', fontWeight: 'light', fontSize: '0.8rem' }}
              >
                Earning Passive Income is Just a Few Clicks Away!
              </Typography>
            </Box>
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
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Box>
      <PointsManager />
      <TradingViewWidget />
      <BasicStack />
      <Calculator />
    </Box>
  );
};

export default App;
