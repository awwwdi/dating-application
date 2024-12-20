import { Box, styled } from '@mui/material';
import Navigation from './Navigation';

const MainContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(7), // Height of AppBar
  paddingBottom: theme.spacing(7), // Height of BottomNavigation
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto',
  padding: theme.spacing(2),
  height: `calc(100vh - ${theme.spacing(14)})`, // Subtract AppBar and BottomNav heights
  overflow: 'auto',
}));

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <MainContainer>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContainer>
    </Box>
  );
}

export default Layout; 