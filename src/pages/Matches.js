import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Matches.css';

const Matches = () => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(null);
  const actionsRef = useRef(null);
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Sarah',
      photo: 'https://picsum.photos/400/400?random=1',
      isNew: true,
      lastActive: 'Online'
    },
    {
      id: 2,
      name: 'Emma',
      photo: 'https://picsum.photos/400/400?random=2',
      isNew: true,
      lastActive: '2h ago'
    },
    {
      id: 3,
      name: 'Michael',
      photo: 'https://picsum.photos/400/400?random=3',
      isNew: true,
      lastActive: '1h ago'
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStartChat = (match) => {
    // Remove from matches
    setMatches(prev => prev.filter(m => m.id !== match.id));
    
    // Add to messages (you'll need to implement this in your global state management)
    const newChat = {
      id: match.id,
      name: match.name,
      photo: match.photo,
      lastMessage: '',
      timestamp: 'Just now',
      unread: false,
      online: match.lastActive === 'Online'
    };
    
    // Navigate to chat
    navigate(`/chat/${match.id}`);
  };

  const handleMatchAction = (matchId, action, e) => {
    e.stopPropagation();
    switch (action) {
      case 'report':
        alert('User reported');
        break;
      case 'block':
        setMatches(prev => prev.filter(m => m.id !== matchId));
        alert('User blocked and removed from matches');
        break;
      case 'unmatch':
        setMatches(prev => prev.filter(m => m.id !== matchId));
        alert('User unmatched');
        break;
      case 'reportAndBlock':
        setMatches(prev => prev.filter(m => m.id !== matchId));
        alert('User reported and blocked');
        break;
      default:
        break;
    }
    setShowActions(null);
  };

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>New Matches</h1>
      </div>

      <div className="matches-grid">
        {matches.map(match => (
          <div key={match.id} className="match-card">
            <div className="match-photo-container">
              <img src={match.photo} alt={match.name} />
              <div className="match-info">
                <h3>{match.name}</h3>
                <button 
                  className="start-chat-button"
                  onClick={() => handleStartChat(match)}
                >
                  Start Chat
                </button>
              </div>
            </div>
            <div className="match-actions" ref={actionsRef}>
              <button
                className="match-actions-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(showActions === match.id ? null : match.id);
                }}
              >
                ⋮
              </button>
              {showActions === match.id && (
                <div className="match-actions-dropdown">
                  <button onClick={(e) => handleMatchAction(match.id, 'report', e)}>
                    Report
                  </button>
                  <button onClick={(e) => handleMatchAction(match.id, 'reportAndBlock', e)}>
                    Report & Block
                  </button>
                  <button onClick={(e) => handleMatchAction(match.id, 'unmatch', e)}>
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

export default Matches; 