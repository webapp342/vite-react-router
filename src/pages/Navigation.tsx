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
      className="bottom-navigation"
    >
      <BottomNavigationAction
        className="bottom-navigation-action"
        label="Home"
        icon={<HomeRoundedIcon />}
        sx={{
          color: value === 0 ? 'white' : 'grey',
          minWidth: 0,
          margin: 0,
          padding: 0,
          '& .MuiBottomNavigationAction-label': {
            color: value === 0 ? 'white' : 'grey',
          },
          '& .MuiSvgIcon-root': {
            color: value === 0 ? 'white' : 'grey',
          },
        }}
      />
      <BottomNavigationAction
        className="bottom-navigation-action"
        label="Tasks"
        icon={<TaskOutlinedIcon />}
        sx={{
          color: value === 1 ? 'white' : 'grey',
          minWidth: 0,
          margin: 0,
          padding: 0,
          '& .MuiBottomNavigationAction-label': {
            color: value === 1 ? 'white' : 'grey',
          },
          '& .MuiSvgIcon-root': {
            color: value === 1 ? 'white' : 'grey',
          },
        }}
      />
      <BottomNavigationAction
        className="bottom-navigation-action"
        label="Frens"
        icon={<Diversity1RoundedIcon />}
        sx={{
          color: value === 2 ? 'white' : 'grey',
          minWidth: 0,
          margin: 0,
          padding: 0,
          '& .MuiBottomNavigationAction-label': {
            color: value === 2 ? 'white' : 'grey',
          },
          '& .MuiSvgIcon-root': {
            color: value === 2 ? 'white' : 'grey',
          },
        }}
      />
      <BottomNavigationAction
        className="bottom-navigation-action"
        label="Wallet"
        icon={<AccountBalanceWalletOutlinedIcon />}
        sx={{
          color: value === 3 ? 'white' : 'grey',
          minWidth: 0,
          margin: 0,
          padding: 0,
          '& .MuiBottomNavigationAction-label': {
            color: value === 3 ? 'white' : 'grey',
          },
          '& .MuiSvgIcon-root': {
            color: value === 3 ? 'white' : 'grey',
          },
        }}
      />
    </BottomNavigation>
  );
}
