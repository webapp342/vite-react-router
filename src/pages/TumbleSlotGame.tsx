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

const findClusters = (grid: string[][]) => {
  const clusters: { x: number, y: number }[] = [];
  const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 0, y: -1 }
  ];

  const dfs = (x: number, y: number, symbol: string) => {
    const stack = [{ x, y }];
    const cluster = [];

    while (stack.length > 0) {
      const { x, y } = stack.pop()!;
      if (x < 0 || y < 0 || x >= gridSize || y >= gridSize || visited[x][y] || grid[x][y] !== symbol) continue;

      visited[x][y] = true;
      cluster.push({ x, y });

      for (const dir of directions) {
        stack.push({ x: x + dir.x, y: y + dir.y });
      }
    }

    if (cluster.length >= 8) {
      clusters.push(...cluster);
    }
  };

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!visited[i][j]) {
        dfs(i, j, grid[i][j]);
      }
    }
  }

  return clusters;
};

const removeClusters = (grid: string[][], clusters: { x: number, y: number }[]) => {
  clusters.forEach(({ x, y }) => {
    grid[x][y] = '';
  });

  for (let j = 0; j < gridSize; j++) {
    let emptySpaces = 0;
    for (let i = gridSize - 1; i >= 0; i--) {
      if (grid[i][j] === '') {
        emptySpaces++;
      } else if (emptySpaces > 0) {
        grid[i + emptySpaces][j] = grid[i][j];
        grid[i][j] = '';
      }
    }
  }

  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][j] === '') {
        grid[i][j] = symbolTypes[Math.floor(Math.random() * numSymbols)];
      }
    }
  }

  return grid;
};

const calculateScore = (clusters: { x: number, y: number }[], tumbleCount: number) => {
  let baseScore = clusters.length * 10;

  if (tumbleCount % bonusInterval === 0) {
    baseScore += 100;
  }

  return baseScore;
};

const Game: React.FC = () => {
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

    let newGrid = [...grid];
    let clusters = findClusters(newGrid);

    if (clusters.length > 0) {
      newGrid = removeClusters(newGrid, clusters);
      const earnedScore = calculateScore(clusters, tumbleCount + 1);
      const updatedScore = score - tumbleCost + earnedScore;
      setScore(updatedScore);
      setGrid(newGrid);
      setTumbleCount(tumbleCount + 1);
    } else {
      setScore(score - tumbleCost);
      setTumbleCount(tumbleCount + 1);
    }
  }, [grid, score, tumbleCount]);

  useEffect(() => {
    // Save score and tumbleCount to localStorage
    localStorage.setItem('score', score.toFixed(2));
    localStorage.setItem('tumbleCount', tumbleCount.toString());
  }, [score, tumbleCount]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Balance: ${score.toFixed(2)}</h2>
      <button onClick={handleTumble} disabled={score < tumbleCost}>
        Tumble
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 50px)`, gap: '5px', justifyContent: 'center', marginTop: '20px' }}>
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
