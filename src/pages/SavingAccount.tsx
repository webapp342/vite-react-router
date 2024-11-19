import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
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
import money from "../assets/money.png";

type TableRowData = {
  assetLogo: string; // Tek logo veya çift için ilk logo
  assetName: string;
  dpr: string;
  available: string;
  category: string;
  secondaryLogo?: string; // İkinci logo (sadece Forex için)
};

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
    <Box
      sx={{
        padding: 1,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Box
        p={1}
        mt={3}
        sx={{
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
          borderBottom: "1px solid #ddd",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h5" fontWeight="bold">
          Saving Account
        </Typography>
        <Link href="#" underline="hover" color="primary" fontSize="14px">
          Learn more
        </Link>
      </Box>

      {/* Kart Alanı */}
      <Box mt={6} display="flex" justifyContent="center">
        <Card
          sx={{
            width: "95%",
            borderRadius: 3,
            backgroundColor: "#1e2a3a",
            display: "flex",
            padding: 2,
            position: "relative",
          }}
        >
          {/* Sol Bölüm */}
          <Box
            width="25%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              src={money}
              alt="Logo"
              sx={{
                width: "140px",
                height: "100px",
                borderRadius: "12px",
              }}
            />
          </Box>

          {/* Sağ Bölüm */}
          <Box
            width="60%"
            display="flex"
            ml={3}
            flexDirection="column"
            justifyContent="center"
          >
            <Typography
              sx={{
                color: "white",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Set-up your Earnings
            </Typography>
            <Typography
              mt={1}
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#909eae",
                fontWeight: "light",
                fontSize: "0.8rem",
              }}
            >
              Earning Passive Income is Just a Few Clicks Away!
            </Typography>
          </Box>

          {/* Sağ Alt Köşede Sağ Ok İkonu */}
          <ArrowForwardIcon
            sx={{
              position: "absolute",
              bottom: 25,
              right: 20,
              color: "white",
              fontSize: "1.5rem",
            }}
          />
        </Card>
      </Box>

      {/* Button Group */}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          marginBottom: 1,
          mt: 2,
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
  );
};

export default SavingAccount;
