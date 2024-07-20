import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import WebApp from '@twa-dev/sdk';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

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
      <Typography variant="body1">Telegram ID: {user.id}</Typography>
    </Container>
  );
};

export default Home;