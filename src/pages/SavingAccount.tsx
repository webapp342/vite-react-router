import React, { useState } from "react";
import {
  Box,
  Typography,

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Card,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import money from "../assets/money.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type TableRowData = {
  assetLogo: string; // Tek logo veya çift için ilk logo
  assetName: string;
  dpr: string;
  available: string;
  category: string;
  secondaryLogo?: string; // İkinci logo (sadece Forex için)
};

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});
type SavingAccountProps = {
  data: TableRowData[];
};

const SavingAccount: React.FC<SavingAccountProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("Crypto");

  const categories = ["Forex", "Crypto", "Stocks", "ETF"];

  // Seçilen kategoriye göre veriyi filtreleme
  const filteredData = data.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <ThemeProvider theme={theme}>
           <Box
          justifyContent="space-between"
          alignItems="center"
          m={2}
        >
       

            <Box   justifyContent= "space-between"
          alignItems= "center"
          display="flex">

            <Typography   
            sx={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              
              background: 'linear-gradient(90deg, #031340, #08AEEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
           CAPVERSAL

           </Typography>

           <Box       
 >

           <AdminPanelSettingsOutlinedIcon    sx={{ fontSize: '2rem', color: 'black' }} />
           <PersonOutlinedIcon  sx={{ml:2, fontSize: '2rem', color: 'black'  }} />

      

            </Box>
      
       
              </Box>

           
        </Box>

      
    <Box
      sx={{
        padding: 1,
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box
      
        sx={{
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
      
      </Box>

  
     


      {/* Button Group */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          marginBottom: 1,
          bgcolor: "white",
          border: "1px solid #ddd",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category)}
            variant="text"
            sx={{
              flex: 1,
              padding: 1,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: "bold",
              color: selectedCategory === category ? "white" : "black",
              backgroundColor:
                selectedCategory === category ? "#1976d2" : "transparent",
              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category ? "#1565c0" : "#f0f0f0",
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Asset</strong>
              </TableCell>
              <TableCell align="center">
                <strong>DPR</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {row.category === "Forex" && row.secondaryLogo ? (
                      <Box sx={{ position: "relative", width: 40, height: 40 }}>
                        <Avatar
                        
                          src={row.assetLogo}
                          alt={row.assetName}
                          sx={{
                            position: "absolute",
                            width: 30,
                            height: 30,
                            
                            top: -5,
                            left: -8,
                          }}
                        />
                        <Avatar
                          src={row.secondaryLogo}
                          alt={row.assetName}
                          sx={{
                            position: "absolute",
                            width: 30,
                            height: 30,
                            top: 5,
                            left: 7,

                          }}
                        />
                      </Box>
                    ) : (
                      <Avatar src={row.assetLogo} alt={row.assetName} />
                    )}
                    <Typography ml={1}>{row.assetName}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{row.dpr}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => alert(`EARN clicked for ${row.assetName}`)}
                  >
                    EARN
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </ThemeProvider>
  );
};

export default SavingAccount;
