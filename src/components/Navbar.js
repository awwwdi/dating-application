import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      content: 'You matched with Sarah!',
      photo: 'https://picsum.photos/50/50?random=1',
      time: '2m ago',
      unread: true
    },
    {
      id: 2,
      type: 'like',
      content: 'Emma liked your profile',
      photo: 'https://picsum.photos/50/50?random=2',
      time: '1h ago',
      unread: true
    },
    {
      id: 3,
      type: 'message',
      content: 'New message from Michael',
      photo: 'https://picsum.photos/50/50?random=3',
      time: '3h ago',
      unread: true
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({
        ...notif,
        unread: false
      }))
    );
  };

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          DateZone
        </Link>
      </div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <Link to="/" className="navbar-item">Discover</Link>
            <Link to="/matches" className="navbar-item">Matches</Link>
            <Link to="/messages" className="navbar-item">Messages</Link>
            
            <div className="navbar-notifications" ref={notificationRef}>
              <button 
                className="notification-button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
              >
                <svg 
                  className="notification-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {notifications.some(n => n.unread) && (
                  <span className="notification-badge" />
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <button 
                      className="mark-all-read"
                      onClick={handleMarkAllRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                      onClick={() => {
                        if (notification.type === 'message') {
                          navigate('/messages');
                        } else if (notification.type === 'match') {
                          navigate('/matches');
                        }
                        setShowNotifications(false);
                      }}
                    >
                      <img 
                        src={notification.photo} 
                        alt="" 
                        className="notification-photo"
                      />
                      <div className="notification-content">
                        <p>{notification.content}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-menu" ref={profileMenuRef}>
              <div 
                className="profile-photo-container"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
              >
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="profile-photo"
                  />
                ) : (
                  <div className="profile-photo-placeholder">
                    {getInitials(currentUser.displayName || currentUser.email)}
                  </div>
                )}
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      <span className="icon">👤</span>
                      Edit Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <span className="icon">⚙️</span>
                      Settings
                    </Link>
                    <div className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <span className="icon">🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/register" className="navbar-item">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 