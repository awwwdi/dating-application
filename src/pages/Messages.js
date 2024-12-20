import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Sarah',
      photo: 'https://picsum.photos/400/400?random=1',
      lastMessage: 'Hey, how are you?',
      timestamp: '2m ago',
      unread: true,
      online: true
    },
    {
      id: 2,
      name: 'Emma',
      photo: 'https://picsum.photos/400/400?random=2',
      lastMessage: 'Would love to meet for coffee!',
      timestamp: '1h ago',
      unread: false,
      online: false
    },
    {
      id: 3,
      name: 'Michael',
      photo: 'https://picsum.photos/400/400?random=3',
      lastMessage: 'That sounds great! 😊',
      timestamp: '3h ago',
      unread: true,
      online: true
    }
  ]);

  const handleChatClick = (chatId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === chatId ? { ...msg, unread: false } : msg
      )
    );
    navigate(`/chat/${chatId}`);
  };

  const handleAction = (messageId, action, e) => {
    e.stopPropagation();
    switch (action) {
      case 'report':
        alert('User reported');
        break;
      case 'block':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        alert('User blocked and removed from messages');
        break;
      case 'unmatch':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        alert('User unmatched');
        break;
      case 'reportAndBlock':
        setMessages(prev => prev.filter(m => m.id !== messageId));
        alert('User reported and blocked');
        break;
      default:
        break;
    }
    setShowActions(null);
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1>Messages</h1>
      </div>

      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${message.unread ? 'unread' : ''}`}
            onClick={() => handleChatClick(message.id)}
          >
            <div className="message-photo-container">
              <img src={message.photo} alt={message.name} />
              <span className={`online-status ${message.online ? 'online' : ''}`} />
            </div>
            <div className="message-info">
              <div className="message-header">
                <h3>{message.name}</h3>
                <span className="message-time">{message.timestamp}</span>
              </div>
              <p className="last-message">{message.lastMessage}</p>
            </div>
            <div className="message-actions" ref={dropdownRef}>
              <button
                className="message-actions-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(showActions === message.id ? null : message.id);
                }}
              >
                ⋮
              </button>
              {showActions === message.id && (
                <div className="message-actions-dropdown">
                  <button onClick={(e) => handleAction(message.id, 'report', e)}>
                    Report
                  </button>
                  <button onClick={(e) => handleAction(message.id, 'reportAndBlock', e)}>
                    Report & Block
                  </button>
                  <button onClick={(e) => handleAction(message.id, 'unmatch', e)}>
                    Unmatch
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages; 