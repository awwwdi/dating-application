import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Slider,
  Typography,
  Divider,
  Paper,
  styled,
} from '@mui/material';
import {
  Notifications,
  LocationOn,
  Visibility,
  Security,
  Help,
  Info,
} from '@mui/icons-material';

const SettingsContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const SettingSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function Settings() {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2, px: 2 }}>
        Settings
      </Typography>

      <SettingsContainer>
        <List disablePadding>
          {/* Profile Settings */}
          <ListItem>
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText 
              primary="Profile Visibility"
              secondary="Show me on Bumble"
            />
            <Switch defaultChecked />
          </ListItem>
          <Divider variant="inset" component="li" />

          {/* Location Settings */}
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText 
              primary="Location"
              secondary="Distance preference"
            />
          </ListItem>
          <SettingSection>
            <Typography gutterBottom>
              Maximum Distance: 50km
            </Typography>
            <Slider
              defaultValue={50}
              step={1}
              min={1}
              max={100}
              valueLabelDisplay="auto"
              sx={{ color: 'primary.main' }}
            />
          </SettingSection>
          <Divider variant="inset" component="li" />

          {/* Notifications */}
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText 
              primary="Notifications"
              secondary="Manage notifications"
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          {/* Security */}
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText 
              primary="Privacy & Security"
              secondary="Manage your privacy settings"
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          {/* Help & Support */}
          <ListItem>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText 
              primary="Help & Support"
              secondary="Get help with your account"
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          {/* About */}
          <ListItem>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText 
              primary="About"
              secondary="Version 1.0.0"
            />
          </ListItem>
        </List>
      </SettingsContainer>
    </Box>
  );
}

export default Settings; 