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

interface CryptoData {
  symbol: string;
  price: string;
}

const CryptoTable: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        // Binance API'den fiyatları al
        const response = await axios.get(
          'https://api.binance.com/api/v3/ticker/price'
        );

        // İlk 10 kripto parayı almak için sadece ilk 10 elemanı seçiyoruz
        const topCryptos = response.data.slice(0, 10);
        setCryptos(topCryptos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptos();

    // Fiyatları her 3 saniyede bir güncelle
    const intervalId = setInterval(fetchCryptos, 3000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos.map((crypto, index) => (
                <TableRow key={crypto.symbol}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell>${parseFloat(crypto.price).toLocaleString()}</TableCell>
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