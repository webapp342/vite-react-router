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

// Metal verisi için tip tanımı
interface MetalData {
  symbol: string;
  name: string;
  price: number;
  logo: string;
}

// API yanıtı için tip tanımı
interface QuoteResult {
  symbol: string;
  regularMarketPrice: number;
}

// Metal sembolleri ve logoları
const metals: Record<string, { name: string; logo: string }> = {
  "XAUUSD=X": {
    name: "Gold (XAU)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Gold_bar_icon.svg",
  },
  "XAGUSD=X": {
    name: "Silver (XAG)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Silver_ingot_icon.svg",
  },
  "XPTUSD=X": {
    name: "Platinum (XPT)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Platinum_bar_icon.svg",
  },
  "XPDUSD=X": {
    name: "Palladium (XPD)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Palladium_bar_icon.svg",
  },
};

const MetalsTable: React.FC = () => {
  const [metalData, setMetalData] = useState<MetalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetals = async () => {
      try {
        setError(null); // Hata mesajını sıfırla
        const response = await axios.get<{ quoteResponse: { result: QuoteResult[] } }>(
          'https://query1.finance.yahoo.com/v7/finance/quote?symbols=XAUUSD=X,XAGUSD=X,XPTUSD=X,XPDUSD=X'
        );

        const fetchedMetals = response.data.quoteResponse.result;

        if (!fetchedMetals || fetchedMetals.length === 0) {
          setError('API’den veri alınamadı. Lütfen daha sonra tekrar deneyin.');
          return;
        }

        const formattedData: MetalData[] = fetchedMetals.map((item) => ({
          symbol: item.symbol,
          name: metals[item.symbol]?.name || item.symbol,
          price: item.regularMarketPrice,
          logo: metals[item.symbol]?.logo || "",
        }));

        setMetalData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching metal data:', error);
        setError('Veri yüklenirken bir hata oluştu. Lütfen bağlantınızı kontrol edin.');
        setLoading(false);
      }
    };

    fetchMetals();
    const intervalId = setInterval(fetchMetals, 3000); // Her 3 saniyede bir güncelleme

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                >
                  Metal
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}
                >
                  Fiyat (USD)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metalData.map((metal) => (
                <TableRow
                  key={metal.symbol}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f6f5f0' },
                    '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
                    '&:hover': { backgroundColor: '#e3f2fd' },
                  }}
                >
                  <TableCell
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      borderBottom: 'none',
                    }}
                  >
                    <Avatar
                      src={metal.logo}
                      alt={metal.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body1">{metal.name}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'right',
                      borderBottom: 'none',
                    }}
                  >
                    <Typography variant="body1">
                      ${metal.price.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MetalsTable;
