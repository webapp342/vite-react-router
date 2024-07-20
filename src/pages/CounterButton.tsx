import React, { useState } from 'react';
import { Badge, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Butona simge eklemek için

const CounterButton: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Badge
        badgeContent={count}
        color="secondary"
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          backgroundColor: '#000',
          color: '#0f0',
          fontSize: '16px',
          borderRadius: '50%',
        }}
      />
      <IconButton
        onClick={handleClick}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#0f0',
          color: '#fff',
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default CounterButton;
