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

// Binance API'den dönen verilerin yapısını tanımlayın
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
  marketCap: number; // Piyasa değeri
}

const UsdtMarketTable: React.FC = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        // Binance API'den piyasa verilerini al
        const response = await axios.get<TickerResponse[]>('https://api.binance.com/api/v3/ticker/24hr');

        // USDT ile işlem görenleri filtreleyin
        const usdtMarkets = response.data.filter(item => item.symbol.endsWith('USDT'));

        // Market verilerini ayıklayın ve piyasa değerini hesaplayın
        const marketData: MarketData[] = usdtMarkets.map(item => ({
          symbol: item.symbol,
          price: item.lastPrice,
          volume: item.volume,
          priceChangePercent: item.priceChangePercent,
          marketCap: parseFloat(item.lastPrice) * parseFloat(item.volume), // Piyasa değerini hesaplayın
        }));

        // Piyasa değerine göre sıralayın
        const sortedMarkets = marketData.sort((a, b) => b.marketCap - a.marketCap);

        // İlk 100'ünü alın
        const top100Markets = sortedMarkets.slice(0, 100);

        setMarkets(top100Markets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarkets();

    // Fiyatları her 3 saniyede bir güncelle
    const intervalId = setInterval(fetchMarkets, 3000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container sx={{ mt: '180px' , textAlign: 'center'}} >
      <h2>
        TOP TOKENS
     </h2>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>İşlem Çifti</TableCell>
                <TableCell>Son Fiyat (USD)</TableCell>
                <TableCell>24 Saat Hacmi</TableCell>
                <TableCell>24 Saat Değişim (%)</TableCell>
                <TableCell>Piyasa Değeri (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {markets.map(market => (
                <TableRow key={market.symbol}>
                  <TableCell>{market.symbol}</TableCell>
                  <TableCell>${parseFloat(market.price).toLocaleString()}</TableCell>
                  <TableCell>{parseFloat(market.volume).toLocaleString()}</TableCell>
                  <TableCell>{parseFloat(market.priceChangePercent).toFixed(2)}%</TableCell>
                  <TableCell>${market.marketCap.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UsdtMarketTable;