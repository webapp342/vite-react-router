import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Reel.css';

interface ReelProps {
  symbols: string[];
  winningSymbols: { index: number }[];
  showWinning: boolean;
  isSpinning: boolean;
  spinKey: number;
}

const Reel: React.FC<ReelProps> = ({ symbols, winningSymbols, showWinning, isSpinning, spinKey }) => {
  useEffect(() => {
    // Ensure the animation starts when spinning
  }, [isSpinning, spinKey]);

  return (
    <div className="reel">
      {symbols.map((symbol, index) => (
        <motion.div
          key={`${spinKey}-${index}`}
          className={`symbol ${showWinning && winningSymbols.some(ws => ws.index === index) ? 'winning' : ''}`}
          initial={{ opacity: 0, y: -150 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: showWinning && winningSymbols.some(ws => ws.index === index) ? [1, 1.1, 1] : 1,
            rotate: showWinning && winningSymbols.some(ws => ws.index === index) ? [0, 10, -10, 0] : 0
          }}
          transition={{
            duration: 0.6,
            type: 'spring',
            stiffness: 250,
            delay: index * 0.1
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default Reel;
