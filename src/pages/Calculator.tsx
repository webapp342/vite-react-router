import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Box,
  Typography,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const Calculator: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(10000); // Varsayılan başlangıç değeri
  const [results, setResults] = useState<
    { asset: string; earnings: string; profitOnly: string }[]
  >([]);

  // Asset bazlı yüzdeler
  const percentages = useMemo(
    () => ({
   
      SILVER: 0.009,
      GOLD: 0.012,
      FOREX: 0.015,
      CRYPTO: 0.02,
 
    }),
    []
  );

  // Sabit yüzdeler
  const fixedPercentages = {
    GOLD: "311%",
    SILVER: "140%",
    FOREX: "173%",
    CRYPTO: "912%",
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
    palette: {
      primary: { main: "#4caf50" },
      secondary: { main: "#ff9800" },
      background: { default: "#f5f5f5" },
    },
  });


  // Binlik ayracı ekleme
  const formatNumber = (num: number): string =>
    num.toLocaleString("en-US");

  // calculateResults fonksiyonunu useCallback ile sarmalıyoruz
  const calculateResults = useCallback(() => {
    const value = sliderValue;
    const newResults = Object.entries(percentages).map(([asset, percentage]) => {
      const profitOnly = (value * percentage).toFixed(2);
      const totalEarnings = (value + Number(profitOnly)).toFixed(2);

      return {
        asset,
        earnings: `$${formatNumber(Number(totalEarnings))}`,
        profitOnly: `${formatNumber(Number(profitOnly))}  USDT`,
      };
    });

    setResults(newResults);
  }, [sliderValue, percentages]);

  // Slider hareket ettikçe ve TextField değiştikçe hesaplamaları güncelle
  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  return (
    <ThemeProvider theme={theme}>

    <Box  m={1}>
      <Typography variant="h5" gutterBottom>
        Investment Calculator
      </Typography>
      <Paper elevation={3} sx={{borderRadius:3, p: 0, mb: 3, backgroundColor: "#1e2a3a" }}>
        <Box mb={-2}  >
          <Box 
          display={"flex"}
          color={"white"}
          justifyContent={"space-between"}
        
          >
          <Typography   sx={
            {                fontSize: "1.2rem",
              fontWeight: "light",
            }
          } mb={-2} p={2}>
          Invest
        </Typography>

        <Typography
          sx={
            {                fontSize: "1.2rem",
            }
          } mb={-2} p={2}>
          Use Max
        </Typography>
          </Box>
     
          <TextField
            value={`${formatNumber(sliderValue)} USDT`}
            fullWidth
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: "#1e2a3a",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderWidth: "0px",
                  color: "white",
                },
              },
              "& .MuiInputBase-root": {
                color: "white",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.5rem",
              },
            }}
            InputProps={{
              readOnly: false,
            }}
          />
        </Box>

        <Box borderRadius={3} >
    <Slider
      value={sliderValue}
      onChange={handleSliderChange}
      min={10}
      max={10000}
      step={10}
      valueLabelDisplay="auto"
      sx={{
        mt:3,
        width: "99.5%", // Genişliği tamamen Paper'a yapıştır
        "& .MuiSlider-track": {
          minWidth: 50,
          height: '130%',
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          borderTopRightRadius:0,
          borderTopLeftRadius:0,
        },
        "& .MuiSlider-rail": {
          height: '130%',

          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
          borderTopRightRadius:0,
          borderTopLeftRadius:0,
        },
        "& .MuiSlider-thumb": {
          height: 27,
          width: 27,
          marginLeft: sliderValue === 10 ? 6.5 : 0, // Sadece başlangıçta sol boşluk bırak
          transition: "margin-left 0.2s", // Akıcı geçiş için animasyon

          backgroundColor: '#fff',
          border: '1px solid currentColor',
        },
        '&:hover': {
          boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
      }}
    />
  </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Asset</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Profit</strong>
              </TableCell>
           
              <TableCell align="center">
                <strong>Fixed</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.asset}</TableCell>
                <TableCell align="center">{row.profitOnly}</TableCell>
                <TableCell align="center" sx={{ color: "green", fontWeight: "bold" }}>
                  {fixedPercentages[row.asset as keyof typeof fixedPercentages]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </ThemeProvider>

  );
};

export default Calculator;
