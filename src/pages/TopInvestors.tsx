import React from "react";
import {
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { green, blue, pink, orange, purple } from "@mui/material/colors";

// Helper functions
const generateRandomNumber = () => Math.floor(Math.random() * 1e12).toString().padStart(12, "0");

const generateRandomInitials = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  return `${randomLetter()}${randomLetter()}`;
};

const getRandomColor = () => {
  const colors = [green[500], blue[500], pink[500], orange[500], purple[500]];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomFlag = () => {
  const flags = [
    "us", "fr", "de", "jp", "cn", "in", "gb", "br", "ca", "au", // ISO 3166-1 alpha-2 codes
  ];
  const randomFlag = flags[Math.floor(Math.random() * flags.length)];
  return `https://flagcdn.com/w40/${randomFlag}.png`; // Free flag CDN
};

const profit = 623718.591; // Example profit value

// Component for a single investor item
const InvestorItem = ({
  avatarInitials,
  avatarBgColor,
  randomNumber,
  profit,
  rank,
  flagUrl,
}: {
  avatarInitials: string;
  avatarBgColor: string;
  randomNumber: string;
  profit: number;
  rank: number;
  flagUrl: string;
}) => (
  <ListItem
    sx={{
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #ddd",
      paddingLeft: 1.5,
      paddingRight: 1.5,
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <ListItemAvatar>
      <Avatar
        sx={{
          width: 40,
          height: 40,
          fontSize: "1.2rem",
          bgcolor: avatarBgColor,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {avatarInitials}
      </Avatar>
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
      <Box ml={1} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <img
        src={flagUrl}
        alt="flag"
        style={{
          width: "32px",
          height: "20px",
          borderRadius: "4px",
          
          border: "1px solid #ddd",
        }}
      />
    </Box>
  </ListItem>
);

const TopInvestors: React.FC = () => {
  const investors = Array.from({ length: 50 }, (_, i) => ({
    avatarInitials: generateRandomInitials(),
    avatarBgColor: getRandomColor(),
    randomNumber: generateRandomNumber(),
    profit,
    rank: i + 1,
    flagUrl: getRandomFlag(),
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
        m={2}
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
          281927
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
