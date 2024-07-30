// utils/gameLogic.ts

export type SymbolType = 'fruit' | 'candy';
export interface Symbol {
  type: SymbolType;
  value: number;
}

export const symbols: Symbol[] = [
  { type: 'fruit', value: 1 },
  { type: 'candy', value: 2 },
  // Diğer semboller
];

export const getRandomSymbol = (): Symbol => {
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
};

export const generateBoard = (rows: number, cols: number): Symbol[][] => {
  const board: Symbol[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Symbol[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(getRandomSymbol());
    }
    board.push(row);
  }
  return board;
};

export const processBoard = (board: Symbol[][]) => {
  let winAmount = 0;
  const newBoard = board.map(row => row.slice());
  
  const checkForWins = (board: Symbol[][]): { updatedBoard: Symbol[][], winAmount: number } => {
    let localWinAmount = 0;
    let boardChanged = false;
    
    // Semboller için kazançları kontrol et
    for (let row = 0; row < rows; row++) {
      const rowSymbols = newBoard[row];
      const symbolCounts = new Map<SymbolType, number>();

      for (const symbol of rowSymbols) {
        const count = symbolCounts.get(symbol.type) || 0;
        symbolCounts.set(symbol.type, count + 1);
      }

      for (const [type, count] of symbolCounts.entries()) {
        if (count >= 8) {
          localWinAmount += 100; // Her 8 sembol için 100 dolar kazanç
          boardChanged = true;
          
          // Sembolleri kaldır ve yenileri ekle
          for (let i = 0; i < rowSymbols.length; i++) {
            if (rowSymbols[i].type === type) {
              rowSymbols[i] = getRandomSymbol(); // Bu sembolü kaldır ve yenisiyle değiştir
            }
          }
        }
      }
    }
    
    // Yeni sembolleri döndür
    return { updatedBoard: boardChanged ? newBoard : board, winAmount: localWinAmount };
  };
  
  let totalWinAmount = 0;
  let result = checkForWins(newBoard);
  while (result.winAmount > 0) {
    totalWinAmount += result.winAmount;
    result = checkForWins(result.updatedBoard);
  }
  
  return { updatedBoard: result.updatedBoard, winAmount: totalWinAmount };
};
