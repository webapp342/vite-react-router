import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TradingViewWidgetHorizontal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // React Router'ın navigate fonksiyonu

  useEffect(() => {
    if (!containerRef.current) return;

    // Widget script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    // Widget configuration
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "regular",
      colorTheme: "light",
      locale: "en",
    });

    containerRef.current.appendChild(script);

    return () => {
      // Clean up script on component unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  const handleClick = () => {
    navigate("/vite-react-router/user-profile-page");
  };

  return (
    <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
      {/* TradingView Widget */}
      <Box ref={containerRef} />

      {/* Görünmez Kaplama */}
      <Box
        onClick={handleClick} // Tıklama olayını yakalar
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1, // Kaplamayı widget'ın üstüne yerleştirir
          cursor: "pointer", // El işareti gösterir
          backgroundColor: "transparent", // Kaplama görünmez olur
        }}
      />
    </Box>
  );
};

export default TradingViewWidgetHorizontal;
