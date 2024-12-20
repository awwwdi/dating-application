import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Input,
} from '@mui/material';
import { PhotoCamera, Add as AddIcon } from '@mui/icons-material';
import { auth } from '../services/api';

function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setInterests(parsedUser.profile?.interests || []);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await auth.uploadPhoto(formData);
      const photoUrl = response.data.url;
      
      // Update user state with new photo
      setUser(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          photos: [...(prev.profile?.photos || []), photoUrl]
        }
      }));
    } catch (err) {
      setError('Failed to upload photo');
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const updatedProfile = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      bio: formData.get('bio'),
      interests,
      dateOfBirth: formData.get('dateOfBirth'),
      gender: formData.get('gender'),
    };

    try {
      const response = await auth.updateProfile(updatedProfile);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Photo Upload Section */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{ width: 120, height: 120 }}
                    src={user?.profile?.photos?.[0]}
                  />
                  <Input
                    accept="image/*"
                    type="file"
                    id="photo-upload"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="photo-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>
              </Grid>

              {/* Basic Info */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  defaultValue={user?.profile?.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  defaultValue={user?.profile?.lastName}
                />
              </Grid>

              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="bio"
                  label="About Me"
                  defaultValue={user?.profile?.bio}
                />
              </Grid>

              {/* Interests */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Interests
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest"
                  />
                  <IconButton onClick={handleAddInterest}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {interests.map((interest, index) => (
                    <Chip
                      key={index}
                      label={interest}
                      onDelete={() => handleRemoveInterest(interest)}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default ProfileEdit; 