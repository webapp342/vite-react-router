import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Box } from '@mui/material';

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
        case 4:
        navigate('/vite-react-router/WheelSpin');
        break;
      default:
        break;
    }
  };

  return (
    <Box
     sx={{   
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 6,
          alignItems: 'center',
         }}>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => handleNavigationChange(newValue)}
        showLabels
        className="bottom-navigation"
        sx={{
          border: 2,
          borderColor: 'white',
          gap: 5,
          mb: 6,
          padding:1,
          borderRadius: 6,
          boxShadow: 10,
          maxWidth: '90%',
        }} // Adjust this value if needed
      >
        <BottomNavigationAction
                  className="bottom-navigation-action"

          icon={ <HomeRoundedIcon fontSize='large'/>}
          sx={{
            border:1,
            color: value === 0 ? 'white' : 'grey',
            minWidth: 0,
            margin: 0,
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

          icon={<WalletIcon fontSize='large' />}
          sx={{
            border:1,

            color: value === 1 ? 'white' : 'grey',
            minWidth: 0,
            margin: 0,
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

          icon={<TaskOutlinedIcon fontSize='large'/>}
          sx={{
            border:1,

            color: value === 2 ? 'white' : 'grey',
            minWidth: 0,
            margin: 0,
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

          icon={<Diversity1RoundedIcon fontSize='large' />}
          sx={{
            border:1,

            color: value === 3 ? 'white' : 'grey',
            minWidth: 0,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value === 3 ? 'white' : 'grey',
            },
            '& .MuiSvgIcon-root': {
              color: value === 3 ? 'white' : 'grey',
            },
          }}
        />
        <BottomNavigationAction
          className="bottom-navigation-action"
          icon={<AccountBalanceWalletOutlinedIcon fontSize='large' />}
          sx={{
            border:1,

            color: value === 4 ? 'white' : 'grey',
            minWidth: 0,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value === 4 ? 'white' : 'grey',
            },
            '& .MuiSvgIcon-root': {
              color: value === 4 ? 'white' : 'grey',
            },
          }}
        />
      </BottomNavigation>
    </Box>
  );
}