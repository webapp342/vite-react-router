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
  imgUrl: string; // Logo URL'si
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

        // Verileri piyasa değerine göre sıralayın ve en yüksek 50'yi seçin
        const sortedCryptos = response.data
          .sort((a: CryptoData, b: CryptoData) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 50);

        // Her kripto para için logo URL'si ekleyin
        const cryptosWithLogos = sortedCryptos.map((crypto: CryptoData) => ({
          ...crypto,
          imgUrl: `https://cryptoicons.org/api/icon/${crypto.symbol.toLowerCase()}/200`, // Logo URL'si
        }));

        setCryptos(cryptosWithLogos);
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
              {cryptos.map((crypto: CryptoData, index: number) => (
                <TableRow key={crypto.symbol}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={crypto.imgUrl}
                      alt={`${crypto.symbol} logo`}
                      style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    />
                    {crypto.symbol}
                    <div style={{ fontSize: '0.8em', color: '#888' }}>
                      ${parseFloat(crypto.quoteVolume).toLocaleString()}
                    </div>
                  </TableCell>
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