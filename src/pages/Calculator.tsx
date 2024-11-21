import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography, Paper, Slider, TextField, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const Calculator: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(1000); // Varsayılan başlangıç değeri
  const [results, setResults] = useState<
    { asset: string; earnings: string; profitOnly: string }[]
  >([]);

  // Asset bazlı yüzdeler
  const percentages = useMemo(
    () => ({
      SILVER: 0.009,
      GOLD: 0.012,
     SPX: 0.015,
      BTC: 0.02,
      ETH: 0.02,
    }),
    []
  );

  // Varlık logoları
  const assetLogos: Record<string, string> = {
    SILVER: "https://s3-symbol-logo.tradingview.com/metal/silver--big.svg", // Logoların doğru yolunu ekleyin
    GOLD: "https://s3-symbol-logo.tradingview.com/metal/gold--big.svg",
    SPX: "https://s3-symbol-logo.tradingview.com/indices/s-and-p-500--big.svg",
    BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    ETH: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg",
  };

  const Item = styled(Paper)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    fontFamily: "Montserrat, sans-serif",
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    borderRadius: theme.spacing(2),
    width: "87%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(2),
  }));

  // Sabit yüzdeler
  const fixedPercentages = {
    GOLD: "311%",
    SILVER: "140%",
    SPX: "173%",
    BTC: "912%",
    ETH: "912%",
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

  const formatNumber = (num: number): string => num.toLocaleString("en-US");

  const calculateResults = useCallback(() => {
    const value = sliderValue;
    const newResults = Object.entries(percentages).map(([asset, percentage]) => {
      const profitOnly = (value * percentage).toFixed(2);
      const totalEarnings = (value + Number(profitOnly)).toFixed(2);

      return {
        asset,
        earnings: `$${formatNumber(Number(totalEarnings))}`,
        profitOnly: `${formatNumber(Number(profitOnly))} USDT`,
      };
    });

    setResults(newResults);
  }, [sliderValue, percentages]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    setSliderValue(Math.max(newValue as number, 10));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m={1}>
      <Typography
  textAlign="center"
  color={'black'}
  variant="h5"
  gutterBottom
>
  Put your{' '}
  <span
    style={{
      background: 'linear-gradient(90deg, #031340, #08AEEA)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    liquidity
  </span>{' '}
  at work
</Typography>


        <Paper elevation={3} sx={{ borderRadius: 3, p: 0, mb: 3, backgroundColor: "#1e2a3a" }}>
          <Box mb={-2}>
            <Box display={"flex"} color={"white"} justifyContent={"space-between"}>
              <Typography sx={{ fontSize: "1rem", fontWeight: "light" }} mb={-2} p={2}>
                Invest
              </Typography>
              <Typography sx={{color:"lightblue", fontSize: "1rem" }} mb={-2} p={2}>
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
                readOnly: true,
              }}
            />
          </Box>

          <Box borderRadius={3}>
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                mt: 3,
                width: "100%",
                "& .MuiSlider-track": {
                  height: "130%",
                  borderBottomRightRadius: 12,
                  borderBottomLeftRadius: 12,
                },
                "& .MuiSlider-rail": {
                  height: "130%",
                  borderBottomRightRadius: 12,
                  borderBottomLeftRadius: 12,
                },
                "& .MuiSlider-thumb": {
                  height: 20,
                  width: 20,
                  transform: "translate(-140%, -50%)",
                  backgroundColor: "#fff",
                  boxShadow: "0px 0px 0px 6px rgba(255, 255, 255, 0.2)",
                  "&:focus, &:hover, &.Mui-active": {
                    boxShadow: "0px 0px 0px 8px rgba(255, 255, 255, 0.2)",
                  },
                },
              }}
            />
          </Box>
        </Paper>

        <Stack spacing={1} sx={{ alignItems: "center" }}>
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "95%" }}
          >
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "black",
                fontWeight: "light",
                fontSize: "1rem",
              }}
            >
              Asset
            </Typography>
            <Typography color={"black"}>Daily Earn</Typography>
            <Typography color={"black"}>Yield</Typography>
          </Box>

          {results.map((row, index) => (
            <Item key={index}>
              <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                <img
                  src={assetLogos[row.asset]}
                  alt={row.asset}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color={"black"}
                >
                  {row.asset}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color={"text.secondary"}>
                  {row.profitOnly}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  sx={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {fixedPercentages[row.asset as keyof typeof fixedPercentages]}
                </Typography>
              </Box>
            </Item>
          ))}
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Calculator;
