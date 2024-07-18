import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

  // Scroll olaylarını dinlemeye gerek yok, sadece tıklama ile değeri güncelleyeceğiz

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => handleNavigationChange(newValue)}
      showLabels
      className="bottom-navigation"
    >
      <BottomNavigationAction label="Home" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Farm" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="User Details" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Profile" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}
