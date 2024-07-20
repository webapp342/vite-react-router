import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CounterButton from './CounterButton'; // Bileşeni import ediyoruz
import WebApp from '@twa-dev/sdk';
import '../App.css'; // Matrix animasyon CSS dosyasını import ediyoruz

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const Home: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const [animationIntervalId, setAnimationIntervalId] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const userData = WebApp.initDataUnsafe?.user;
    if (userData) {
      setUser(userData);
    }

    matrixAnimation();

    const handleResize = () => {
      const canvas = document.querySelector('.matrix') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // İlk boyutlandırmayı yap

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIntervalId) {
        clearInterval(animationIntervalId);
      }
    };
  }, [animationIntervalId]);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    matrixAnimation();
    setTimeout(() => {
      setIsAnimating(false);
    }, 60000); // 1 dakika sonra butonu tekrar aktif hale getir
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

    // Interval ID'yi saklamak için const kullanıyoruz
    const intervalId = setInterval(draw, 33);
    setAnimationIntervalId(intervalId);
  };

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
      <Button 
        variant="contained" 
        color="primary" 
        onClick={startAnimation}
        disabled={isAnimating}
        sx={{ mb: 2 }}
      >
        {isAnimating ? 'Animasyon Devam Ediyor...' : 'Animasyonu Başlat'}
      </Button>
      <CounterButton /> {/* Sayı göstergesi ve yuvarlak butonu ekliyoruz */}
    </Container>
  );
};

export default Home;
