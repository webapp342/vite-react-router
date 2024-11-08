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
  priceChangePercent: string;
  lastPrice: string;
  quoteVolume: string; // Piyasa değeri için hacim
}

const CryptoTable: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        // Binance API'den piyasa verilerini al
        const response = await axios.get(
          'https://api.binance.com/api/v3/ticker/24hr'
        );

        // Verileri piyasa değerine göre sıralayın ve en yüksek 10'u seçin
        const sortedCryptos = response.data
          .sort((a: CryptoData, b: CryptoData) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 10);

        setCryptos(sortedCryptos);
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
      <h2>En Yüksek Piyasa Değerine Sahip Kripto Para Çiftleri</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Kripto Para Çifti</TableCell>
                <TableCell>Son Fiyat (USD)</TableCell>
                <TableCell>24 Saat Değişim (%)</TableCell>
                <TableCell>Piyasa Hacmi (24h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos.map((crypto, index) => (
                <TableRow key={crypto.symbol}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell>${parseFloat(crypto.lastPrice).toLocaleString()}</TableCell>
                  <TableCell>{parseFloat(crypto.priceChangePercent).toFixed(2)}%</TableCell>
                  <TableCell>${parseFloat(crypto.quoteVolume).toLocaleString()}</TableCell>
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