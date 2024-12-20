import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

// Simple styled components without any animations
const CardWrapper = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  position: 'relative',
  width: '100%',
  height: '70vh',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
  padding: theme.spacing(3),
  color: 'white',
  borderBottomLeftRadius: theme.shape.borderRadius * 2,
  borderBottomRightRadius: theme.shape.borderRadius * 2,
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  zIndex: 2,
}));

const ActionButton = styled(IconButton)(({ theme, color }) => ({
  backgroundColor: '#fff',
  border: `2px solid ${
    color === 'like' 
      ? theme.palette.success.main 
      : color === 'superlike' 
        ? '#00bcd4' 
        : theme.palette.error.main
  }`,
  padding: theme.spacing(1.5),
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: color === 'like' 
      ? theme.palette.success.main 
      : color === 'superlike' 
        ? '#00bcd4' 
        : theme.palette.error.main,
    transform: 'scale(1.1)',
    '& svg': {
      color: 'white',
    },
  },
  '& svg': {
    color: color === 'like' 
      ? theme.palette.success.main 
      : color === 'superlike' 
        ? '#00bcd4' 
        : theme.palette.error.main,
    fontSize: '1.8rem',
    transition: 'color 0.2s ease',
  },
}));

const ActionIndicator = styled(Box)(({ type }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '16px 32px',
  borderRadius: '8px',
  fontSize: '48px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  border: '6px solid',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  ...(type === 'like' ? {
    color: '#4CAF50',
    borderColor: '#4CAF50',
  } : type === 'superlike' ? {
    color: '#00bcd4',
    borderColor: '#00bcd4',
  } : {
    color: '#f44336',
    borderColor: '#f44336',
  }),
}));

const SwipeCard = ({ user, onLike, onPass, onSuperLike }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [action, setAction] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAction = (type) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAction(type);

    // Simple timeout to handle the action after showing the indicator
    setTimeout(() => {
      if (type === 'like') onLike();
      else if (type === 'superlike') onSuperLike?.();
      else onPass();
    }, 500);
  };

  const nextPhoto = () => {
    if (currentPhotoIndex < user.profile.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <CardWrapper>
      {action && (
        <ActionIndicator type={action}>
          {action === 'like' ? 'LIKE' : action === 'superlike' ? 'SUPER' : 'NOPE'}
        </ActionIndicator>
      )}

      <CardMedia
        component="img"
        height="100%"
        image={user.profile.photos[currentPhotoIndex]}
        alt={`${user.profile.firstName}'s photo`}
        onClick={nextPhoto}
        onContextMenu={(e) => {
          e.preventDefault();
          previousPhoto();
        }}
        sx={{ objectFit: 'cover' }}
      />

      <CardOverlay>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {user.profile.firstName}, {user.profile.age}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationIcon sx={{ mr: 1 }} />
          <Typography variant="body1">
            {user.profile.location?.city || 'Nearby'}
          </Typography>
        </Box>

        {user.profile.occupation && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <WorkIcon sx={{ mr: 1 }} />
            <Typography variant="body1">{user.profile.occupation}</Typography>
          </Box>
        )}

        {user.profile.education && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon sx={{ mr: 1 }} />
            <Typography variant="body1">{user.profile.education}</Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {user.profile.interests?.map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              }}
            />
          ))}
        </Box>
      </CardOverlay>

      <ActionButtons>
        <ActionButton 
          color="pass" 
          onClick={() => handleAction('nope')}
          disabled={isAnimating}
        >
          <CloseIcon />
        </ActionButton>
        <ActionButton 
          color="superlike" 
          onClick={() => handleAction('superlike')}
          disabled={isAnimating}
        >
          <StarIcon />
        </ActionButton>
        <ActionButton 
          color="like" 
          onClick={() => handleAction('like')}
          disabled={isAnimating}
        >
          <FavoriteIcon />
        </ActionButton>
      </ActionButtons>
    </CardWrapper>
  );
};

export default SwipeCard; 