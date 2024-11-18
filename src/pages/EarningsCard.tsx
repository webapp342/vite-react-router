import React from 'react';
import { Box, Typography, Card } from '@mui/material';

const EarningsCard: React.FC = () => {
  return (
    <Box m={1} mt={2} display="flex" justifyContent="center">
      <Card
        sx={{
          width: '100%',
          
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Şeffaf beyaz arka plan
          overflow: 'hidden', // Kenarlık taşmalarını önler
        }}
      >
        {/* Üst Kısım */}
        <Box mt={2} padding=  {2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{
                
                fontFamily: 'Montserrat, sans-serif',

              color: 'black',
              fontWeight: 'light',
              fontSize: '0.8rem',
            }}
          >
            TOTAL EARNINGS
          </Typography>
          <Typography
            sx={{
                fontFamily: 'Montserrat, sans-serif',

              fontSize: '1rem',
              color: 'gray',
            }}
          >
            ...
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
            $12,310.00
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
            Total earned in this week
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
              flexBasis: '35%', // Genişlik oranı
            }}
          >
            <Typography
                                  mt={1}       ml={1} 

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              35%
            </Typography>
            <Typography
                       mb={1}             ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
              }}
            >
              Transfer
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
              flexBasis: '45%', // Genişlik oranı
            }}
          >
            <Typography
                     mt={1}    ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem'}}
            >
              45%
            </Typography>
            <Typography
                        ml={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
              }}
            >
              Receive
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
              flexBasis: '20%', // Genişlik oranı
            }}
          >
            <Typography
                        ml={1}  mt={1}

              sx={{              fontFamily: 'Montserrat, sans-serif',
                fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              20%
            </Typography>
            <Typography
            ml={1}
              sx={{              fontFamily: 'Montserrat, sans-serif',

                fontSize: '0.7rem',
                fontWeight: 'light',
                textAlign: 'left',
                
              }}
            >
              Saving
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default EarningsCard;
