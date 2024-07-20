import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import WebApp from '@twa-dev/sdk';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const matrixKeyframes = `
  @keyframes matrix {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // WebApp SDK'yı başlatıyoruz ve kullanıcı bilgilerini alıyoruz
    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">Yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Merhaba, {user.first_name}
      </Typography>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
          backgroundImage: 'linear-gradient(45deg, #628078, #819993)',
          backgroundSize: '100% 200%',
          animation: 'atrix 5s infinite',
        }}
      >
        <Typography variant="body1">Telegram ID: {user.id}</Typography>
      </Box>
      <style>{matrixKeyframes}</style>
    </Container>
  );
};

export default Home;