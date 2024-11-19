import React from 'react';
import { Box, Typography, Card } from '@mui/material';

const EarningsCard: React.FC = () => {
  return (
    <Box m={1} mt={1} display="flex" justifyContent="center">
      
      
      <Card
        sx={{
          width: '100%',
          
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Şeffaf beyaz arka plan
          overflow: 'hidden', // Kenarlık taşmalarını önler
        }}
      >
        
        {/* Üst Kısım */}
        <Box mt={1} padding=  {2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
                
                fontFamily: 'Montserrat, sans-serif',

              color: 'black',
              fontWeight: 'light',
              fontSize: '1rem',
            }}
          >
            Our Strategy System 
          </Typography>
          <Typography
            color="primary"
            component="a"
            href="#"
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.8rem',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Learn more
          </Typography>
        </Box>

        {/* Orta Kısım */}
        <Box mt={-2} padding=  {2}  display="flex" alignItems="baseline">
          <Typography
            sx={{
              color: '#000',
              fontFamily: 'Montserrat, sans-serif',

              fontWeight: 'bold',
              fontSize: '1.7rem',
            }}
          >
            $12,517,388.120
          </Typography>
          <Typography
            sx={{
              color: 'gray',
              fontFamily: 'Montserrat, sans-serif',

              fontWeight: 'light',
              fontSize: '0.7rem',
              ml: 2,
            }}
          >
            is being used at 
          </Typography>
        </Box>

        {/* Alt Kısım: 3 Bölüm Kart */}
        <Box
          mt={0}
          display="flex"
          sx={{
            overflow: 'hidden', // Kartların birleşik görünmesi için
          }}
        >
          {/* Lacivert Kısım (%35) */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            justifyContent="left"
            sx={{
              backgroundColor: '#2F4F7F',
              color: '#fff',
              flexBasis: '38.32%', // Genişlik oranı
            }}
          >
            <Typography
                                  mt={1}       ml={1} 

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              46.32%
            </Typography>
            <Typography
                       mb={1}             ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
              }}
            >
              Mining & Staking
            </Typography>
          </Box>

          {/* Yeşil Kısım (%45) */}
          <Box
            display="flex"
            flexDirection="column"
           alignItems="left"
            justifyContent="left"
            sx={{
              backgroundColor: '#3CB371',
              color: '#fff',
              flexBasis: '23.68%', // Genişlik oranı
            }}
          >
            <Typography
                     mt={1}    ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem'}}
            >
              23.68% 
            </Typography>
            <Typography
                        ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
              }}
            >
              Stocks
            </Typography>
          </Box>

           {/* Yeşil Kısım (%45) */}
           <Box
            display="flex"
            flexDirection="column"
           alignItems="left"
            justifyContent="left"
            sx={{
              backgroundColor: '#5f574e',
              color: '#fff',
              flexBasis: '22%', // Genişlik oranı
            }}
          >
            <Typography
                     mt={1}    ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem'}}
            >
              22%
            </Typography>
            <Typography
                        ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
              }}
            >
              ETF's
            </Typography>
          </Box>

          {/* Mavi Kısım (%20) */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            justifyContent="left"
            sx={{
              backgroundColor: '#4682B4',
              color: '#fff',
              flexBasis: '16%', // Genişlik oranı
            }}
          >
            <Typography
                        ml={1}  mt={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              8%
            </Typography>
            <Typography
            ml={1}
              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
                textAlign: 'left',
                
              }}
            >
              Loans
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EarningsCard;
