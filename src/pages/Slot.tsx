import React from 'react';
import styled from 'styled-components';

const SlotContainer = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

interface SlotProps {
  symbol: string | null;
}

const Slot: React.FC<SlotProps> = ({ symbol }) => {
  return (
    <SlotContainer>
      {symbol}
    </SlotContainer>
  );
};

export default Slot;
