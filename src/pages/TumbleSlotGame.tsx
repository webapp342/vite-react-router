import React from 'react';
import GridComponent from './GridComponent';

const TumbleSlotGame: React.FC = () => {
  const symbols: SymbolType[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div>
      <GridComponent rows={5} cols={5} symbols={symbols} />
    </div>
  );
};

export default TumbleSlotGame;
