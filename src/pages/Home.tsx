import React, { useEffect, useState } from 'react';
import { Container, Typography, Avatar, Box } from '@mui/material';
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

  // Profil fotoğrafı URL'sini oluşturuyoruz
  const profilePicUrl = `https://t.me/i/userpic/320/${user.id}.jpg`;

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
        }}
      >
        <Avatar
          alt={user.first_name}
          src={profilePicUrl}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Typography variant="body1">Telegram ID: {user.id}</Typography>
    </Container>
  );
};

export default Home;
