import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Stack,
  Avatar,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [fromTokenPrice, setFromTokenPrice] = useState<number>(0);
  const [toTokenPrice, setToTokenPrice] = useState<number>(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTokenType, setSelectedTokenType] = useState<'from' | 'to'>('from');
  const [receivedAmount, setReceivedAmount] = useState<number | null>(null);

  const tokens = [
    { name: 'ETH', icon: '/path/to/eth-icon.png' },
    { name: 'USDT', icon: '/path/to/usdt-icon.png' },
    { name: 'BTC', icon: '/path/to/btc-icon.png' },
    { name: 'SUI', icon: '/path/to/sui-icon.png' },
    { name: 'SOL', icon: '/path/to/sol-icon.png' }
  ];

  const theme = useTheme();

  const generateRandomPrices = () => {
    setFromTokenPrice(Number((Math.random() * 100).toFixed(2)));
    setToTokenPrice(Number((Math.random() * 100).toFixed(2)));
  };

  useEffect(() => {
    generateRandomPrices();
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);

    const amountValue = parseFloat(inputAmount);
    if (!isNaN(amountValue) && fromTokenPrice > 0 && toTokenPrice > 0) {
      const amountInUSD = amountValue * fromTokenPrice;
      const received = amountInUSD / toTokenPrice;
      setReceivedAmount(received);
    } else {
      setReceivedAmount(null);
    }
  };

  const handleSwap = () => {
    console.log(`Swapping ${amount} ${fromToken} for ${receivedAmount} ${toToken}`);
  };

  const handleTokenSelect = (token: { name: string; icon: string }) => {
    if (selectedTokenType === 'from') {
      setFromToken(token.name);
    } else {
      setToToken(token.name);
    }
    setOpenDrawer(false);
    generateRandomPrices();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: 2
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          padding: 3,
          borderRadius: 3,
          boxShadow: 3
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Token Swap
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSelectedTokenType('from');
                setOpenDrawer(true);
              }}
              startIcon={
                <Avatar src={tokens.find((t) => t.name === fromToken)?.icon} />
              }
            >
              {fromToken}
            </Button>
          </Box>

          <IconButton
            sx={{ alignSelf: 'center' }}
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
              generateRandomPrices();
            }}
          >
            <SwapHorizIcon />
          </IconButton>

          <Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSelectedTokenType('to');
                setOpenDrawer(true);
              }}
              startIcon={
                <Avatar src={tokens.find((t) => t.name === toToken)?.icon} />
              }
            >
              {toToken}
            </Button>
          </Box>

          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
          />

          <Typography>
            Price of {fromToken}: {fromTokenPrice} USD
          </Typography>
          <Typography>
            Price of {toToken}: {toTokenPrice} USD
          </Typography>

          <Button variant="contained" onClick={handleSwap}>
            Swap
          </Button>

          {receivedAmount !== null && (
            <Typography textAlign="center" mt={2}>
              You will receive: {receivedAmount.toFixed(4)} {toToken}
            </Typography>
          )}
        </Stack>

        <SwipeableDrawer
  anchor="bottom"
  open={openDrawer}
  onClose={() => setOpenDrawer(false)}
  onOpen={() => setOpenDrawer(true)} // Burada eksik olan 'onOpen' ekleniyor
>
  <Box sx={{ padding: 2 }}>
    <IconButton onClick={() => setOpenDrawer(false)}>
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" gutterBottom>
      Select Token
    </Typography>
    <List>
      {tokens.map((token) => (
        <ListItem button key={token.name} onClick={() => handleTokenSelect(token)}>
          <Avatar src={token.icon} sx={{ marginRight: 2 }} />
          <ListItemText primary={token.name} />
        </ListItem>
      ))}
    </List>
  </Box>
</SwipeableDrawer>

      </Card>
    </Box>
  );
};

export default TokenSwap;
