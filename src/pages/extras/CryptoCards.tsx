import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

interface TokenData {
  symbol: string;
  price: string;
  change: string;
  logo: string;
}

const CryptoCards: React.FC = () => {
  const [tokenData, setTokenData] = useState<TokenData[]>([
    { symbol: "BTC", price: "None", change: "None", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    { symbol: "ETH", price: "None", change: "None", logo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCETH--big.svg" },
    { symbol: "TON", price: "None", change: "None", logo: "https://cryptologos.cc/logos/toncoin-ton-logo.png" },
  ]);
  const [loading] = useState(true);

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
  });

  // Fiyat formatlama fonksiyonu
  const formatPrice = (price: string) => {
    const number = parseFloat(price);
    return isNaN(number)
      ? "None"
      : new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
  };

  // API'den fiyatları güncelleme fonksiyonu
  const fetchCryptoData = async () => {
    try {
      const symbols = ["BTCUSDT", "ETHUSDT", "TONUSDT"];
      const responses = await Promise.all(
        symbols.map((symbol) =>
          axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        )
      );

      const data = responses.map((res, index) => ({
        symbol: symbols[index].replace("USDT", ""),
        price: formatPrice(res.data.lastPrice),
        change: parseFloat(res.data.priceChangePercent).toFixed(2),
        logo: tokenData[index].logo,
      }));

      setTokenData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // İlk veri yükleme ve periyodik güncelleme
  useEffect(() => {
    fetchCryptoData(); // İlk veri yükleme

    const intervalId = setInterval(fetchCryptoData, 5000); // Her 5 saniyede bir veri güncelle
    return () => clearInterval(intervalId); // Temizlik işlemi
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        sx={{
          overflowX: "auto", // Taşma durumunda yatay kaydırma
          gap: 1, // Kartlar arasında boşluk
        }}
      >
        {tokenData.map((token) => (
          <Card
            key={token.symbol}
            sx={{
              minWidth: "120px",
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            <CardContent>
              {/* Üst Satır (Logo, Sembol, Yüzdelik) */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={-1} mt={-1}>
                {/* Logo */}
                <Box sx={{ marginLeft: -1, marginRight: 0.5, marginTop: 0.6 }}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={token.logo}
                    alt={`${token.symbol} logo`}
                    width="18"
                    height="18"
                  />
                </Box>
                {/* Sembol */}
                <Box>
                  <Typography component="span" sx={{ fontSize: "0.9rem" }}>
                    {token.symbol}
                  </Typography>
                </Box>
                {/* Yüzdelik değişim */}
                <Box sx={{ flex: "0 0 auto", textAlign: "left", marginLeft: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                    }}
                    variant="body2"
                    color={token.change !== "None" && parseFloat(token.change) >= 0 ? "green" : "red"}
                  >
                    {token.change}%
                  </Typography>
                </Box>
              </Box>
              {/* Alt Satır (Fiyat) */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginTop: 1,
                  marginLeft: -3,
                  marginBottom: -2,
                  color: token.change !== "None" && parseFloat(token.change) >= 0 ? "green" : "red",
                }}
              >
                {token.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default CryptoCards;
