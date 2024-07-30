import React, { useState, useEffect } from 'react';
import SlotGrid from './SlotGrid';
import './styles.css';

const generateRandomSymbol = (): string => {
  const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '⭐'];
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

const generateRandomSymbols = (): string[] => {
  return Array.from({ length: 30 }, () => generateRandomSymbol());
};

const findClusters = (slots: (string | null)[]): number[][] => {
  const width = 6;
  const clusters: number[][] = [];
  const visited = new Array(slots.length).fill(false);

  const getNeighbors = (index: number): number[] => {
    const neighbors: number[] = [];
    const row = Math.floor(index / width);
    const col = index % width;

    if (row > 0) neighbors.push(index - width); // Up
    if (row < 4) neighbors.push(index + width); // Down
    if (col > 0) neighbors.push(index - 1);     // Left
    if (col < 5) neighbors.push(index + 1);     // Right

    return neighbors;
  };

  const dfs = (index: number, symbol: string | null, cluster: number[]): void => {
    visited[index] = true;
    cluster.push(index);

    const neighbors = getNeighbors(index);
    neighbors.forEach((neighbor) => {
      if (!visited[neighbor] && slots[neighbor] === symbol) {
        dfs(neighbor, symbol, cluster);
      }
    });
  };

  for (let i = 0; i < slots.length; i++) {
    if (!visited[i] && slots[i] !== null) {
      const cluster: number[] = [];
      dfs(i, slots[i], cluster);
      if (cluster.length >= 8) {
        clusters.push(cluster);
      }
    }
  }

  return clusters;
};

const TumbleSlotGame: React.FC = () => {
  const [slots, setSlots] = useState<(string | null)[]>(generateRandomSymbols());
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWinningCombination, setHasWinningCombination] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const clusters = findClusters(slots);
      if (clusters.length > 0) {
        setHasWinningCombination(true);
        const newSlots = [...slots];
        clusters.forEach(cluster => {
          cluster.forEach(index => {
            newSlots[index] = null;
          });
        });

        setTimeout(() => {
          let updatedSlots = [...newSlots];
          for (let i = 29; i >= 0; i--) {
            if (updatedSlots[i] === null) {
              let j = i;
              while (j >= 6 && updatedSlots[j] === null) {
                updatedSlots[j] = updatedSlots[j - 6];
                updatedSlots[j - 6] = null;
                j -= 6;
              }
              updatedSlots[j] = generateRandomSymbol();
            }
          }
          setSlots(updatedSlots);
          setIsSpinning(false);
        }, 500);
      } else {
        setIsSpinning(false);
        setHasWinningCombination(false);
      }
    }
  }, [isSpinning, slots]);

  const tumble = () => {
    setIsSpinning(true);
    setSlots(generateRandomSymbols());
    setHasWinningCombination(false);
  };

  return (
    <div className="App">
      <h1>Tumble Slot Game</h1>
      <SlotGrid slots={slots} />
      <button onClick={tumble} disabled={isSpinning || hasWinningCombination}>Spin</button>
      {hasWinningCombination && <p>Winning Combination! Keep spinning...</p>}
    </div>
  );
};

export default TumbleSlotGame;
