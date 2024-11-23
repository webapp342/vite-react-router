import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

interface TradingViewWidgetProps {
  width?: string;
  height?: string;
  colorTheme?: "light" | "dark";
  isTransparent?: boolean;
  importanceFilter?: string; // Örneğin "0,1,2"
  countryFilter?: string; // Örneğin "us,gb,tr"
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  width = "100%",
  height = "900px",
  colorTheme = "light",
  isTransparent = true,
  importanceFilter = "0,1",
  countryFilter = "us,gb,tr",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;

    // Widget configuration as JSON string
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "100%",
      "colorTheme": "light",
      "isTransparent": true,
            locale: "en",
      importanceFilter,
      countryFilter,
    });

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [colorTheme, isTransparent, importanceFilter, countryFilter]);

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
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

export default TradingViewWidget;
