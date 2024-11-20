import React, { useState, useEffect } from "react";
import {
  TextField,
  Card,
  Typography,
  SwipeableDrawer,
  List,
  ListItem,
  IconButton,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const TokenSwap: React.FC = () => {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromTokenPrice, setFromTokenPrice] = useState<number>(0);
  const [toTokenPrice, setToTokenPrice] = useState<number>(1); // USDT price is always 1
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedTokenType, setSelectedTokenType] = useState<"from" | "to">(
    "from"
  );

  const [allTokenPrices, setAllTokenPrices] = useState<any>({});

  const tokens = [
    { name: "ETH", icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg" },
    { name: "USDT", icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg" },
    { name: "BTC", icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC--big.svg" },
    { name: "SUI", icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCSUI--big.svg" },
    { name: "SOL", icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCSOL--big.svg" },
  ];

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

  // Binance API'den fiyatları al
  const fetchTokenPrice = async (token: string) => {
    if (token === "USDT") {
      return 1; // USDT fiyatı sabit
    }

    try {
      const response = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
        params: { symbol: `${token}USDT` },
      });
      return parseFloat(response.data.price);
    } catch (error) {
      console.error("Error fetching price:", error);
      return 0;
    }
  };

  useEffect(() => {
    const getPrices = async () => {
      const prices: any = {};
      for (const token of tokens) {
        prices[token.name] = await fetchTokenPrice(token.name);
      }
      setAllTokenPrices(prices);
      setFromTokenPrice(prices[fromToken] || 0);
      setToTokenPrice(prices[toToken] || 0);
    };
    getPrices();
  }, [fromToken, toToken]);

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Burada tip genişletildi
    type: "from" | "to"
  ) => {
    const inputValue = e.target.value;
  
    // Eğer giriş boşsa, diğer alanı da boş yap
    if (inputValue === "") {
      if (type === "from") {
        setFromAmount("");
        setToAmount("");
      } else {
        setToAmount("");
        setFromAmount("");
      }
      return; // Hesaplama yapılmasını engellemek için buradan çık
    }
  
    const amount = parseFloat(inputValue) || 0;
  
    if (type === "from") {
      setFromAmount(inputValue);
      const amountInUSD = amount * fromTokenPrice;
      const toCalculatedAmount = amountInUSD / toTokenPrice;
      setToAmount(toCalculatedAmount.toFixed(4));
    } else {
      setToAmount(inputValue);
      const amountInUSD = amount * toTokenPrice;
      const fromCalculatedAmount = amountInUSD / fromTokenPrice;
      setFromAmount(fromCalculatedAmount.toFixed(4));
    }
  };
  
  const handleTokenSelect = (token: { name: string; icon: string }) => {
    if (selectedTokenType === "from") {
      setFromToken(token.name);
    } else {
      setToToken(token.name);
    }

    // Tüm girişleri sıfırla
    setFromAmount("");
    setToAmount("");

    setOpenDrawer(false);
  };

  const handleTokenSwapInline2 = () => {
    // Token'lerin yerlerini değiştir
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    // Miktarları sıfırla
    setFromAmount("");
    setToAmount("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Card
          sx={{
            padding: 3,
            borderRadius: 3,
            boxShadow: 4,
            background: "linear-gradient(to bottom, #ffffff, #f5f5f5)",
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Token Swap
          </Typography>

          <Grid container spacing={3} alignItems="center">
            {/* From Token Section */}
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  boxShadow: 2,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#fafafa",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={() => {
                    setSelectedTokenType("from");
                    setOpenDrawer(true);
                  }}
                >
                  <Avatar
                    src={tokens.find((t) => t.name === fromToken)?.icon}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Typography variant="body1">{fromToken}</Typography>
                </Box>

                <TextField
                  type="numeric"
                  value={fromAmount}
                  onChange={(e) => handleAmountChange(e, "from")}
                  fullWidth
            
                />
              </Card>
            </Grid>

            {/* Swap Icon Between */}
            <Grid item xs={12} textAlign="center">
              <IconButton
                color="primary"
                onClick={handleTokenSwapInline2}
                sx={{
                  backgroundColor: "#f5f5f5",
                  border: "2px solid #ddd",
                  padding: 1,
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <SwapHorizIcon fontSize="large" />
              </IconButton>
            </Grid>

            {/* To Token Section */}
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  boxShadow: 2,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  backgroundColor: "#fafafa",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: "#f5f5f5",
                  }}
                  onClick={() => {
                    setSelectedTokenType("to");
                    setOpenDrawer(true);
                  }}
                >
                  <Avatar
                    src={tokens.find((t) => t.name === toToken)?.icon}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Typography variant="body1">{toToken}</Typography>
                </Box>

                <TextField
                  type="numeric"
                  value={toAmount}
                  onChange={(e) => handleAmountChange(e, "to")}
                  fullWidth
                
                />
              </Card>
            </Grid>
          </Grid>

          {/* Swipeable Drawer with Token List */}
          <SwipeableDrawer
            anchor="bottom"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            onOpen={() => setOpenDrawer(true)}
          >
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              <List>
                {tokens.map((token) => (
                  <ListItem
                    button
                    key={token.name}
                    onClick={() => handleTokenSelect(token)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingY: 1.5,
                      paddingX: 2,
                      backgroundColor: "#f9f9f9",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={token.icon}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="body1">{token.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      ${allTokenPrices[token.name]?.toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </SwipeableDrawer>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default TokenSwap;
