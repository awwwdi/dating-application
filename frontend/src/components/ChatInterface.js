import { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  styled,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { formatMessageTime } from '../utils/dateUtils';

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: theme.palette.background.default,
}));

const ChatHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  borderRadius: 0,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(2),
  backgroundColor: isOwn ? theme.palette.primary.main : theme.palette.grey[100],
  alignSelf: isOwn ? 'flex-end' : 'flex-start',
  color: isOwn ? theme.palette.primary.contrastText : theme.palette.text.primary,
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  gap: theme.spacing(1),
}));

const ChatInterface = ({ match, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const otherUser = match.user1._id === currentUser._id ? match.user2 : match.user1;

  useEffect(() => {
    // Load messages
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/chat/${match._id}/messages`);
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [match._id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`/api/chat/${match._id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      });

      const sentMessage = await response.json();
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader elevation={1}>
        <Avatar
          src={otherUser.profile.photos[0]}
          alt={otherUser.profile.firstName}
          sx={{ width: 48, height: 48 }}
        />
        <Typography variant="h6">
          {otherUser.profile.firstName}
        </Typography>
      </ChatHeader>

      <MessagesContainer>
        {messages.map((message) => (
          <Box key={message._id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <MessageBubble isOwn={message.sender === currentUser._id}>
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {formatMessageTime(message.createdAt)}
              </Typography>
            </MessageBubble>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer component="form" onSubmit={handleSendMessage}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          size="small"
        />
        <IconButton 
          type="submit" 
          color="primary"
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface; 