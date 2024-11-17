import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CryptoTable from './CryptoTable.tsx';
import MetalsTable from './MetalsTable.tsx';
import ForexTable from './ForexTable.tsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: 8,
  textAlign: 'center',
  width: '100%',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Three: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'forex' | 'metals'>('crypto');

  const renderTable = () => {
    switch (activeTab) {
      case 'crypto':
        return <CryptoTable />;
      case 'forex':
        return <ForexTable />;
      case 'metals':
        return <MetalsTable />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Üst Menü */}
      <Box mb={2} m={1}>
        <Stack direction="row" spacing={2}>
          <Item onClick={() => setActiveTab('crypto')} sx={{ backgroundColor: activeTab === 'crypto' ? ' #f6f5f0' : '#fff', color: activeTab === 'crypto' ? 'black' : 'dark' , fontWeight: activeTab === 'crypto' ? 'bold' : 'light'}}>
            CRYPTO
          </Item>
          <Item onClick={() => setActiveTab('forex')} sx={{ backgroundColor: activeTab === 'forex' ? ' #f6f5f0' : '#fff', color: activeTab === 'forex' ? 'black' : 'dark' , fontWeight: activeTab === 'forex' ? 'bold' : 'light'}}>
            FOREX
          </Item>
          <Item onClick={() => setActiveTab('metals')} sx={{ backgroundColor: activeTab === 'metals' ? ' #f6f5f0' : '#fff', color: activeTab === 'metals' ? 'black' : 'dark' , fontWeight: activeTab === 'metals' ? 'bold' : 'light'}}>
            COMMODITIES
          </Item> 
        </Stack>
      </Box>

      {/* Seçilen Tablo */}
      <Box>{renderTable()}</Box>
    </Box>
  );
};

export default Three;
