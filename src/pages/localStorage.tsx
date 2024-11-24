import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import BasicStack from './Earn';
import CryptoCards from '../pages/extras/CryptoCards';
import Calculator from './Calculator';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const PointsManager: React.FC = () => {
  const totalBalance = `= 9,235 USD`;
  const percentageChange = '+8,391 USD Today';

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
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
            <AutorenewIcon sx={{ fontSize: '1.6rem', color: 'black' }} />
           
            <Typography   
            sx={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              
              background: 'linear-gradient(90deg, #031340, #08AEEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
           CAPVERSAL

           </Typography>
            <PersonOutlinedIcon sx={{ fontSize: '1.6rem', color: 'black' }} />
          </Box>

          {/* Kart: Total Balance ve Buton */}
          <Box p={1} display="flex" justifyContent="center" mt={1}>
            <Card
              sx={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#2c3e50',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: 3,
              }}
            >
              <CardContent>
                {/* Total Balance */}
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                  <Typography sx={{ color: '#909eae', fontWeight: 'bold', fontSize: '0.8rem' }}>
                    TOTAL BALANCE
                  </Typography>
                  <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem' }}>
                    {totalBalance}
                  </Typography>
                  <Typography sx={{ color: '#00b894', fontSize: '0.8rem' }}>
                    {percentageChange}
                  </Typography>
                </Box>

                {/* Deposit Button */}
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<VerticalAlignBottomIcon />}
                  component={Link}
                  to="/vite-react-router/farm"
                  sx={{
                    textTransform: 'none', // Harfleri büyük yapmayı devre dışı bırakır
                    width: '100%', // Buton genişliği kart kadar olur
                    backgroundColor: '#00b894',
                  }}
                >
                  Deposit
                </Button>
              </CardContent>
            </Card>
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
      <CryptoCards />
      <BasicStack />
      <Calculator />
    </Box>
  );
};

export default App;
