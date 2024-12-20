import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Profile Header */}
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src={user.profile?.photos?.[0]}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'white',
                  }}
                  size="small"
                >
                  <PhotoCamera />
                </IconButton>
              </Box>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h4">
                  {user.profile?.firstName} {user.profile?.lastName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.email}
                </Typography>
              </Box>
            </Grid>

            {/* Bio Section */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">About Me</Typography>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="body1">
                {user.profile?.bio || 'No bio added yet'}
              </Typography>
            </Grid>

            {/* Interests Section */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Interests
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.profile?.interests?.map((interest, index) => (
                  <Chip key={index} label={interest} />
                )) || 'No interests added yet'}
              </Box>
            </Grid>

            {/* Actions */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/profile/edit')}
                fullWidth
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile; 