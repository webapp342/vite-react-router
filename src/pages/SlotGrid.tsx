import React from 'react';
import styled from 'styled-components';
import Slot from './Slot';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin: 20px auto;
  max-width: 300px;
`;

interface SlotGridProps {
  slots: (string | null)[];
}

const SlotGrid: React.FC<SlotGridProps> = ({ slots }) => {
  return (
    <GridContainer>
      {slots.map((symbol, index) => (
        <Slot key={index} symbol={symbol} />
      ))}
    </GridContainer>
  );
};

export default SlotGrid;
