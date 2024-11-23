import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";

const News: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (!containerRef.current) return;
  
      // TradingView widget script
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.async = true;
  
      // Widget configuration as innerHTML
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: "110%", // Burada widget yüksekliğini tanımlıyoruz
        colorTheme: "light",
        "isTransparent": true,        locale: "en",
        importanceFilter: "0,1",
        countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
      });
  
      containerRef.current.appendChild(script);
  
      return () => {
        // Cleanup script on unmount
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }, []);
  
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "900px", // Sabit bir yükseklik kullanıyoruz
          overflow: "hidden",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        {/* TradingView Widget Container */}
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    );
  };
  
export default News;
