// src/components/Game.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';

const gridSize = 6;
const numSymbols = 4;
const symbolTypes = ['🍎', '🍌', '🍒', '🍉'];
const bonusInterval = 5;
const tumbleCost = 10;

const generateGrid = () => {
  const grid: string[][] = [];
  for (let i = 0; i < gridSize; i++) {
    const row: string[] = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(symbolTypes[Math.floor(Math.random() * numSymbols)]);
    }
    grid.push(row);
  }
  return grid;
};

// Function to find clusters and clear them
const checkClusters = (grid: string[][]) => {
  const newGrid = grid.map(row => [...row]);
  const symbolCount = symbolTypes.reduce((acc, symbol) => {
    acc[symbol] = 0;
    return acc;
  }, {} as { [key: string]: number });

  // Count occurrences of each symbol
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      symbolCount[newGrid[i][j]]++;
    }
  }

  // Clear clusters
  for (const symbol in symbolCount) {
    if (symbolCount[symbol] >= 8) { // Example threshold for clearing
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (newGrid[i][j] === symbol) {
            newGrid[i][j] = symbolTypes[Math.floor(Math.random() * numSymbols)];
          }
        }
      }
    }
  }

  return newGrid;
};

// Function to calculate score
const calculateScore = (grid: string[][], tumbleCount: number) => {
  const totalSymbols = grid.flat().length;
  let baseScore = totalSymbols * 10;

  // Bonus score every 5 tumbles
  if (tumbleCount % bonusInterval === 0) {
    baseScore += 100; // Bonus amount, adjust as needed
  }

  return baseScore;
};

const Game: React.FC = () => {
  // Load or initialize game state
  const [grid, setGrid] = useState(generateGrid());
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseFloat(savedScore) : 500;
  });
  const [tumbleCount, setTumbleCount] = useState(() => {
    const savedTumbleCount = localStorage.getItem('tumbleCount');
    return savedTumbleCount ? parseInt(savedTumbleCount, 10) : 0;
  });

  const handleTumble = useCallback(() => {
    if (score < tumbleCost) {
      alert("Not enough funds to continue.");
      return;
    }

    setGrid(prevGrid => {
      const newGrid = checkClusters(prevGrid);
      const newScore = score - tumbleCost; // Deduct $10 for each tumble
      const earnedScore = calculateScore(newGrid, tumbleCount + 1);
      const updatedScore = newScore + earnedScore;

      setScore(updatedScore);
      return newGrid;
    });
    setTumbleCount(prevCount => prevCount + 1);
  }, [score, tumbleCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleTumble();
    }, 2000);

    return () => clearInterval(interval);
  }, [handleTumble]);

  useEffect(() => {
    // Save score and tumbleCount to localStorage
    localStorage.setItem('score', score.toFixed(2));
    localStorage.setItem('tumbleCount', tumbleCount.toString());
  }, [score, tumbleCount]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Score: ${score.toFixed(2)}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 50px)`, gap: '5px', justifyContent: 'center' }}>
        {grid.flat().map((symbol, index) => (
          <animated.div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'black',
              border: '1px solid #ddd',
              borderRadius: '5px',
              ...useSpring({
                opacity: 1,
                from: { opacity: 0 },
                reset: true
              })
            }}
          >
            {symbol}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Game;
