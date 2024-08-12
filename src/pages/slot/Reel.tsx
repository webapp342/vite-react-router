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

        return (
          <motion.div
            key={index}
            className={`symbol ${isWinning ? 'winning' : ''} ${isNewSymbol ? 'falling' : ''}`}
            initial={{ scale: 1, opacity: isNewSymbol ? 0 : 1 }}
            animate={{ scale: isNewSymbol ? 1 : 1 }}
            transition={{ duration: isNewSymbol ? 0.5 : 0, ease: "easeOut" }}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Reel;
