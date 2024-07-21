import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bgcolor="white"
      zIndex="9999"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
