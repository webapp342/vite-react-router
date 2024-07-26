import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const WheelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Wheel = styled(motion.div)`
  width: 300px;
  height: 300px;
  border: 10px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Slice = styled.div<{ rotation: number, color: string }>`
  width: 150px;
  height: 150px;
  background-color: ${({ color }) => color};
  position: absolute;
  transform: rotate(${({ rotation }) => rotation}deg);
  transform-origin: 100% 100%;
  clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
`;

const WheelComponent: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const slices = [
    { color: '#FF6633', label: '1' },
    { color: '#FFB399', label: '2' },
    { color: '#FF33FF', label: '3' },
    { color: '#FFFF99', label: '4' },
    { color: '#00B3E6', label: '5' },
    { color: '#E6B333', label: '6' },
  ];

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const newRotation = rotation + 360 * 5 + Math.floor(Math.random() * 360);
    setRotation(newRotation);
    setTimeout(() => setSpinning(false), 5000);
  };

  return (
    <WheelContainer>
      <div>
        <Wheel
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: 'easeOut' }}
        >
          {slices.map((slice, index) => (
            <Slice
              key={index}
              rotation={(360 / slices.length) * index}
              color={slice.color}
            />
          ))}
        </Wheel>
        <Button onClick={spinWheel} disabled={spinning}>
          Çevir
        </Button>
      </div>
    </WheelContainer>
  );
};

export default WheelComponent;
