import React, { useState, useEffect } from 'react';

type SymbolType = 'A' | 'B' | 'C' | 'D' | 'E';

class Symbol {
  type: SymbolType;
  
  constructor(type: SymbolType) {
    this.type = type;
  }
}

class Grid {
  grid: Symbol[][];
  rows: number;
  cols: number;

  constructor(rows: number, cols: number, symbols: SymbolType[]) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.generateGrid(symbols);
  }

  generateGrid(symbols: SymbolType[]): Symbol[][] {
    let grid: Symbol[][] = [];
    for (let r = 0; r < this.rows; r++) {
      let row: Symbol[] = [];
      for (let c = 0; c < this.cols; c++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        row.push(new Symbol(randomSymbol));
      }
      grid.push(row);
    }
    return grid;
  }

  findClusters(): Set<string> {
    let clusters = new Set<string>();

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        let symbol = this.grid[r][c];
        let cluster = this.getCluster(r, c, symbol.type);
        if (cluster.size >= 8) {
          cluster.forEach(pos => clusters.add(pos));
        }
      }
    }
    return clusters;
  }

  getCluster(row: number, col: number, type: SymbolType): Set<string> {
    let visited = new Set<string>();
    let stack = [[row, col]];

    while (stack.length) {
      let [r, c] = stack.pop()!;
      let pos = `${r},${c}`;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && !visited.has(pos) && this.grid[r][c].type === type) {
        visited.add(pos);
        stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }
    }
    return visited;
  }

  removeClusters(clusters: Set<string>): void {
    clusters.forEach(pos => {
      let [r, c] = pos.split(',').map(Number);
      this.grid[r][c] = null!;
    });
    this.tumble();
  }

  tumble(): void {
    for (let c = 0; c < this.cols; c++) {
      let newCol: Symbol[] = this.grid.map(row => row[c]).filter(symbol => symbol !== null);
      while (newCol.length < this.rows) {
        newCol.unshift(new Symbol(this.getRandomSymbol()));
      }
      for (let r = 0; r < this.rows; r++) {
        this.grid[r][c] = newCol[r];
      }
    }
  }

  getRandomSymbol(): SymbolType {
    const symbols: SymbolType[] = ['A', 'B', 'C', 'D', 'E'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
}

interface GridProps {
  rows: number;
  cols: number;
  symbols: SymbolType[];
}

const GridComponent: React.FC<GridProps> = ({ rows, cols, symbols }) => {
  const [grid, setGrid] = useState<Symbol[][]>(new Grid(rows, cols, symbols).grid);

  const handleClusterRemoval = () => {
    const gridInstance = new Grid(rows, cols, symbols);
    const clusters = gridInstance.findClusters();
    gridInstance.removeClusters(clusters);
    setGrid([...gridInstance.grid]);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((symbol, colIndex) => (
          <div
            key={colIndex}
            style={{
              width: 30,
              height: 30,
              border: '1px solid black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.2em',
              backgroundColor: '#f0f0f0',
              margin: '2px',
            }}
          >
            {symbol ? symbol.type : ' '}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h2>Sweet Bonanza Grid</h2>
      <div>{renderGrid()}</div>
      <button onClick={handleClusterRemoval}>Remove Clusters</button>
    </div>
  );
};

export default GridComponent;
