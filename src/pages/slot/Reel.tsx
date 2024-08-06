import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Reel.css';

interface ReelProps {
  symbols: string[];
  winningSymbols: { reel: number; index: number; symbol: string }[];
  showWinning: boolean;
  isSpinning: boolean;
  spinKey: number;
}

const Reel: React.FC<ReelProps> = ({ symbols, winningSymbols, showWinning, isSpinning, spinKey }) => {
  const [animatedSymbols, setAnimatedSymbols] = useState<{ symbol: string; key: string; falling: boolean }[]>(() =>
    symbols.map((symbol, index) => ({
      symbol,
      key: `${spinKey}-${index}`,
      falling: false
    }))
  );

  useEffect(() => {
    if (isSpinning) {
      // Start spinning animation
      const newSymbols = symbols.map((symbol, index) => ({
        symbol,
        key: `${spinKey}-${index}`,
        falling: true
      }));
      setAnimatedSymbols(newSymbols);
    } else if (showWinning) {
      // Handle winning state
      const handleWinning = async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Initial delay for showing winning symbols
        const updatedSymbols = symbols.map((symbol, index) => ({
          symbol,
          key: `${spinKey}-${index}`,
          falling: false
        }));
        setAnimatedSymbols(updatedSymbols);
      };
      handleWinning();
    } else {
      // Handle normal updates
      const updatedSymbols = symbols.map((symbol, index) => ({
        symbol,
        key: `${spinKey}-${index}`,
        falling: false
      }));
      setAnimatedSymbols(updatedSymbols);
    }
  }, [symbols, spinKey, isSpinning, showWinning]);

  return (
    <div className="reel">
      {animatedSymbols.map(({ symbol, key, falling }, index) => (
        <motion.div
          key={key}
          className={`symbol ${showWinning && winningSymbols.some(ws => ws.index === index) ? 'winning' : ''} ${falling ? 'falling' : ''}`}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: falling ? 0.1 * index : 0 }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default Reel;
