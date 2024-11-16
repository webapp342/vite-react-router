import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Avatar,
} from '@mui/material';

interface TickerResponse {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  volume: string;
}

interface MarketData {
  symbol: string;
  price: string;
  volume: string;
  priceChangePercent: string;
  marketCap: number;
}

const logos: Record<string, string> = {
  BTC: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  ETH: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  USDT: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  BNB: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  SOL: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  SUI: 'https://cryptologos.cc/logos/sui-token-logo.png',
  XRP: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
};

const allowedSymbols = [
  //"BTCUSDT", "ETHUSDT",
   "BNBUSDT", "SOLUSDT", "SUIUSDT", "XRPUSDT"];

const getBaseSymbol = (pair: string) => pair.replace('USDT', '');

const MetalsTable: React.FC = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get<TickerResponse[]>('https://api.binance.com/api/v3/ticker/24hr');
        const usdtMarkets = response.data.filter(item =>
          item.symbol.endsWith('USDT') && allowedSymbols.includes(item.symbol) // Sadece izin verilenler
        );
        const marketData: MarketData[] = usdtMarkets.map(item => ({
          symbol: item.symbol,
          price: item.lastPrice,
          volume: item.volume,
          priceChangePercent: item.priceChangePercent,
          marketCap: parseFloat(item.lastPrice) * parseFloat(item.volume),
        }));

        setMarkets(marketData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarkets();
    const intervalId = setInterval(fetchMarkets, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      zIndex={1000}
      justifyContent="space-between"
      alignItems="center"
      sx={{ boxSizing: 'border-box' }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                {/* <TableCell
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: 'none',
                    textAlign: 'left',
                  }}
                >
                  İşlem Çifti
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: 'none',
                    textAlign: 'right',
                  }}
                >
                  Son Fiyat (USD)
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {markets.map((market) => {
                const priceChangePercent = parseFloat(market.priceChangePercent);
                const changeColor = priceChangePercent > 0 ? 'green' : priceChangePercent < 0 ? 'red' : 'black';
                const baseSymbol = getBaseSymbol(market.symbol);

                return (
                  <TableRow
                    key={market.symbol}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f6f5f0' },
                      '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                      '&:hover': { backgroundColor: '#e3f2fd' },
                      borderBottom: 'none',
                    }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={logos[baseSymbol]}
                        alt={baseSymbol}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body1" component="div">
                          {market.symbol}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontSize: '0.8rem', color: 'gray' }}
                        >
                          {baseSymbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'right' }}>
                      <Box>
                        <Typography variant="body1" component="span">
                          ${parseFloat(market.price).toLocaleString()}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            fontSize: '0.8rem',
                            color: changeColor,
                          }}
                        >
                          {priceChangePercent.toFixed(2)}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MetalsTable;
