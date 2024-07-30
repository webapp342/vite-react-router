// components/GameBoard.tsx

import React, { useState, useEffect } from 'react';
import { generateBoard, processBoard, Symbol } from '../utils/gameLogic';
import SymbolComponent from './Symbol';
import { getInitialBalance, setBalance } from '../utils/storage';
import './GameBoard.css';

const rows = 6;
const cols = 6;

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState<Symbol[][]>(generateBoard(rows, cols));
  const [balance, setLocalBalance] = useState<number>(getInitialBalance());
  const [bet, setBet] = useState<number>(0);

  useEffect(() => {
    setBalance(balance);
  }, [balance]);

  const handleSpin = () => {
    if (bet <= 0 || bet > balance) {
      alert("Geçerli bir bahis girin ve bakiyenizden daha fazla bahis yapmayın.");
      return;
    }

    // Bahsi öde ve bakiyeyi güncelle
    const updatedBalance = balance - bet;
    setLocalBalance(updatedBalance);
    setBalance(updatedBalance);

    // Döndürme işlemini başlat
    let newBoard = generateBoard(rows, cols);
    let totalWinAmount = 0;

    while (true) {
      const { updatedBoard, winAmount } = processBoard(newBoard);
      if (winAmount === 0) {
        break;
      }
      newBoard = updatedBoard;
      totalWinAmount += winAmount;
    }

    // Kazançları bakiyeye ekle
    const finalBalance = updatedBalance + totalWinAmount;
    setLocalBalance(finalBalance);
    setBalance(finalBalance);
  };

  return (
    <div className="game-board">
      <div>
        <label>Bahis Miktarı:</label>
        <input
          type="number"
          value={bet}
          onChange={(e) => setBet(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSpin}>Spin</button>
      <div>Bakiye: ${balance}</div>
      {board.map((row, rowIndex) => (
        <div className="game-row" key={rowIndex}>
          {row.map((symbol, colIndex) => (
            <SymbolComponent key={colIndex} symbol={symbol} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
