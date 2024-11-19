import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Paper, Grid } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("10,000"); // Varsayılan başlangıç değeri
  const [results, setResults] = useState<{ label: string; earnings: string; profitOnly: string }[]>([]);

  const percentages = {
    "1 Day": 0.0009,
    "7 Days": 0.006,
    "30 Days": 0.016,
    "365 Days": 0.024,
  };

  // Binlik ayracı ekleme
  const formatNumber = (num: number): string =>
    num.toLocaleString("en-US");

  // Girdiden ayracı kaldır ve sayıya dönüştür
  const parseNumber = (str: string): number =>
    parseFloat(str.replace(/,/g, "")) || 0;

  const calculateResults = () => {
    const value = parseNumber(inputValue);
    const newResults = Object.entries(percentages).map(([label, percentage]) => {
      const days = parseInt(label.split(" ")[0]);
      const dailyEarnings = value * percentage;
      const periodEarnings = dailyEarnings * days;
      const totalEarnings = (periodEarnings + value).toFixed(2);
      const profitOnly = periodEarnings.toFixed(2);

      return { label, earnings: `$${formatNumber(Number(totalEarnings))}`, profitOnly: `$${formatNumber(Number(profitOnly))}` };
    });

    setResults(newResults);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Virgülleri kaldır
    if (/^\d*$/.test(rawValue)) {
      setInputValue(formatNumber(parseNumber(rawValue))); // Sayıya çevir ve yeniden formatla
    }
  };

  useEffect(() => {
    calculateResults();
  }, [inputValue]);

  return (
    <Box
      maxWidth="xs"
      m={1}
      mt={2}
      sx={{
        borderRadius: "12px",
      }}
    >
      <Box
        mt={2}
        p={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{}}
      >
        <Typography
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            color: 'black',
            fontWeight: 'light',
            fontSize: '1rem',
          }}
        >
          Estimated Earnings
        </Typography>
        <Typography
          color="primary"
          component="a"
          href="#"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.8rem',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Learn more
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: "15px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ marginBottom: "15px" }}>
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                },
              },
              "& .MuiInputBase-root": {
                display: "flex",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.5rem",
                alignItems: "center",
              },
            }}
            InputProps={{
              startAdornment: (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AttachMoneyIcon sx={{ fontSize: "2rem", color: "black" }} />
                </Box>
              ),
            }}
          />
        </Box>

        {results.map((result, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif",
                    color: "#333",
                  }}
                >
                  {result.label} Earnings
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                    color: "#1976d2",
                  }}
                >
                  Last Amount
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1} sx={{ marginTop: "5px" }}>
              {/* Left Card - Only Profit */}
              <Grid item xs={6}>
                <Paper
                  elevation={1}
                  sx={{
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#e3f2fd",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#1976d2",
                    }}
                  >
                    {result.profitOnly} {/* Only profit */}
                  </Typography>
                </Paper>
              </Grid>

              {/* Right Card - Total Earnings */}
              <Grid item xs={6}>
                <Paper
                  elevation={1}
                  sx={{
                    padding: "8px",
                    textAlign: "center",
                    backgroundColor: "#e8f5e9",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#388e3c",
                    }}
                  >
                    {result.earnings} {/* Total earnings */}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};

export default Calculator;
