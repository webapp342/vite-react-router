import * as React from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { styled } from '@mui/system';

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme, selected }) => ({
  color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
  '& .Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

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
      className="bottom-navigation"
    >
      <StyledBottomNavigationAction
        label="Home"
        icon={<HomeRoundedIcon />}
        selected={value === 0}
      />
      <StyledBottomNavigationAction
        label="Tasks"
        icon={<TaskOutlinedIcon />}
        selected={value === 1}
      />
      <StyledBottomNavigationAction
        label="Frens"
        icon={<Diversity1RoundedIcon />}
        selected={value === 2}
      />
      <StyledBottomNavigationAction
        label="Wallet"
        icon={<AccountBalanceWalletOutlinedIcon />}
        selected={value === 3}
      />
    </BottomNavigation>
  );
}
