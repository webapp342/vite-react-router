import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import goldLogo from '../assets/gold.png';
import silverLogo from '../assets/silver.png';
import copperLogo from '../assets/cooper.png';
import aluminiumLogo from '../assets/aluminum.png';
import nickelLogo from '../assets/nickel.png';
import palladiumLogo from '../assets/pl.png';

interface MetalData {
  symbol: string;
  price: string;
  priceChangePercent: string;
}

const logos: Record<string, string> = {
  Gold: goldLogo,
  Silver: silverLogo,
  Palladium: palladiumLogo,
  Nickel: nickelLogo,
  Aluminium: aluminiumLogo,
  Copper: copperLogo,
};

const MetalsTable: React.FC = () => {
  const [metals, setMetals] = useState<MetalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMetalsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'metals'));
      const metalsData: MetalData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        metalsData.push({
          symbol: doc.id,
          price: data.price || '0',
          priceChangePercent: data.priceChangePercent || '0',
        });
      });

      const sortedMetals = metalsData.sort((a, b) => {
        const order = ['Gold', 'Silver', 'Aluminium', 'Nickel', 'Copper', 'Palladium'];
        return order.indexOf(a.symbol) - order.indexOf(b.symbol);
      });

      setMetals(sortedMetals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetalsData();
    const intervalId = setInterval(fetchMetalsData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const mapSymbolToMarketSymbol = (symbol: string) => {
    const mapping: Record<string, string> = {
      Gold: 'XAU/USD',
      Silver: 'XAG/USD',
      Palladium: 'XPD/USD',
      Nickel: 'XNI/USD',
      Aluminium: 'XAL/USD',
      Copper: 'XCU/USD',
    };
    return mapping[symbol] || symbol;
  };

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
                <TableCell
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 'bold',
                    borderBottom: 'none',
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
                    borderBottom: 'none',
                    textAlign: 'right',
                  }}
                >
                  Price (USD) & Change
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metals.map((metal) => {
                const priceChangePercent = parseFloat(metal.priceChangePercent);
                const changeColor = priceChangePercent > 0 ? 'green' : priceChangePercent < 0 ? 'red' : 'black';
                const logo = logos[metal.symbol];
                const marketSymbol = mapSymbolToMarketSymbol(metal.symbol);

                return (
                  <TableRow
                    key={metal.symbol}
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
                        src={logo}
                        alt={metal.symbol}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body1" component="div">
                          {metal.symbol}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontSize: '0.8rem', color: 'gray' }}
                        >
                          {marketSymbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: 'none',
                        textAlign: 'right',
                      }}
                    >
                      <Typography variant="body1" component="span">
                        ${parseFloat(metal.price).toLocaleString()}
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
