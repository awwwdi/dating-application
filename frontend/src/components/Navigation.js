import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  // eslint-disable-next-line no-unused-vars
  IconButton,
  Badge,
  Box,
  styled,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.appBar,
}));

const LogoImage = styled('img')({
  height: 32,
});

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme, $isActive }) => ({
  position: 'relative',
  color: $isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  '& .MuiBottomNavigationAction-label': {
    fontWeight: $isActive ? 'bold' : 'normal',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 4,
    backgroundColor: $isActive ? theme.palette.primary.main : 'transparent',
    transition: 'background-color 0.3s ease',
  },
}));

function Navigation({ unreadMessages = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(getInitialTab());

  function getInitialTab() {
    const path = location.pathname;
    if (path.includes('/chat')) return 1;
    if (path.includes('/profile')) return 2;
    if (path.includes('/settings')) return 3;
    return 0; // Discovery/Home tab
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/chat');
        break;
      case 2:
        navigate('/profile');
        break;
      case 3:
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StyledAppBar position="fixed" color="default">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <LogoImage
              src="/bumble-logo.svg"
              alt="Bumble"
            />
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <StyledBottomNavigationAction
          label="Discover"
          icon={<FavoriteIcon />}
          $isActive={value === 0}
        />
        <StyledBottomNavigationAction
          label="Messages"
          icon={
            <Badge badgeContent={unreadMessages} color="primary">
              <ChatIcon />
            </Badge>
          }
          $isActive={value === 1}
        />
        <StyledBottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          $isActive={value === 2}
        />
        <StyledBottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          $isActive={value === 3}
        />
      </StyledBottomNavigation>
    </>
  );
}

export default Navigation;