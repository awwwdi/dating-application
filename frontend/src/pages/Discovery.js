import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, styled } from '@mui/material';
import SwipeCard from '../components/SwipeCard';
import { auth } from '../services/api';

const CardContainer = styled(Box)({
  position: 'relative',
  height: '70vh',
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
  textAlign: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
}));

function Discovery() {
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPotentialMatches();
  }, []);

  const loadPotentialMatches = async () => {
    try {
      const response = await auth.getPotentialMatches();
      setPotentialMatches(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load matches');
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const currentUser = potentialMatches[currentIndex];
      await auth.likeUser({ targetUserId: currentUser._id });
      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      setError('Failed to like user');
    }
  };

  const handlePass = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleSuperLike = async () => {
    try {
      const currentUser = potentialMatches[currentIndex];
      await auth.likeUser({ targetUserId: currentUser._id, isSuperLike: true });
      setCurrentIndex(prev => prev + 1);
    } catch (err) {
      setError('Failed to super like user');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <EmptyStateContainer>
        <Typography color="error">{error}</Typography>
      </EmptyStateContainer>
    );
  }

  if (currentIndex >= potentialMatches.length) {
    return (
      <EmptyStateContainer>
        <Typography variant="h5" color="primary">
          No more profiles to show!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Check back later for new matches
        </Typography>
      </EmptyStateContainer>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CardContainer>
        {potentialMatches[currentIndex] && (
          <SwipeCard
            key={potentialMatches[currentIndex]._id}
            user={potentialMatches[currentIndex]}
            onLike={handleLike}
            onPass={handlePass}
            onSuperLike={handleSuperLike}
          />
        )}
      </CardContainer>
    </Container>
  );
}

export default Discovery; 