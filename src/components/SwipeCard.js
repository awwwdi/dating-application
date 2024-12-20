import React, { useState, useRef } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Close, Favorite, Star } from '@mui/icons-material';

const CardContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '75%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  zIndex: 1,
});

const CardWrapper = styled(Box)(({ isDragging, isActive, showDetails }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  cursor: isActive && !isDragging ? 'grab' : isDragging ? 'grabbing' : 'default',
  transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  transformStyle: 'preserve-3d',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  willChange: 'transform',
  pointerEvents: isActive ? 'auto' : 'none',
  backgroundColor: 'white',
  overflow: 'hidden',
  zIndex: 1,
}));

const ProfileImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
});

const PhotoNavigation = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  display: 'flex',
  '& > *': {
    flex: 1,
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.2s',
    '&:hover': {
      background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent, transparent)',
      '&:last-child': {
        background: 'linear-gradient(to left, rgba(0,0,0,0.1), transparent, transparent)',
      }
    }
  }
});

const ProfileInfo = styled(Box)(({ showDetails }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  backgroundColor: showDetails ? 'white' : 'transparent',
  background: showDetails 
    ? 'white' 
    : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
  color: showDetails ? '#000' : '#fff',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: `translateY(${showDetails ? '50%' : '0'})`,
  height: showDetails ? '50%' : 'auto',
  overflow: 'auto',
  borderRadius: showDetails ? '20px 20px 0 0' : '0',
  boxShadow: showDetails ? '0 -4px 10px rgba(0, 0, 0, 0.1)' : 'none',
  '& .MuiTypography-root': {
    color: 'inherit',
    transition: 'color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '2px',
  }
}));

const PhotoIndicators = styled(Box)({
  position: 'absolute',
  top: '10px',
  left: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
  padding: '0 10px',
  zIndex: 3,
});

const PhotoIndicator = styled(Box)(({ active }) => ({
  height: '3px',
  flex: 1,
  maxWidth: '60px',
  backgroundColor: active ? 'white' : 'rgba(255, 255, 255, 0.5)',
  borderRadius: '2px',
  transition: 'all 0.3s ease',
}));

const InterestTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
  '& .MuiChip-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    }
  }
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '20px',
  zIndex: 2,
});

const ActionButton = styled(Box)(({ color = 'primary' }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  '& svg': {
    fontSize: '28px',
    color: color === 'error' ? '#ff4b4b' : 
           color === 'success' ? '#4caf50' : 
           '#2196f3',
  },
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: color === 'error' ? '#ff4b4b' : 
                    color === 'success' ? '#4caf50' : 
                    '#2196f3',
    '& svg': {
      color: 'white',
    }
  }
}));

const ActionIndicator = styled(Box)(({ type }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: type === 'like' ? '#4caf50' :
                  type === 'nope' ? '#ff4b4b' :
                  '#2196f3',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '24px',
  zIndex: 3,
  pointerEvents: 'none',
}));

const SparkleContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 3,
});

const SparkleEffect = styled(Box)(({ delay, size, color }) => ({
  position: 'absolute',
  width: size,
  height: size,
  backgroundColor: color,
  borderRadius: '50%',
  animation: `sparkle 1s ease-in-out ${delay}s`,
  '@keyframes sparkle': {
    '0%': {
      transform: 'scale(0) rotate(0deg)',
      opacity: 0,
    },
    '50%': {
      transform: 'scale(1) rotate(180deg)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(0) rotate(360deg)',
      opacity: 0,
    },
  },
}));

function SwipeCard({ user, onLike, onPass, onSuperLike, isActive }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [action, setAction] = useState(null);
  const [stars, setStars] = useState([]);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!isActive) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isActive) return;
    const x = e.clientX - dragStart.x;
    const y = e.clientY - dragStart.y;
    setDragOffset({ x, y });

    const rotation = x * 0.1;
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    }

    if (x > 100) {
      setAction('like');
    } else if (x < -100) {
      setAction('nope');
    } else {
      setAction(null);
    }
  };

  const createStars = () => {
    const newStars = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    }));
    setStars(newStars);
  };

  const handleSwipeEnd = () => {
    if (!isDragging || !isActive) return;
    setIsDragging(false);
    const x = dragOffset.x;

    if (x > 100) {
      createStars();
      onLike();
    } else if (x < -100) {
      onPass();
    } else {
      if (cardRef.current) {
        cardRef.current.style.transform = 'none';
      }
    }
    setDragOffset({ x: 0, y: 0 });
    setAction(null);
  };

  const handleActionClick = (actionType) => {
    if (!isActive) return;
    
    switch (actionType) {
      case 'like':
        createStars();
        onLike();
        break;
      case 'nope':
        onPass();
        break;
      case 'superlike':
        createStars();
        onSuperLike();
        break;
      default:
        break;
    }
  };

  const handlePhotoNavigation = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;

    if (isLeftHalf && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    } else if (!isLeftHalf && currentPhotoIndex < user.profile.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    }
  };

  const handleProfileClick = (e) => {
    if (!isActive || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    if (clickY > rect.height * 0.6) {
      setShowDetails(!showDetails);
    }
  };

  if (!user || !user.profile) {
    return (
      <CardContainer>
        <CardWrapper sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Typography variant="h6" color="text.secondary">
            No more profiles
          </Typography>
        </CardWrapper>
      </CardContainer>
    );
  }

  const profile = user.profile;

  return (
    <CardContainer>
      <CardWrapper
        ref={cardRef}
        isDragging={isDragging}
        isActive={isActive}
        showDetails={showDetails}
        onClick={handleProfileClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleSwipeEnd}
        onMouseLeave={handleSwipeEnd}
        style={{
          transform: isDragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : 'none'
        }}
      >
        <ProfileImage
          src={profile.photos[currentPhotoIndex]}
          alt={`${profile.firstName}'s photo`}
          style={{
            filter: showDetails ? 'brightness(0.4)' : 'none',
            transform: showDetails ? 'scale(1.05)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        <PhotoIndicators>
          {profile.photos.map((_, index) => (
            <PhotoIndicator key={index} active={index === currentPhotoIndex} />
          ))}
        </PhotoIndicators>

        <PhotoNavigation>
          <Box onClick={handlePhotoNavigation} />
          <Box onClick={handlePhotoNavigation} />
        </PhotoNavigation>

        <ProfileInfo showDetails={showDetails}>
          <Typography variant="h5" component="h2" sx={{ 
            fontWeight: 'bold',
            fontSize: showDetails ? '2rem' : '1.5rem',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            marginBottom: showDetails ? '16px' : '4px'
          }}>
            {profile.firstName}, {profile.age}
          </Typography>
          
          <Typography variant="body1" sx={{ 
            opacity: 0.9,
            marginBottom: showDetails ? '20px' : '0',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            {profile.location.city}
          </Typography>

          {showDetails && (
            <Box sx={{ 
              opacity: showDetails ? 1 : 0,
              transform: showDetails ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: '0.1s'
            }}>
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                {profile.bio}
              </Typography>

              <Box mt={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '12px' }}>
                  Interests
                </Typography>
                <InterestTags>
                  {profile.interests.map((interest, index) => (
                    <Chip key={index} label={interest} />
                  ))}
                </InterestTags>
              </Box>

              {profile.occupation && (
                <Box mt={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Occupation
                  </Typography>
                  <Typography variant="body1">
                    {profile.occupation}
                  </Typography>
                </Box>
              )}

              {profile.education && (
                <Box mt={2}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Education
                  </Typography>
                  <Typography variant="body1">
                    {profile.education}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </ProfileInfo>

        {action && (
          <>
            <SparkleContainer>
              {stars.map((star) => (
                <SparkleEffect
                  key={star.id}
                  sx={{
                    top: star.top,
                    left: star.left,
                  }}
                  delay={star.delay}
                  size={star.size}
                  color={star.color}
                />
              ))}
            </SparkleContainer>
            <ActionIndicator type={action}>
              {action === 'like' ? 'LIKE' : action === 'superlike' ? 'SUPER' : 'NOPE'}
            </ActionIndicator>
          </>
        )}
      </CardWrapper>

      <ActionButtons>
        <ActionButton
          color="error"
          onClick={() => handleActionClick('nope')}
        >
          <Close />
        </ActionButton>
        <ActionButton
          color="info"
          onClick={() => handleActionClick('superlike')}
        >
          <Star />
        </ActionButton>
        <ActionButton
          color="success"
          onClick={() => handleActionClick('like')}
        >
          <Favorite />
        </ActionButton>
      </ActionButtons>
    </CardContainer>
  );
}

SwipeCard.defaultProps = {
  onLike: () => {},
  onPass: () => {},
  onSuperLike: () => {},
  isActive: false,
};

export default SwipeCard; 