import React, { useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton,   Typography,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import News from "./New.tsx";
import TradingViewMarketOverview from "./Market.tsx";
import TradingViewWidget from "./Events.tsx";
import "../styles.css"; // Animasyon stilleri için
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';


const Component1: React.FC = () => (
  <Box >
    <News />
  </Box>
);

const Component2: React.FC = () => (
  <Box >
    <TradingViewMarketOverview />
  </Box>
);

const Component3: React.FC = () => (
  <Box >
    <TradingViewWidget />
  </Box>
);

const TradingViewWidgetVertical: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("component1");

  const renderComponent = () => {
    switch (activeComponent) {
      case "component1":
        return <Component1 />;
      case "component2":
        return <Component2 />;
      case "component3":
        return <Component3 />;
      default:
        return null;
    }
  };

  return (
    <Box
      m={2}
      sx={{
      }}
    >


       

<Box   justifyContent= "space-between"
          alignItems= "center"
          display="flex">

<PersonOutlinedIcon  sx={{ fontSize: '2rem', color: 'black'  }} />


            <Typography   
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: 'Montserrat, sans-serif',

              background: 'linear-gradient(90deg, #031340, #08AEEA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
           Research
           </Typography>

  

           <AdminPanelSettingsOutlinedIcon    sx={{ fontSize: '2rem', color: 'black' }} />

      

      
       
              </Box>

      {/* Toggle Buton Grubu */}
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 2,
        width: "100%",
        mb: 2,
      }}
    >
      <Box 
      sx={{ 
        background: 'white',
        justifyContent: "space-between",
        alignItems: "space-between",
        display: "flex",
        width: "90%",
mt:2 , 
        

      }}
    >
        <ToggleButtonGroup  fullWidth
          value={activeComponent}
          exclusive
          onChange={(_, newValue) => newValue && setActiveComponent(newValue)}
          aria-label="component selection"
          sx={{
            "& .MuiToggleButton-root": {
              flex: 1,
              padding: 1,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: "bold",
              color: "#1976d2",
              transition: "all 0.3s ease",
            },
            "& .Mui-selected": {
              color: "#fff",
              backgroundColor: "#1976d2",
              borderColor: "#1976d2",
            },
            "& .MuiToggleButton-root:hover": {
              backgroundColor: "#f0f0f0",
            },
            "& .Mui-selected:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          <ToggleButton value="component1">Calender</ToggleButton>
          <ToggleButton value="component2">Markets</ToggleButton>

          <ToggleButton value="component3">News</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      </Box>


      {/* Dinamik Bileşen ve Geçiş */}
      <Box  m={-2} mt={2}
        sx={{
       
          position: "relative",
          overflow: "hidden",
        }}
      >
        <TransitionGroup>
          <CSSTransition
            key={activeComponent}
            timeout={300}
            classNames="fade"
          >
            <Box sx={{  width: "100%" }}>
              {renderComponent()}
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Box>
    </Box>
  );
};

export default TradingViewWidgetVertical;
