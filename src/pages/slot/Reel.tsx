import React from 'react';
import { motion } from 'framer-motion';
import './Reel.css';

interface ReelProps {
  symbols: string[];
  isSpinning: boolean;
  winningSymbols: { reel: number; index: number; symbol: string }[];
}

const Reel: React.FC<ReelProps> = ({ symbols, isSpinning, winningSymbols }) => {
  return (
    <div className="reel">
      {symbols.map((symbol, index) => {
        const isWinning = winningSymbols.some(ws => ws.index === index);
        return (
          <motion.div
            key={index}
            className={`symbol ${isWinning ? 'winning' : ''}`}
            initial={isSpinning ? { scale: 1.2, rotate: 0 } : { scale: 1, rotate: 0 }}
            animate={isSpinning ? { scale: 1, rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Reel;
