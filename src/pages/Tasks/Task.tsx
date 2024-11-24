import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // react-router-dom kullanarak yönlendirme

// Simulated data for the component
const data = [
  {
    symbol: "Join to TG Channel",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-telegram-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-company-pack-logos-icons-10388926.png?f=webp&w=256",
    value: "+ $1 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Follow on X",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-x-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-pack-logos-icons-10388931.png?f=webp&w=256",
    value: "+ $3 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Subscribe to Youtube Channel",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-company-pack-logos-icons-10388932.png?f=webp&w=256",
    value: "+ $3 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Join to Discord Channel",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-discord-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-pack-logos-icons-10388913.png?f=webp&w=256",
    value: "+ $1 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Follow on Facebook",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-facebook-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-pack-logos-icons-10388916.png?f=webp&w=256",
    value: "+ $1 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Follow on Instagram",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-instagram-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-pack-logos-icons-10388920.png?f=webp&w=256",
    value: "+ $1 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Follow on Tiktok",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-tiktok-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-company-pack-logos-icons-10388928.png?f=webp&w=256",
    value: "+ $3 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  {
    symbol: "Follow on Threads",
    logo: "https://cdn.iconscout.com/icon/free/png-512/free-threads-icon-download-in-svg-png-gif-file-formats--social-media-logo-technology-brand-pack-logos-icons-10388927.png?f=webp&w=256",
    value: "+ $1 USDT",
    valueLogo: "https://s3-symbol-logo.tradingview.com/crypto/XTVCUSDT--big.svg", // Ek logo
    price: "",
    earn: "Start",
    earnLink: "https://example.com/btc",
  },
  // Add more items as needed
];
const TopInvestors: React.FC = () => {
  const navigate = useNavigate(); // useNavigate hook'u

  const handleGoBack = () => {
    navigate("/vite-react-router/"); // Geri butonuna tıklandığında bu path'e yönlendir
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
     {/* Geri Butonu */}
<Box display="flex" justifyContent="flex-start" mb={2}>
  <Button
    onClick={handleGoBack}
    variant="outlined"
    size="small"
    sx={{
      color: "black", // Buton yazısı siyah
      borderColor: "black", // Sınır rengi siyah
      '&:hover': {
        borderColor: "black", // Hover durumunda da sınır rengi siyah kalacak
        backgroundColor: "transparent", // Hover durumunda arka plan şeffaf olacak
      },
    }}
  >
    Back
  </Button>
</Box>


      {/* Header */}
      <Box textAlign="center" mb={2}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
          }}
          color="black"
        >
          Tasks
        </Typography>

        <Typography
          variant="body2"
          color="black"
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Total earned amount
        </Typography>
        <Typography
          variant="body2"
          color="black"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "light",
          }}
        >
          $2000 USDT
        </Typography>
      </Box>

      {/* Performance Section */}
      <Box sx={{ justifyContent: "center" }}>
        <Stack spacing={1} mt={1} sx={{ width: "100%", alignItems: "center" }}>
          {/* Investor Items */}
          {data.map((item, index) => (
            <Box
              key={`${item.symbol}-${index}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                width: "100%",
                padding: 1,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Left: Logo and Details */}
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={item.logo}
                  alt={item.symbol}
                  style={{ width: "20%", height: '20%' }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 12,
                    }}
                  >
                    {item.symbol}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "green",
                      fontSize: 12,
                      mt: 0.5,
                      display: "flex",
                      alignItems: "center", // Metin ve logo hizalaması
                      gap: 0.5, // Aralarındaki boşluk
                    }}
                  >
                    {item.value}
                    <img
                      src={item.valueLogo}
                      alt="value-logo"
                      style={{ width: 18, height: 18, borderRadius: "50%" }}
                    />
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "text.secondary",
                      fontSize: 12,
                    }}
                  >
                    {item.price}
                  </Typography>
                </Box>
              </Box>

              {/* Right: Earn Button */}
              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  href={item.earnLink}
                  sx={{
                    bgcolor: "black",
                    textTransform: "none",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.earn}
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default TopInvestors;
