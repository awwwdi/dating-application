import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  styled,
} from '@mui/material';
import {
  Visibility,
  Refresh,
  LocationOn,
  Star,
  Timer,
} from '@mui/icons-material';

const FeatureCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const features = [
  {
    icon: <Visibility />,
    title: 'See who likes you',
    description: 'Match with them instantly',
  },
  {
    icon: <Refresh />,
    title: 'Rematch',
    description: 'Connect with expired matches',
  },
  {
    icon: <LocationOn />,
    title: 'Travel Mode',
    description: 'Match anywhere in the world',
  },
  {
    icon: <Star />,
    title: 'Advanced Filters',
    description: 'Set more specific preferences',
  },
  {
    icon: <Timer />,
    title: 'Unlimited Time',
    description: 'No more 24-hour limit',
  },
];

function PremiumFeatures() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box sx={{ textAlign: 'center' }}>
          <Chip
            label="Premium"
            color="primary"
            sx={{ mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Upgrade to Bumble Premium
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get the most out of your Bumble experience
          </Typography>
        </Box>

        <Stack spacing={2}>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </FeatureCard>
          ))}
        </Stack>

        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 4 }}
        >
          Upgrade Now
        </Button>
      </Stack>
    </Box>
  );
}

export default PremiumFeatures; 