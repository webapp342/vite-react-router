import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type DataItem = {
  symbol: string;
  logo: string;
  value: string;
  price: string;
  earn: string;
};

const data: DataItem[] = [
  { symbol: 'GC1!', logo: 'https://s3-symbol-logo.tradingview.com/metal/gold--big.svg', value: '19.23444 %', price: 'Gold Futures', earn: 'Up to 213.62%' },
  { symbol: 'GCX2024', logo: 'https://s3-symbol-logo.tradingview.com/metal/gold--big.svg', value: '23.82671 %', price: 'Gold Futures', earn: 'Up to 261.17%' },
  { symbol: 'MBTX2024', logo: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg', value: '42.1466 %', price: 'BTC Futures', earn: 'Up to 153.32%' },
  { symbol: 'SILVER', logo: 'https://s3-symbol-logo.tradingview.com/metal/silver--big.svg', value: '21.00567 %', price: 'Silver Options', earn: 'Up to 211.86%'},
  { symbol: 'MCLZ2024', logo: 'https://s3-symbol-logo.tradingview.com/crude-oil--big.svg', value: '13.92661 %', price: 'Bent Futures ', earn: 'Up to 113.62%' },
];

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  fontFamily: 'Montserrat, sans-serif',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  width: '87%',
}));

export default function BasicStack() {
  return (
    
    <Box
      mt={2}
      mb={3}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      
      <Stack spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '90%' }}
        >
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              color: 'black',
              fontWeight: 'light',
              fontSize: '1rem',
            }}
          >
            Today's Performance
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
            See all
          </Typography>
        </Box>

        {data.map((item, index) => (
          <Item key={`${item.symbol}-${index}`}>
            {/* Sol: Logo ve metinler */}
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src={item.logo}
                alt={item.symbol}
                style={{  borderRadius: '50%' }}
              />
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color={'black'}
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {item.symbol}
                </Typography>
                <Typography
                  variant="body2"
                  color={'green'}
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {item.value} 
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontWeight: 'light',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {item.price}
                </Typography>
              </Box>
            </Box>

            {/* Sağ: Earn kutusu ve ok */}
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  bgcolor: '#e0f7fa',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  sx={{
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {item.earn}
                </Typography>
              </Box>
              <ArrowForwardIosIcon color="action" fontSize="small" />
            </Box>
          </Item>
        ))}
      </Stack>
    </Box>
  );
}
