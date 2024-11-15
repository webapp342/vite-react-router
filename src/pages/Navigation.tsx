import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import WalletIcon from '@mui/icons-material/Wallet';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
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
      bgcolor: '#131313' ,
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
          
          borderColor: '#cff008',
          gap: 1,
          bgcolor: '#212121',
          mb: 6,
          padding:1,
          borderRadius: 10,
          boxShadow: 3,
          maxWidth: '90%',
        }} // Adjust this value if needed
      >
        
        <BottomNavigationAction
          icon={ <HomeRoundedIcon  />}
          label='home'
          sx={{
            showlabel: value === 0 ? 'showlabel' : '',
            borderRadius: value === 0 ? 10 : 10,
            padding: 2,
            color: value === 0 ? '#131313' : '#616161',
            bgcolor: value === 0 ? '#cff008' : '#424242',
            minWidth: 5,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value === 0 ? 'black' : '',
            },
            '& .MuiSvgIcon-root': {
              color: value === 0 ? 'black' : '#9E9E9E',
            },
          }}
        />
        <BottomNavigationAction

          icon={<WalletIcon />}
          sx={{
            
            borderRadius: value === 0 ? 12 : 12,
            padding: 2,
            color: value ===  1 ? '#131313' : '#616161',
            bgcolor: value ===  1 ? '#cff008' : '#424242',
            minWidth: 2,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value ===  1 ? 'white' : 'grey',
            },
            '& .MuiSvgIcon-root': {
              color: value ===  1 ? '#131313' : '#9E9E9E',
            },
          }}
        /> 
        <BottomNavigationAction

          icon={<TaskOutlinedIcon />}
          sx={{
            
            borderRadius: value === 0 ? 10 : 10,
            padding: 2,
            color: value ===   2 ? '#131313' : '#616161',
            bgcolor: value ===   2 ? '#cff008' : '#424242',
            minWidth: 2,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value ===   2 ? 'white' : 'grey',
            },
            '& .MuiSvgIcon-root': {
              color: value ===   2 ? '#131313' : '#9E9E9E',
            },
          }}
        /> 
        <BottomNavigationAction

          icon={<Diversity1RoundedIcon  />}
        sx={{
            
            borderRadius: value === 0 ? 10 : 10,
            padding:2,
            color: value ===   3 ? '#131313' : '#616161',
            bgcolor: value ===   3 ? 'white' : '#424242',
            minWidth: 2,
            margin: 0,
            '& .MuiBottomNavigationAction-label': {
              color: value ===   3 ? 'white' : 'grey',
            },
            '& .MuiSvgIcon-root': {
              color: value ===   3 ? '#131313' : '#9E9E9E',
            },
          }}
        />  
       
      </BottomNavigation>
    </Box>
  );
}