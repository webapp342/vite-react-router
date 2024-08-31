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
        const isNewSymbol = !isSpinning && symbol === ''; // Yeni semboller
        const isFalling = !isSpinning && symbol !== ''; // Düşme animasyonuna tabi olan semboller

        return (
          <motion.div
            key={index}
            className={`symbol ${isWinning ? 'winning' : ''} ${isNewSymbol ? 'falling' : ''}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: isFalling ? index * 0.1 : 0 // Her sembol için gecikme ekliyoruz
            }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Reel;
