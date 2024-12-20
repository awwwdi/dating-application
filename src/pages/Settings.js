import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import './Settings.css';

const Settings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      matches: true,
      messages: true,
      likes: true,
      emailNotifications: false
    },
    privacy: {
      showOnlineStatus: true,
      showLastSeen: true,
      showReadReceipts: true
    },
    preferences: {
      ageRange: [18, 50],
      distance: 50,
      gender: 'all',
      lookingFor: 'relationship'
    },
    premium: {
      isSubscribed: false,
      plan: 'free'
    }
  });

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleUpgradeToPremium = () => {
    // Implement premium upgrade logic
    alert('Redirecting to premium subscription page...');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <section className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-group">
          <label className="setting-item">
            <span>New Matches</span>
            <input
              type="checkbox"
              checked={settings.notifications.matches}
              onChange={() => handleNotificationChange('matches')}
            />
          </label>
          <label className="setting-item">
            <span>Messages</span>
            <input
              type="checkbox"
              checked={settings.notifications.messages}
              onChange={() => handleNotificationChange('messages')}
            />
          </label>
          <label className="setting-item">
            <span>Likes</span>
            <input
              type="checkbox"
              checked={settings.notifications.likes}
              onChange={() => handleNotificationChange('likes')}
            />
          </label>
          <label className="setting-item">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={() => handleNotificationChange('emailNotifications')}
            />
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Privacy</h2>
        <div className="settings-group">
          <label className="setting-item">
            <span>Show Online Status</span>
            <input
              type="checkbox"
              checked={settings.privacy.showOnlineStatus}
              onChange={() => handlePrivacyChange('showOnlineStatus')}
            />
          </label>
          <label className="setting-item">
            <span>Show Last Seen</span>
            <input
              type="checkbox"
              checked={settings.privacy.showLastSeen}
              onChange={() => handlePrivacyChange('showLastSeen')}
            />
          </label>
          <label className="setting-item">
            <span>Show Read Receipts</span>
            <input
              type="checkbox"
              checked={settings.privacy.showReadReceipts}
              onChange={() => handlePrivacyChange('showReadReceipts')}
            />
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Preferences</h2>
        <div className="settings-group">
          <div className="setting-item">
            <span>Age Range</span>
            <div className="range-inputs">
              <input
                type="number"
                min="18"
                max="100"
                value={settings.preferences.ageRange[0]}
                onChange={(e) => handlePreferenceChange('ageRange', [
                  parseInt(e.target.value),
                  settings.preferences.ageRange[1]
                ])}
              />
              <span>to</span>
              <input
                type="number"
                min="18"
                max="100"
                value={settings.preferences.ageRange[1]}
                onChange={(e) => handlePreferenceChange('ageRange', [
                  settings.preferences.ageRange[0],
                  parseInt(e.target.value)
                ])}
              />
            </div>
          </div>
          <div className="setting-item">
            <span>Maximum Distance (km)</span>
            <input
              type="range"
              min="1"
              max="100"
              value={settings.preferences.distance}
              onChange={(e) => handlePreferenceChange('distance', parseInt(e.target.value))}
            />
            <span className="range-value">{settings.preferences.distance} km</span>
          </div>
          <div className="setting-item">
            <span>Show Me</span>
            <select
              value={settings.preferences.gender}
              onChange={(e) => handlePreferenceChange('gender', e.target.value)}
            >
              <option value="all">Everyone</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="nonbinary">Non-binary</option>
            </select>
          </div>
          <div className="setting-item">
            <span>Looking For</span>
            <select
              value={settings.preferences.lookingFor}
              onChange={(e) => handlePreferenceChange('lookingFor', e.target.value)}
            >
              <option value="relationship">Relationship</option>
              <option value="casual">Casual</option>
              <option value="friendship">Friendship</option>
              <option value="networking">Networking</option>
            </select>
          </div>
        </div>
      </section>

      <section className="settings-section premium-section">
        <h2>Premium Features</h2>
        <div className="premium-card">
          <div className="premium-header">
            <h3>DateZone Premium</h3>
            <span className="premium-badge">✨ Premium</span>
          </div>
          <ul className="premium-features">
            <li>✓ See who likes you</li>
            <li>✓ Unlimited likes</li>
            <li>✓ Rewind last swipe</li>
            <li>✓ 5 Super Likes per day</li>
            <li>✓ Priority matches</li>
            <li>✓ Advanced filters</li>
          </ul>
          <button 
            className="premium-button"
            onClick={handleUpgradeToPremium}
          >
            {settings.premium.isSubscribed ? 'Manage Subscription' : 'Upgrade to Premium'}
          </button>
        </div>
      </section>

      <section className="settings-section danger-zone">
        <h2>Account</h2>
        <div className="settings-group">
          <button className="danger-button">Delete Account</button>
          <p className="danger-note">
            This action is permanent and cannot be undone.
            All your data will be permanently deleted.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Settings; 