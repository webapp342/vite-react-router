import React from "react";
import { Box, Typography, Stack, Button,Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom"; // react-router-dom kullanarak yönlendirme
import money from '../extras/money.png';
import ProgressStepper from '../QontoConnector';
import VerifiedIcon from '@mui/icons-material/Verified';
import { createTheme, ThemeProvider } from "@mui/material/styles";





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
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif",
    },
  });
  const handleGoBack = () => {
    navigate("/vite-react-router/"); // Geri butonuna tıklandığında bu path'e yönlendir
  };

  const steps = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  const activeSteps: number[] = []; // Hiçbir adım aktif değil

  const steps2 = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  const activeSteps2: number[] = []; // Hiçbir adım aktif değil
  return (
    <ThemeProvider theme={theme}>

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
        
          {/* Kart Alanı */}
          <Box m={-1} mt={2} display="flex" justifyContent="center">
          <Card
            sx={{
              borderRadius: 3,
              backgroundColor: '#f9f9f9',
              display: 'flex',
              padding: 1,
              width: "100%",
              position: 'relative',
            }}
          >
          
            <Box
              width="100%"
              ml={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
             <Box sx={{ textAlign: "left" }}>
  <Typography
    sx={{
    
      color: '#909eae',
      fontWeight: 'light',
      fontSize: '1rem',
    }}
  >
Your rewards  </Typography>
  <Typography
    mt={1}
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '1.2rem',
    }}
  >
   0.00 USDT
  </Typography>
</Box>

            
            </Box>
            <Box ml={2} p={-1} width="35%" display="flex" justifyContent="center" alignItems="center">
              <Box
                component="img"
                src={money}
                alt="Logo"
                sx={{
                  height: '100px',
                  borderRadius: '12px',
                }}
              />
            </Box>
          </Card>
          
        </Box>

          {/* Kart: Total Balance ve Buton */}
<Box  m={-1} display="flex" justifyContent="center" mt={2} width={"105%"}>
  <Card
          onClick={() => navigate('/vite-react-router/task')} // Tıklanma olayında yönlendirme
    sx={{
      width: '100%',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: 2,
    }}
  >
    <CardContent>
      {/* Total Balance */}
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={-1}>

        <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          Complete tasks and get
        </Typography>
        <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
         up to $2,290
        </Typography>
        
       
      </Box>
      <Box mt={2}>

      <ProgressStepper steps={steps} activeSteps={activeSteps} />   
        {/* Alt Bilgi */}
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography
          sx={{
            color: '#909eae',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          0 / 10 tasks completed
        </Typography>

        {/* Sağdaki Kutu */}
        <Box
        mt={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5, // İkon ve yazı arası boşluk
            backgroundColor: '#00b894',
            borderRadius: 3,
            boxShadow:4,
           
            px: 1, // Yatay iç boşluk
            py: 0.5, // Dikey iç boşluk
          }}
        >
          <VerifiedIcon
            sx={{
              color: 'gold', // İkon rengi (yeşil)
              fontSize: '1rem',
            }}
          />
          <Typography
            sx={{
              color: '#fff', // Yazı rengi (beyaz)
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            Pro
          </Typography>
        </Box>
      </Box>  
      </Box>
    
    </CardContent>
  </Card>
</Box>

 {/* Kart: Total Balance ve Buton */}
 <Box  m={-1} display="flex" justifyContent="center" mt={2} width={"105%"}>
   <Card
  onClick={() => navigate('/vite-react-router/task')} // Tıklanma olayında yönlendirme
  sx={{
    width: '100%',
    backgroundImage: 'linear-gradient(211deg, #00b894 0%, #f9f9f9 51%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  }}
>
    <CardContent>
      {/* Total Balance */}
      <Box p={0} display="flex" flexDirection="column" alignItems="flex-start" mb={-1}>

        <Typography
          sx={{
            color: '#00b894',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          +$10
        </Typography>
        <Typography mt={1}
          sx={{
            color: 'black',
            fontSize: '1rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
Deposit at least $50 in any supported coin or currency to your wallet       </Typography>
        
       
      </Box>
      <Box  mt={2}>

      <ProgressStepper steps={steps2} activeSteps={activeSteps2} />   
        {/* Alt Bilgi */}
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography
          sx={{
            color: '#909eae',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          $0 / $50
        </Typography>

        {/* Sağdaki Kutu */}
        <Box
            component="button"
            sx={{
              backgroundColor: '#00b894',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#009974',
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // Kartın yönlendirme olayını engellemek için
              console.log('Trade button clicked!');
            }}
          >
            Deposit
          </Box>
      </Box>  
      </Box>
    
    </CardContent>
  </Card>
</Box>

 {/* Kart: Total Balance ve Buton */}
<Box m={-1} display="flex" justifyContent="center" mt={2} width={"105%"}>
  <Card
    onClick={() => navigate('/vite-react-router/task')} // Tıklanma olayında yönlendirme
    sx={{
      width: '100%',
      backgroundImage: 'linear-gradient(211deg, #00b894 0%, #f9f9f9 51%)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: 2,
    }}
  >
    <CardContent>
      {/* Total Balance */}
      <Box p={0} display="flex" flexDirection="column" alignItems="flex-start" mb={-1}>
        <Typography
          sx={{
            color: '#00b894',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          +$20
        </Typography>
        {/* Yazı ve Buton Satırı */}
        <Box 
          mt={1} 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between" 
          width="100%"
        >
          <Typography
            sx={{
              color: 'black',
              fontSize: '1rem',
              textAlign: 'left', // Sola hizalama
            }}
          >
            Make a First Trade
          </Typography>
          {/* Buton */}
          <Box
            component="button"
            sx={{
              backgroundColor: '#00b894',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#009974',
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // Kartın yönlendirme olayını engellemek için
              console.log('Trade button clicked!');
            }}
          >
            Trade
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
</Box>

    {/* Kart: Total Balance ve Buton */}
    <Box  m={-1} display="flex" justifyContent="center" mt={2} width={"105%"}>
   <Card
  onClick={() => navigate('/vite-react-router/task')} // Tıklanma olayında yönlendirme
  sx={{
    width: '100%',
    backgroundImage: 'linear-gradient(211deg, #00b894 0%, #f9f9f9 51%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  }}
>
    <CardContent>
      {/* Total Balance */}
      <Box p={0} display="flex" flexDirection="column" alignItems="flex-start" mb={-1}>

        <Typography
          sx={{
            color: '#00b894',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          +$100
        </Typography>
        <Typography mt={1}
          sx={{
            color: 'black',
            fontSize: '1rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
Trade up to $10,000        </Typography>
        
       
      </Box>
      <Box  mt={2}>

      <ProgressStepper steps={steps2} activeSteps={activeSteps2} />   
        {/* Alt Bilgi */}
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography
          sx={{
            color: '#909eae',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          $0 / $10,000
        </Typography>

      {/* Buton */}
      <Box
            component="button"
            sx={{
              backgroundColor: '#00b894',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#009974',
              },
            }}
            onClick={(e) => {
              e.stopPropagation(); // Kartın yönlendirme olayını engellemek için
              console.log('Trade button clicked!');
            }}
          >
            Trade
          </Box>
      </Box>  
      </Box>
    
    </CardContent>
  </Card>
</Box>

     
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
                backgroundImage: 'linear-gradient(135deg, #00b894 0%, #f9f9f9 44%)',
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
                    backgroundColor: '#00b894',
                    color: 'white',
                    fontSize: '0.6rem',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#009974',
                    },
                  }}
                >
                  {item.earn}
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>


          {/* Kart: Total Balance ve Buton */}
   <Box  m={-1} display="flex" justifyContent="center" mt={2} width={"105%"}>
   <Card
  onClick={() => navigate('/vite-react-router/task')} // Tıklanma olayında yönlendirme
  sx={{
    width: '100%',
    backgroundImage: 'linear-gradient(211deg, #00b894 0%, #f9f9f9 51%)',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  }}
>
    <CardContent>
      {/* Total Balance */}
      <Box p={0} display="flex" flexDirection="column" alignItems="flex-start" mb={-1}>

        <Typography
          sx={{
            color: '#00b894',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          +$500
        </Typography>
        <Typography mt={1}
          sx={{
            color: 'black',
            fontSize: '1rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
Deposit a total amount of $1,000        </Typography>
        
       
      </Box>
      <Box  mt={2}>

      <ProgressStepper steps={steps2} activeSteps={activeSteps2} />   
        {/* Alt Bilgi */}
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <Typography
          sx={{
            color: '#909eae',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            textAlign: 'left', // Sola hizalama
          }}
        >
          $0 / $1,000
        </Typography>

        {/* Sağdaki Kutu */}
        <Box
        mt={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5, // İkon ve yazı arası boşluk
            backgroundColor: '#00b894',
            borderRadius: 3,
            boxShadow:4,
           
            px: 1, // Yatay iç boşluk
            py: 0.5, // Dikey iç boşluk
          }}
        >
        
          <Typography
            sx={{
              color: '#fff', // Yazı rengi (beyaz)
              fontSize: '0.8rem',
              fontWeight: 'bold',
            }}
          >
            Deposit
          </Typography>
        </Box>
      </Box>  
      </Box>
    
    </CardContent>
  </Card>
</Box>


      </Box>
    </Box>
    </ThemeProvider>

  );
};

export default TopInvestors;
