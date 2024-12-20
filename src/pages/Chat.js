import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import EmojiPicker from 'emoji-picker-react';
import './Chat.css';

const Chat = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const actionsRef = useRef(null);
  
  const matchedUser = {
    id: matchId,
    name: 'Sarah',
    photo: 'https://picsum.photos/50/50?random=1',
    online: true,
    lastSeen: 'Active now'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBack = () => {
    navigate('/messages');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${matchedUser.id}`);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'report':
        alert('User reported');
        break;
      case 'block':
        alert('User blocked and removed from messages');
        navigate('/messages');
        break;
      case 'unmatch':
        alert('User unmatched');
        navigate('/messages');
        break;
      case 'reportAndBlock':
        alert('User reported and blocked');
        navigate('/messages');
        break;
      default:
        break;
    }
    setShowActions(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: currentUser.uid,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMessage = {
          id: messages.length + 1,
          senderId: currentUser.uid,
          text: '',
          mediaUrl: event.target.result,
          mediaType: file.type.startsWith('image/') ? 'image' : 'video',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent'
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
    setShowMediaOptions(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-user-info">
          <button className="back-button" onClick={handleBack}>
            <span>←</span>
          </button>
          <div className="chat-user-profile" onClick={handleProfileClick}>
            <img src={matchedUser.photo} alt={matchedUser.name} className="chat-user-photo" />
            <div className="chat-user-details">
              <h2>{matchedUser.name}</h2>
              <span className={`online-status ${matchedUser.online ? 'online' : ''}`}>
                {matchedUser.online ? 'Online' : matchedUser.lastSeen}
              </span>
            </div>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-button" aria-label="video call">
            <span role="img" aria-label="video call">📹</span>
          </button>
          <button className="action-button" aria-label="voice call">
            <span role="img" aria-label="voice call">📞</span>
          </button>
          <div className="more-actions" ref={actionsRef}>
            <button 
              className="action-button"
              onClick={() => setShowActions(!showActions)}
              aria-label="more options"
            >
              ⋮
            </button>
            {showActions && (
              <div className="actions-dropdown">
                <button onClick={() => handleAction('report')}>
                  Report
                </button>
                <button onClick={() => handleAction('reportAndBlock')}>
                  Report & Block
                </button>
                <button onClick={() => handleAction('unmatch')}>
                  Unmatch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}
          >
            {msg.mediaUrl ? (
              msg.mediaType === 'image' ? (
                <img src={msg.mediaUrl} alt="Shared media" className="message-media" />
              ) : (
                <video src={msg.mediaUrl} controls className="message-media" />
              )
            ) : (
              <div className="message-text">{msg.text}</div>
            )}
            <div className="message-info">
              <span className="message-time">{msg.timestamp}</span>
              {msg.senderId === currentUser.uid && (
                <span className="message-status">
                  {msg.status === 'sent' ? '✓' : '✓✓'}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-container">
        <div className="chat-input-wrapper">
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <span role="img" aria-label="emoji">😊</span>
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          
          <button
            type="button"
            className="media-button"
            onClick={() => setShowMediaOptions(!showMediaOptions)}
          >
            <span role="img" aria-label="attach">📎</span>
          </button>
          
          {showMediaOptions && (
            <div className="media-options">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current.click();
                  fileInputRef.current.accept = 'image/*';
                }}
              >
                <span role="img" aria-label="image">🖼️</span>
                Photo
              </button>
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current.click();
                  fileInputRef.current.accept = 'video/*';
                }}
              >
                <span role="img" aria-label="video">🎥</span>
                Video
              </button>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleMediaUpload}
            style={{ display: 'none' }}
          />
        </div>
        
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width={300}
              height={400}
            />
          </div>
        )}
        
        <button type="submit" className="send-button">
          <span role="img" aria-label="send">📤</span>
        </button>
      </form>
    </div>
  );
};

export default Chat; 