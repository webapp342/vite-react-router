import React, { useState, useCallback } from 'react';
import Reel from './Reel';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import './Reel.css';
import spinSound from './sounds/spin.mp3';
import winSound from './sounds/win.wav';
import loseSound from './sounds/lose.wav';

const fruitSymbols = [
  '🍒', '🍋', '🍉', '🍇', '🍍', '🍎', '🍏', '🍊', '🍑', '🥭',
  '🍈', '🍐', '🥝', '🍅', '🍆', '🌽', '🥥', '🥑', '🍈'
];

const fruitPoints: Record<string, number> = {
  '🍒': 10,
  '🍋': 10,
  '🍉': 10,
  '🍇': 10,
  '🍍': 10,
  '🍎': 20,
  '🍏': 20,
  '🍊': 20,
  '🍑': 20,
  '🥭': 20,
  '🍈': 20,
  '🍐': 20,
  '🥝': 20,
  '🍅': 20,
  '🍆': 20,
  '🌽': 20,
  '🥥': 20,
};

const generateNewReels = (): string[][] => {
  const newReels: string[][] = [];
  for (let i = 0; i < 6; i++) {
    const reelSymbols: string[] = [];
    for (let j = 0; j < 5; j++) {
      const randomSymbol = fruitSymbols[Math.floor(Math.random() * fruitSymbols.length)];
      reelSymbols.push(randomSymbol);
    }
    newReels.push(reelSymbols);
  }
  return newReels;
};

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[][]>(generateNewReels());
  const [score, setScore] = useState<number>(0);
  const [winningSymbols, setWinningSymbols] = useState<{ reel: number; index: number; symbol: string }[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [totalReward, setTotalReward] = useState<number>(0);
  const [spinKey, setSpinKey] = useState<number>(0);

  const [playSpin] = useSound(spinSound);
  const [playWin] = useSound(winSound);
  const [playLose] = useSound(loseSound);

  const spinReels = useCallback(async () => {
    if (isSpinning) return;
    playSpin();
    setIsSpinning(true);
    const newReels = generateNewReels();
    setReels(newReels);
    setShowResults(false);
    setTotalReward(0);
    setSpinKey(spinKey + 1);

    // Spin süresi (örneğin 3 saniye)
    await wait(1000);

    await handleClusterPays(newReels);
  }, [isSpinning, playSpin, spinKey]);

  const handleClusterPays = async (reels: string[][]) => {
    let newReels = [...reels];
    let hasWinningCluster = true;
    let totalReward = 0;

    while (hasWinningCluster) {
      const { winningSymbols } = getWinningClusters(newReels);
      setWinningSymbols(winningSymbols.map(ws => ({
        ...ws,
        symbol: reels[ws.reel][ws.index]
      })));

      if (winningSymbols.length > 0) {
        playWin();
      } else {
        playLose();
      }

      // Kazanan semboller için animasyon süresi (örneğin 2 saniye)
      await wait(3000);

      if (winningSymbols.length > 0) {
        await animateWinningSymbols(winningSymbols);

        const { reward } = calculateReward(newReels, winningSymbols);
        totalReward += reward;

        setScore(prevScore => prevScore + reward);

        // Kazanan sembolleri boşalt
        newReels = removeWinningSymbols(newReels, winningSymbols);
        setReels(newReels);

        // Boş alanları yukarı çek
        newReels = applyGravity(newReels);
        setReels(newReels);

       
      }

      hasWinningCluster = winningSymbols.length > 0;
    }

    setTotalReward(totalReward);
    setShowResults(true);
    setIsSpinning(false);
  };

  const removeWinningSymbols = (reels: string[][], winningSymbols: { reel: number; index: number }[]) => {
    return reels.map((reel, reelIndex) => {
      return reel.map((symbol, index) => {
        if (winningSymbols.some(ws => ws.reel === reelIndex && ws.index === index)) {
          return ''; // Kazanan sembolleri boşalt
        }
        return symbol;
      });
    });
  };

  const animateWinningSymbols = async (winningSymbols: { reel: number; index: number; symbol: string }[]) => {
    // Apply animation to winning symbols before making them empty
    setReels(prevReels => prevReels.map((reel, reelIndex) => 
      reel.map((symbol, index) => 
        winningSymbols.some(ws => ws.reel === reelIndex && ws.index === index) 
          ? symbol
          : symbol
      )
    ));

    // Kazanan semboller için animasyon süresi (örneğin 2 saniye)
    await wait(3000);
    
    // Kazanan semboller boşaltılıyor
    setReels(prevReels => prevReels.map((reel, reelIndex) => 
      reel.map((symbol, index) => 
        winningSymbols.some(ws => ws.reel === reelIndex && ws.index === index) 
          ? ''
          : symbol
      )
    ));
  };

  const applyGravity = (reels: string[][]): string[][] => {
    const updatedReels = reels.map(reel => {
      const nonEmptySymbols = reel.filter(symbol => symbol !== '');
      const emptySpaces = reel.length - nonEmptySymbols.length;
      return [...Array(emptySpaces).fill(''), ...nonEmptySymbols];
    });

    // Boş alanları yeni semboller ile doldur
    for (let reel = 0; reel < updatedReels.length; reel++) {
      for (let row = 0; row < updatedReels[reel].length; row++) {
        if (updatedReels[reel][row] === '') {
          updatedReels[reel][row] = fruitSymbols[Math.floor(Math.random() * fruitSymbols.length)];
        }
      }
    }

    return updatedReels;
  };

  const calculateReward = (_reels: string[][], winningSymbols: { reel: number; index: number; symbol: string }[]) => {
    const symbolCounts = winningSymbols.reduce((acc, ws) => {
      acc[ws.symbol] = (acc[ws.symbol] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let totalReward = 0;

    for (const [symbol, count] of Object.entries(symbolCounts)) {
      const rewardPerSymbol = fruitPoints[symbol] || 0;
      totalReward += rewardPerSymbol * count;
    }

    return { reward: totalReward };
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getWinningClusters = (reels: string[][]) => {
    const flatReels = reels.flat();
    const symbolCounts = flatReels.reduce((acc, symbol) => {
      acc[symbol] = (acc[symbol] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const winningSymbols = Object.keys(symbolCounts)
      .filter(symbol => symbolCounts[symbol] >= 4)
      .flatMap(symbol => flatReels.reduce((acc, sym, index) => {
        if (symbol === sym) {
          const reelIndex = Math.floor(index / 5);
          const rowIndex = index % 5;
          acc.push({ reel: reelIndex, index: rowIndex, symbol });
        }
        return acc;
      }, [] as { reel: number; index: number; symbol: string }[]));

    return { winningSymbols };
  };

  return (
    <div className="slot-machine">
      <Confetti
        recycle={false}
        numberOfPieces={200}
        gravity={0.2}
        run={showResults && totalReward > 0}
      />
      <h2>Score: {score}</h2>
      <div className="result-message">
        {showResults && (
          <>
            {totalReward > 0 ? (
              <>Congratulations! You won {totalReward} points!</>
            ) : (
              'No win, try again!'
            )}
          </>
        )}
      </div>
      <motion.button 
        onClick={spinReels} 
        disabled={isSpinning}
        initial={{ opacity: 1 }}
        animate={{ opacity: isSpinning ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </motion.button>
      <div className="reels-container">
        {reels.map((reel, reelIndex) => (
          <Reel 
            key={reelIndex} 
            symbols={reel} 
            isSpinning={isSpinning} 
            winningSymbols={winningSymbols.filter(ws => ws.reel === reelIndex)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SlotMachine;
