import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { auth } from '../services/api';

const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters long', regex: /.{8,}/ },
  { id: 'uppercase', label: 'Contains uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'Contains lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'Contains number', regex: /[0-9]/ },
  { id: 'special', label: 'Contains special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
});

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const checkPasswordRequirement = (requirement) => {
    return requirement.regex.test(password);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.register(values);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile/create');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors, handleChange, handleBlur }) => (
            <Form style={{ width: '100%', marginTop: '1rem' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email Address"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <List dense sx={{ mt: 1, bgcolor: 'background.paper' }}>
                {passwordRequirements.map((req) => (
                  <ListItem key={req.id}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {checkPasswordRequirement(req) ? (
                        <CheckIcon color="success" />
                      ) : (
                        <CloseIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={req.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: checkPasswordRequirement(req) ? 'success.main' : 'error.main',
                          fontSize: '0.875rem',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/login')}
              >
                Already have an account? Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Register; 