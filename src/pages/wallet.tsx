import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
//import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function BasicStack() {
  return (
      <Stack 
      spacing={1} 
      sx={{ 
        width: '100%' , 
        borderRadius: '',
        }}> 

        <Item>Item 1</Item>
        
      </Stack>
  );
}