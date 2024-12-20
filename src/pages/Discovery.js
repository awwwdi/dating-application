import React, { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import SwipeCard from '../components/SwipeCard';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '40px',
  backgroundColor: '#f5f5f5',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 600px)': {
    paddingTop: '20px',
  }
});

const CardsContainer = styled(Box)({
  position: 'relative',
  width: '340px',
  height: '720px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '80px',
  zIndex: 1,
  '& > *': {
    width: '100%',
    height: '600px',
  }
});

const CardWrapper = styled(Box)(({ index }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  transform: `translateY(${index * -4}px) scale(${1 - index * 0.05})`,
  zIndex: 1000 - index,
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  opacity: 1 - index * 0.2,
}));

// Mock data
const mockProfiles = [
  {
    _id: 1,
    profile: {
      firstName: "Sarah",
      age: 26,
      location: {
        city: "New York City"
      },
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      ],
      bio: "Adventure seeker and coffee enthusiast. Love exploring new places and trying different cuisines.",
      interests: ["Travel", "Photography", "Cooking", "Hiking", "Coffee"],
      occupation: "UX Designer",
      education: "Parsons School of Design"
    }
  },
  {
    _id: 2,
    profile: {
      firstName: "Michael",
      age: 28,
      location: {
        city: "San Francisco"
      },
      photos: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      ],
      bio: "Tech enthusiast and amateur chef. When I'm not coding, you'll find me experimenting in the kitchen or hiking trails.",
      interests: ["Technology", "Cooking", "Hiking", "Gaming", "Music"],
      occupation: "Software Engineer",
      education: "Stanford University"
    }
  },
  {
    _id: 3,
    profile: {
      firstName: "Emma",
      age: 24,
      location: {
        city: "Los Angeles"
      },
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        "https://images.unsplash.com/photo-1521146764736-56c929d59c83",
        "https://images.unsplash.com/photo-1524638431109-93d95c968f03",
      ],
      bio: "Aspiring actress and yoga instructor. Living life one sun salutation at a time.",
      interests: ["Acting", "Yoga", "Meditation", "Beach", "Movies"],
      occupation: "Yoga Instructor",
      education: "UCLA School of Theater"
    }
  },
  {
    _id: 4,
    profile: {
      firstName: "James",
      age: 29,
      location: {
        city: "Chicago"
      },
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        "https://images.unsplash.com/photo-1463453091185-61582044d556",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
      ],
      bio: "Music producer by day, foodie by night. Always on the lookout for the city's best pizza.",
      interests: ["Music", "Food", "Concerts", "Travel", "Photography"],
      occupation: "Music Producer",
      education: "Berklee College of Music"
    }
  },
  {
    _id: 5,
    profile: {
      firstName: "Sofia",
      age: 25,
      location: {
        city: "Miami"
      },
      photos: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      ],
      bio: "Dance instructor and beach lover. Salsa is my love language.",
      interests: ["Dancing", "Beach", "Fitness", "Languages", "Travel"],
      occupation: "Dance Instructor",
      education: "Miami Dance Academy"
    }
  }
];

const Discovery = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleLike = () => {
    const currentProfile = mockProfiles[currentProfileIndex].profile;
    showNotification(`You liked ${currentProfile.firstName}! 💖`, 'success');
    if (Math.random() > 0.5) {
      setTimeout(() => {
        showNotification(`It's a match! ${currentProfile.firstName} liked you too! 🎉`, 'info');
      }, 1000);
    }
    if (currentProfileIndex < mockProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  const handlePass = () => {
    const currentProfile = mockProfiles[currentProfileIndex].profile;
    showNotification(`You passed on ${currentProfile.firstName}`, 'error');
    if (currentProfileIndex < mockProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  const handleSuperLike = () => {
    const currentProfile = mockProfiles[currentProfileIndex].profile;
    showNotification(`You super liked ${currentProfile.firstName}! ⭐`, 'info');
    if (Math.random() > 0.3) {
      setTimeout(() => {
        showNotification(`${currentProfile.firstName} super liked you back! 🌟`, 'info');
      }, 1000);
    }
    if (currentProfileIndex < mockProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  const renderCards = () => {
    const nextProfiles = mockProfiles.slice(currentProfileIndex, currentProfileIndex + 3);
    return nextProfiles.map((profile, index) => (
      <CardWrapper key={profile._id} index={index}>
        <SwipeCard
          user={profile}
          onLike={index === 0 ? handleLike : undefined}
          onPass={index === 0 ? handlePass : undefined}
          onSuperLike={index === 0 ? handleSuperLike : undefined}
          isActive={index === 0}
        />
      </CardWrapper>
    ));
  };

  return (
    <PageContainer>
      <CardsContainer>
        {renderCards()}
      </CardsContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '100px', zIndex: 999 }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? '#4caf50' :
                           snackbar.severity === 'error' ? '#ff4b4b' :
                           '#2196f3',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default Discovery; 