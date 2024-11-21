import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Paper, Grid, Slider } from "@mui/material";

const Calculator: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(10000); // Varsayılan başlangıç değeri
  const [results, setResults] = useState<
    { label: string; earnings: string; profitOnly: string }[]
  >([]);

  const percentages = {
    "1 Day": 0.0009,
    "7 Days": 0.006,
    "30 Days": 0.016,
    "365 Days": 0.024,
  };

  // Binlik ayracı ekleme
  const formatNumber = (num: number): string =>
    num.toLocaleString("en-US");

  const calculateResults = () => {
    const value = sliderValue;
    const newResults = Object.entries(percentages).map(([label, percentage]) => {
      const days = parseInt(label.split(" ")[0]);
      const dailyEarnings = value * percentage;
      const periodEarnings = dailyEarnings * days;
      const totalEarnings = (periodEarnings + value).toFixed(2);
      const profitOnly = periodEarnings.toFixed(2);

      return {
        label,
        earnings: `$${formatNumber(Number(totalEarnings))}`,
        profitOnly: `$${formatNumber(Number(profitOnly))}`,
      };
    });

    setResults(newResults);
  };

  // Slider hareket ettikçe ve TextField değiştikçe hesaplamaları güncelle
  useEffect(() => {
    calculateResults();
  }, [sliderValue]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

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
      >
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: "black",
            fontWeight: "light",
            fontSize: "1rem",
          }}
        >
          Estimated Earnings
        </Typography>
        <Typography
          color="primary"
          component="a"
          href="#"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "0.8rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
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
        {/* TextField */}
        <Box borderRadius={3} mb={5}   border={1}  sx={{               backgroundColor: '#1e2a3a',
   }}>
          <Box mb={-2} >
          <TextField
            value={`${formatNumber(sliderValue)}  USDT`}
            fullWidth
          
            variant="outlined"
            size="medium"
            sx={{
              backgroundColor: '#1e2a3a',
              borderRadius: "20px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderWidth: "0px",
                  color:'white',

                },
                "&:hover fieldset": {
                },
                "&.Mui-focused fieldset": {
                },
              },
              "& .MuiInputBase-root": {
                color:'white',

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
                </Box>
              ),
              readOnly: false, // Kullanıcı manuel giriş yapamaz
            }}
          />
        </Box>

        {/* Slider */}
        <Box  mb={-3} sx={{}}>
        <Slider
  value={sliderValue}
  onChange={handleSliderChange}
  min={1000}
  max={10000}
  step={10}
  valueLabelDisplay="auto"
  sx={{
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    height: 48, // Yüksekliği artır
    "& .MuiSlider-track": {
      height: 58, // Çubuğun yüksekliğini artır
      minWidth: 50,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    "& .MuiSlider-rail": {
      height: 58, // Arkaplan çubuğu yüksekliği
    },
    // Thumb'ı görünmez yap
    "& .MuiSlider-thumb": {
      display: "none",
      minWidth: 100,

    },
  }}
/>

        </Box>
        </Box>

        {/* Earnings Results */}
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
                    {result.profitOnly}
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
                    {result.earnings}
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
