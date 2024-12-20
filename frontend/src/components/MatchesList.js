import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Badge,
  styled,
} from '@mui/material';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
    cursor: 'pointer',
  },
}));

const OnlineBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const MatchesList = ({ matches, onSelectMatch, selectedMatchId }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {matches.map((match) => {
        const otherUser = match.user1._id === currentUserId ? match.user2 : match.user1;
        const lastMessage = match.lastMessage;

        return (
          <StyledListItem
            key={match._id}
            selected={selectedMatchId === match._id}
            onClick={() => onSelectMatch(match)}
          >
            <ListItemAvatar>
              <OnlineBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                invisible={!otherUser.online}
              >
                <Avatar
                  alt={otherUser.profile.firstName}
                  src={otherUser.profile.photos[0]}
                  sx={{ width: 56, height: 56 }}
                />
              </OnlineBadge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" component="div">
                  {otherUser.profile.firstName}
                </Typography>
              }
              secondary={
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '180px',
                    }}
                  >
                    {lastMessage?.content || 'Start a conversation!'}
                  </Typography>
                  {lastMessage && (
                    <Typography variant="caption" color="text.secondary">
                      {formatMessageTime(lastMessage.createdAt)}
                    </Typography>
                  )}
                </Box>
              }
            />
          </StyledListItem>
        );
      })}
    </List>
  );
};

export default MatchesList; 