import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import MatchesList from '../components/MatchesList';
import ChatInterface from '../components/ChatInterface';
import { auth } from '../services/api';

function Chat() {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const response = await auth.getMatches();
      setMatches(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load matches:', err);
      setLoading(false);
    }
  };

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    if (isMobile) {
      setMobileOpen(true);
    }
  };

  const handleBackToList = () => {
    setMobileOpen(false);
    setSelectedMatch(null);
  };

  const matchesList = (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <MatchesList
        matches={matches}
        onSelectMatch={handleSelectMatch}
        selectedMatchId={selectedMatch?._id}
      />
    </Box>
  );

  if (isMobile) {
    return (
      <Box sx={{ height: '100vh' }}>
        {!mobileOpen ? (
          matchesList
        ) : (
          <Box sx={{ height: '100%' }}>
            <IconButton onClick={handleBackToList} sx={{ m: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            {selectedMatch && (
              <ChatInterface
                match={selectedMatch}
                currentUser={auth.getCurrentUser()}
              />
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={4}>
        <Paper sx={{ height: '100%', borderRadius: 0 }}>
          {matchesList}
        </Paper>
      </Grid>
      <Grid item xs={8}>
        {selectedMatch ? (
          <ChatInterface
            match={selectedMatch}
            currentUser={auth.getCurrentUser()}
          />
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Select a match to start chatting
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Chat; 