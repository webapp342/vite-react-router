import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const logos = {
  SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  SUI: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=035',
  XRP: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
};

type SymbolType = keyof typeof logos; // 'SOL' | 'SUI' | 'XRP'

const data: { symbol: SymbolType; value: string; price: string }[] = [
  { symbol: 'SOL', value: '0.23444444', price: '$1,284.3721' },
  { symbol: 'SUI', value: '1.12345678', price: '$345.6789' },
  { symbol: 'XRP', value: '42.00000000', price: '$23,456.1234' },
  { symbol: 'SOL', value: '0.23444444', price: '$1,284.3721' },
  { symbol: 'SUI', value: '1.12345678', price: '$345.6789' },
  { symbol: 'XRP', value: '42.00000000', price: '$23,456.1234' },
  { symbol: 'SOL', value: '0.23444444', price: '$1,284.3721' },
  { symbol: 'SUI', value: '1.12345678', price: '$345.6789' },
  { symbol: 'XRP', value: '42.00000000', price: '$23,456.1234' },
  { symbol: 'SOL', value: '0.23444444', price: '$1,284.3721' },
  { symbol: 'SUI', value: '1.12345678', price: '$345.6789' },
  { symbol: 'XRP', value: '42.00000000', price: '$23,456.1234' },
];

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  width: '90%',
}));

export default function BasicStack() {
  return (
    <Box
      mt={2}
      mb={3}
      sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Stack spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
        {data.map((item, index) => (
          <Item key={`${item.symbol}-${index}`}>
            {/* Sol: Logo ve metinler */}
            <Box display="flex" alignItems="center" gap={2}>
              <img
                src={logos[item.symbol]}
                alt={item.symbol}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.symbol}
                </Typography>
                <Typography variant="body2">
                  {item.value} {item.symbol}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({item.price})
                </Typography>
              </Box>
            </Box>

            {/* Sağ: Earn kutusu ve ok */}
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  bgcolor: '#e0f7fa',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="primary">
                  Earn 3%
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
