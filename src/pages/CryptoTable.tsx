import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'; // Ok simgeleri

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CryptoTable: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the initial data when the component is mounted
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptos();

    // Set an interval to update crypto data every 10 seconds
    const intervalId = setInterval(fetchCryptos, 10000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Price change color logic
  const getPriceChangeColor = (change: number): string => {
    return change > 0 ? 'green' : change < 0 ? 'red' : 'gray';
  };

  // Render icon based on the percentage change
  const renderChangeIcon = (change: number) => {
    if (change > 0) {
      return <MdArrowUpward style={{ color: 'green' }} />;
    } else if (change < 0) {
      return <MdArrowDownward style={{ color: 'red' }} />;
    } else {
      return null; // No change, no icon
    }
  };

  return (
    <Container>
      <h2>İlk 10 Kripto Para</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Kripto Para</TableCell>
                <TableCell>Simge</TableCell>
                <TableCell>Fiyat (USD)</TableCell>
                <TableCell>24 Saat Değişim (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos.map((crypto, index) => (
                <TableRow key={crypto.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{crypto.name}</TableCell>
                  <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
                  <TableCell>${crypto.current_price.toFixed(2)}</TableCell>
                  <TableCell
                    style={{
                      color: getPriceChangeColor(crypto.price_change_percentage_24h),
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ marginRight: 8 }}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                    {renderChangeIcon(crypto.price_change_percentage_24h)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CryptoTable;
