import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // React Router'dan navigate'i import ediyoruz
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Sol ok simgesi

// Tip tanımlamaları
type Period = "7D" | "14D" | "30D" | "90D" | "1Y";

const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("100"); // Varsayılan değer 100
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("7D");
  const [result, setResult] = useState<string>("");
  const [total, setTotal] = useState<string>("");
  const [percentageIncrease, setPercentageIncrease] = useState<string>("");

  const navigate = useNavigate(); // useNavigate Hook'u

  useEffect(() => {
    calculateResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, selectedPeriod]);

  const calculateResult = (): void => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("Lütfen geçerli bir sayı girin!");
      setTotal("");
      setPercentageIncrease("");
      return;
    }

    let percentage: number = 0;
    let multiplier: number = 0;

    switch (selectedPeriod) {
      case "7D":
        percentage = 0.006;
        multiplier = 7;
        break;
      case "14D":
        percentage = 0.012;
        multiplier = 14;
        break;
      case "30D":
        percentage = 0.016;
        multiplier = 30;
        break;
      case "90D":
        percentage = 0.018;
        multiplier = 90;
        break;
      case "1Y":
        percentage = 0.024;
        multiplier = 365;
        break;
      default:
        break;
    }

    const calculatedResult = value * percentage * multiplier;
    const calculatedTotal = value + calculatedResult;

    // Yüzde artış hesaplama
    const increase = ((calculatedResult / value) * 100).toFixed(2);

    setResult(calculatedResult.toFixed(2));
    setTotal(calculatedTotal.toFixed(2));
    setPercentageIncrease(increase); // Yüzde artışı ayarla
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
      }}
    >
      {/* Sol ok butonu */}
      <Box
        sx={{
            fontFamily: 'Montserrat, sans-serif',

          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: "20px", 
        }}
        onClick={() => navigate('/vite-react-router')} // Yönlendirme
      >
        <ArrowBackIcon  sx={{color:"black", fontSize: 30, marginRight: "10px" }} /> {/* Sol ok simgesi */}
        <Typography color={"black"} variant="h6" sx={{              fontFamily: 'Montserrat, sans-serif',
}}>Calculator</Typography>
      </Box>

      <TextField
        label=" Input Amount "
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{       fontSize:'2rem'   ,    fontFamily: 'Montserrat, sans-serif',
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2px",
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'bold',
        }}
      >
        {(["7D", "14D", "30D", "90D", "1Y"] as Period[]).map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "contained" : "outlined"}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </Button>
        ))}
      </Box>
      <Typography
        variant="body1"
        color="textPrimary"
        sx={{
            fontFamily: 'Montserrat, sans-serif',

          backgroundColor: "#e0f7fa",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Last Amount ${total || "Henüz bir işlem yapılmadı."}
      </Typography>
      <Typography
        variant="body1"
        color="textPrimary"
        sx={{
            fontFamily: 'Montserrat, sans-serif',

          backgroundColor: "#e8f5e9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        APY {percentageIncrease ? `${percentageIncrease}%` : "Henüz bir işlem yapılmadı."}
      </Typography>
      <Typography
        variant="h6"
        color="secondary"
        sx={{
            fontFamily: 'Montserrat, sans-serif',

          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Net Profit ${result || "Henüz bir işlem yapılmadı."}
      </Typography>
    </Box>
  );
};

export default Calculator;
