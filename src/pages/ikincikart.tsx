import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  borderRadius: 8,
  textAlign: 'center',
  width: '100%',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function IkinciKart() {
  return (
    <Box
    mb={2}
    m={1}
   >
      <Stack direction="row" spacing={2}>
        <Item>CRYPTO</Item>
        <Item>FOREX</Item>
        <Item>METALS</Item>
      </Stack>
    </Box>
  );
}




