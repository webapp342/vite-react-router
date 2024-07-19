import * as React from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState<number>(0);
  const navigate = useNavigate();

  const handleNavigationChange = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/vite-react-router/');
        break;
      case 1:
        navigate('/vite-react-router/farm');
        break;
      case 2:
        navigate('/vite-react-router/user-details');
        break;
      case 3:
        navigate('/vite-react-router/user-profile-page');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => handleNavigationChange(newValue)}
      showLabels
      sx={{
        '& .Mui-selected': {
          color: 'primary.main',
        },
        '& .MuiBottomNavigationAction-root': {
          color: 'text.secondary',
        },
        '& .MuiBottomNavigationAction-label': {
          fontSize: '0.75rem',
          '&.Mui-selected': {
            fontSize: '0.85rem',
          },
        },
      }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        label="Tasks"
        icon={<TaskOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Frens"
        icon={<Diversity1RoundedIcon />}
      />
      <BottomNavigationAction
        label="Wallet"
        icon={<AccountBalanceWalletOutlinedIcon />}
      />
    </BottomNavigation>
  );
}
