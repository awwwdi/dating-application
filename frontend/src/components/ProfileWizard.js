import { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Stack,
  Chip,
  styled,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Add as AddIcon } from '@mui/icons-material';

const PhotoUploadBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  border: `2px dashed ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const steps = ['Photos', 'Basic Info', 'About Me', 'Interests'];

function ProfileWizard({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [basicInfo, setBasicInfo] = useState({
    firstName: '',
    occupation: '',
    education: '',
    dateOfBirth: '',
    gender: '',
  });
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos([...photos, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleComplete = () => {
    onComplete({
      photos,
      ...basicInfo,
      bio,
      interests,
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Add your best photos</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  component="img"
                  src={photo}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ))}
              {photos.length < 6 && (
                <PhotoUploadBox>
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    id="photo-upload"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="photo-upload">
                    <IconButton component="span" color="primary">
                      <PhotoCamera />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      Add Photo
                    </Typography>
                  </label>
                </PhotoUploadBox>
              )}
            </Box>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Tell us about yourself</Typography>
            <TextField
              label="First Name"
              value={basicInfo.firstName}
              onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Occupation"
              value={basicInfo.occupation}
              onChange={(e) => setBasicInfo({ ...basicInfo, occupation: e.target.value })}
              fullWidth
            />
            <TextField
              label="Education"
              value={basicInfo.education}
              onChange={(e) => setBasicInfo({ ...basicInfo, education: e.target.value })}
              fullWidth
            />
            <TextField
              type="date"
              label="Date of Birth"
              value={basicInfo.dateOfBirth}
              onChange={(e) => setBasicInfo({ ...basicInfo, dateOfBirth: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Write a bio</Typography>
            <TextField
              multiline
              rows={4}
              label="About me"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              helperText="Share a little about yourself"
            />
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={3}>
            <Typography variant="h6">Add your interests</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Add interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
              />
              <IconButton onClick={handleAddInterest} color="primary">
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {interests.map((interest, index) => (
                <Chip
                  key={index}
                  label={interest}
                  onDelete={() => {
                    setInterests(interests.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </Box>
          </Stack>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4, mb: 4 }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
        >
          {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileWizard; 