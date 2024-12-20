import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  styled,
  Typography,
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
  zIndex: 1100,
}));

const NavContainer = styled('div')({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
});

const StyledBottomNavigation = styled(BottomNavigation)({
  position: 'relative',
  height: '60px',
});

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  minWidth: 0,
  padding: '6px 0',
  color: theme.palette.text.secondary,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
    borderRadius: '4px 4px 0 0',
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    '&::after': {
      width: '60%',
    }
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.75rem',
    transition: 'all 0.3s ease',
    '&.Mui-selected': {
      fontSize: '0.75rem',
    }
  },
}));

const LogoImage = styled('img')({
  height: 32,
  width: 'auto',
  display: 'block',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
});

const LogoText = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: '#000',
  userSelect: 'none',
});

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
      {/* Temporarily removing top navigation bar
      <StyledAppBar position="fixed" color="default">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <LogoContainer onClick={() => navigate('/')}>
              <LogoImage 
                src="/DateZone.png" 
                alt="DateZone Logo"
                style={{ objectFit: 'contain' }}
              />
              <LogoText>DateZone</LogoText>
            </LogoContainer>
          </Box>
        </Toolbar>
      </StyledAppBar>
      */}

      <NavContainer>
        <StyledBottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
        >
          <StyledBottomNavigationAction
            label="Discover"
            icon={<FavoriteIcon />}
          />
          <StyledBottomNavigationAction
            label="Messages"
            icon={
              <Badge badgeContent={unreadMessages} color="primary">
                <ChatIcon />
              </Badge>
            }
          />
          <StyledBottomNavigationAction
            label="Profile"
            icon={<PersonIcon />}
          />
          <StyledBottomNavigationAction
            label="Settings"
            icon={<SettingsIcon />}
          />
        </StyledBottomNavigation>
      </NavContainer>
    </>
  );
}

export default Navigation; 