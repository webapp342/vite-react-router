import { Container, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow , 
  TableBody,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const LocalStorageViewer: React.FC = () => {
  const [localStorageData, setLocalStorageData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Local storage'daki verileri oku
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key) || '';
      }
    }
    setLocalStorageData(data);
  }, []);

  return (
    <Container sx={{textAlign: 'center', marginTop: "180px"}} >
      <h2>Local Storage Viewer</h2>
      <TableContainer component={Paper} sx={{alignItems: 'center', textAlign: 'center'}}>
      <TableHead>
          <TableRow>
            <TableCell>Value</TableCell>
            <TableCell>Key</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(localStorageData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{value}</TableCell>
              <TableCell>{key}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </Container>
  );
};

export default LocalStorageViewer;
