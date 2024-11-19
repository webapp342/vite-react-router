import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { green } from "@mui/material/colors";

// Helper function to generate a random 12-digit number
const generateRandomNumber = () => Math.floor(Math.random() * 1e12).toString().padStart(12, '0');

const profit = 623718.591; // Example profit value

// Component for a single investor item
const InvestorItem = ({
  avatarSrc,
  randomNumber,
  profit,
  rank,
}: {
  avatarSrc: string;
  randomNumber: string;
  profit: number;
  rank: number;
}) => (
    <ListItem
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #ddd",
      paddingLeft: 1.5, // Add small padding to the left
      paddingRight: 1.5, // Add small padding to the right
      width: "100%", // Ensure the item spans the full width of its container
      boxSizing: "border-box", // Include padding in width calculation
    }}
  >
  
    <ListItemAvatar>
      <Avatar src={avatarSrc} alt="Investor Avatar" sx={{ width: 40, height: 40 }} />
    </ListItemAvatar>
    <ListItemText
      primary={
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          color="black"
          variant="body1"
          fontWeight="bold"
        >
          {randomNumber}
        </Typography>
      }
      secondary={
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: green[500],
          }}
        >
          +${profit.toLocaleString(undefined, { minimumFractionDigits: 3 })}
        </Typography>
      }
    />
    <Typography
      color="black"
      sx={{
        fontFamily: "Montserrat, sans-serif",
      }}
      variant="h6"
      fontWeight="bold"
    >
      #{rank}
    </Typography>
  </ListItem>
);

const TopInvestors: React.FC = () => {
  const investors = Array.from({ length: 4 }, (_, i) => ({
    avatarSrc: "https://s3-symbol-logo.tradingview.com/crude-oil--big.svg",
    randomNumber: generateRandomNumber(),
    profit,
    rank: i + 1,
  }));

  return (
    <Box
      sx={{
        padding: 1,
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box
      m
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,

        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          variant="h6"
          color="black"
          fontWeight="bold"
        >
          Top Investors
        </Typography>
        <Typography
          sx={{
            fontFamily: "Montserrat, sans-serif",
          }}
          variant="h6"
          color="text.secondary"
        >
          #281,133
        </Typography>
      </Box>

      {/* Investor List */}
      {investors.map((investor, index) => (
        <InvestorItem key={index} {...investor} />
      ))}
    </Box>
  );
};

export default TopInvestors;
