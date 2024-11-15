import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import WalletIcon from '@mui/icons-material/Wallet';
import { Box } from '@mui/material';

const navItems = [
  { label: 'HOME', icon: <HomeRoundedIcon />, path: '/vite-react-router/' },
  { label: 'WALLET', icon: <WalletIcon />, path: '/vite-react-router/farm' },
  { label: 'TASKS', icon: <TaskOutlinedIcon />, path: '/vite-react-router/user-details' },
  { label: 'PROFILE', icon: <Diversity1RoundedIcon />, path: '/vite-react-router/user-profile-page' },
  { label: 'PROFILE', icon: <Diversity1RoundedIcon />, path: '/vite-react-router/user-profile-page' },

];

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState<number>(0);
  const navigate = useNavigate();

  const handleNavigationChange = (newValue: number) => {
    setValue(newValue);
    navigate(navItems[newValue].path);
  };

  return (
    <Box
      sx={{
        bgcolor: '#131313',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 6,
        alignItems: 'center',
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => handleNavigationChange(newValue)}
        showLabels
        className="bottom-navigation"
        sx={{
          borderColor: '#cff008',
          gap: 1,
          bgcolor: '#212121',
          mb: 5,
          px: 4,
          pb: 0,
          pt: 1,
          borderRadius: 5,
          maxWidth: "100%",
        }}
      >
        {navItems.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            icon={item.icon}
            sx={{
              borderRadius: 14,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              pb: 0,
              color: value === index ? '#131313' : '#616161',
              bgcolor: value === index ? '#cff008' : '',
              minWidth: 2,
              margin: 0,
              '& .MuiSvgIcon-root': {
                fontSize: value === index ? '2rem' : '1.5rem', // Change font size based on selection
                color: value === index ? '#131313' : '#9E9E9E',
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}