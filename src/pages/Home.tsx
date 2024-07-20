import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import WebApp from '@twa-dev/sdk';
import '../App.css';  // Matrix animasyon CSS dosyasını import ediyoruz

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

    // Matrix animasyonunu başlatıyoruz
    matrixAnimation();
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

const matrixAnimation = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error('Canvas context not supported');
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = 'ESCAPEFROMMATRIX';
  const fontSize = 10;
  const columns = Math.floor(canvas.width / fontSize);

  const drops: number[] = Array(columns).fill(1);

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  };

  setInterval(draw, 33);
};

export default Home;
