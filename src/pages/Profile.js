import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [profile, setProfile] = useState({
    photos: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3'
    ],
    name: 'John Doe',
    age: 28,
    bio: 'Love traveling, photography, and good food! 📸✈️🍜',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    education: 'Stanford University',
    interests: ['Photography', 'Travel', 'Cooking', 'Hiking', 'Reading'],
    preferences: {
      gender: 'women',
      ageRange: [25, 35],
      distance: 25,
      lookingFor: 'relationship'
    },
    verification: {
      email: true,
      phone: false,
      photo: false,
      social: false
    }
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({
          ...prev,
          photos: [...prev.photos, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleVerification = () => {
    switch (verificationStep) {
      case 0:
        // Email verification
        setProfile(prev => ({
          ...prev,
          verification: { ...prev.verification, email: true }
        }));
        break;
      case 1:
        // Phone verification
        setProfile(prev => ({
          ...prev,
          verification: { ...prev.verification, phone: true }
        }));
        break;
      case 2:
        // Photo verification
        setProfile(prev => ({
          ...prev,
          verification: { ...prev.verification, photo: true }
        }));
        break;
      case 3:
        // Social media verification
        setProfile(prev => ({
          ...prev,
          verification: { ...prev.verification, social: true }
        }));
        break;
      default:
        break;
    }
    setVerificationStep(prev => prev + 1);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="profile-photos">
        {profile.photos.map((photo, index) => (
          <div key={index} className="photo-container">
            <img src={photo} alt={`Profile ${index + 1}`} />
            {isEditing && (
              <button
                className="remove-photo"
                onClick={() => handleRemovePhoto(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {isEditing && profile.photos.length < 6 && (
          <label className="add-photo">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <span>+</span>
          </label>
        )}
      </div>

      <div className="profile-info">
        <div className="info-section">
          <h2>Basic Information</h2>
          <div className="info-group">
            <label>
              Name
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate('name', e.target.value)}
                />
              ) : (
                <span>{profile.name}</span>
              )}
            </label>
            <label>
              Age
              {isEditing ? (
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleProfileUpdate('age', parseInt(e.target.value))}
                />
              ) : (
                <span>{profile.age}</span>
              )}
            </label>
            <label>
              Location
              {isEditing ? (
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleProfileUpdate('location', e.target.value)}
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </label>
          </div>
        </div>

        <div className="info-section">
          <h2>About Me</h2>
          <div className="info-group">
            <label>
              Bio
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                  maxLength={500}
                />
              ) : (
                <span>{profile.bio}</span>
              )}
            </label>
            <label>
              Occupation
              {isEditing ? (
                <input
                  type="text"
                  value={profile.occupation}
                  onChange={(e) => handleProfileUpdate('occupation', e.target.value)}
                />
              ) : (
                <span>{profile.occupation}</span>
              )}
            </label>
            <label>
              Education
              {isEditing ? (
                <input
                  type="text"
                  value={profile.education}
                  onChange={(e) => handleProfileUpdate('education', e.target.value)}
                />
              ) : (
                <span>{profile.education}</span>
              )}
            </label>
          </div>
        </div>

        <div className="info-section">
          <h2>Interests</h2>
          <div className="interests-container">
            {isEditing ? (
              <div className="interests-edit">
                {profile.interests.map((interest, index) => (
                  <div key={index} className="interest-tag">
                    {interest}
                    <button
                      onClick={() => handleProfileUpdate('interests', 
                        profile.interests.filter((_, i) => i !== index)
                      )}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add interest..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleProfileUpdate('interests', [
                        ...profile.interests,
                        e.target.value.trim()
                      ]);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            ) : (
              <div className="interests-display">
                {profile.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="info-section">
          <h2>Preferences</h2>
          <div className="info-group">
            <label>
              Looking for
              {isEditing ? (
                <select
                  value={profile.preferences.lookingFor}
                  onChange={(e) => handlePreferenceUpdate('lookingFor', e.target.value)}
                >
                  <option value="relationship">Relationship</option>
                  <option value="casual">Casual</option>
                  <option value="friendship">Friendship</option>
                  <option value="networking">Networking</option>
                </select>
              ) : (
                <span className="preference-value">
                  {profile.preferences.lookingFor.charAt(0).toUpperCase() + 
                   profile.preferences.lookingFor.slice(1)}
                </span>
              )}
            </label>
            <label>
              Show me
              {isEditing ? (
                <select
                  value={profile.preferences.gender}
                  onChange={(e) => handlePreferenceUpdate('gender', e.target.value)}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="everyone">Everyone</option>
                </select>
              ) : (
                <span className="preference-value">
                  {profile.preferences.gender.charAt(0).toUpperCase() + 
                   profile.preferences.gender.slice(1)}
                </span>
              )}
            </label>
            <label>
              Age Range
              {isEditing ? (
                <div className="range-inputs">
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={profile.preferences.ageRange[0]}
                    onChange={(e) => handlePreferenceUpdate('ageRange', [
                      parseInt(e.target.value),
                      profile.preferences.ageRange[1]
                    ])}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={profile.preferences.ageRange[1]}
                    onChange={(e) => handlePreferenceUpdate('ageRange', [
                      profile.preferences.ageRange[0],
                      parseInt(e.target.value)
                    ])}
                  />
                </div>
              ) : (
                <span className="preference-value">
                  {profile.preferences.ageRange[0]} - {profile.preferences.ageRange[1]}
                </span>
              )}
            </label>
            <label>
              Maximum Distance (km)
              {isEditing ? (
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={profile.preferences.distance}
                  onChange={(e) => handlePreferenceUpdate('distance', parseInt(e.target.value))}
                />
              ) : (
                <span className="preference-value">
                  {profile.preferences.distance} km
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="info-section verification-section">
          <h2>Profile Verification</h2>
          <div className="verification-steps">
            <div className={`verification-step ${profile.verification.email ? 'verified' : ''}`}>
              <span className="step-icon">✉️</span>
              <div className="step-info">
                <h3>Email Verification</h3>
                <p>{profile.verification.email ? 'Verified' : 'Verify your email'}</p>
              </div>
              {!profile.verification.email && (
                <button onClick={() => handleVerification()}>Verify</button>
              )}
            </div>
            <div className={`verification-step ${profile.verification.phone ? 'verified' : ''}`}>
              <span className="step-icon">📱</span>
              <div className="step-info">
                <h3>Phone Verification</h3>
                <p>{profile.verification.phone ? 'Verified' : 'Verify your phone number'}</p>
              </div>
              {!profile.verification.phone && profile.verification.email && (
                <button onClick={() => handleVerification()}>Verify</button>
              )}
            </div>
            <div className={`verification-step ${profile.verification.photo ? 'verified' : ''}`}>
              <span className="step-icon">📸</span>
              <div className="step-info">
                <h3>Photo Verification</h3>
                <p>{profile.verification.photo ? 'Verified' : 'Verify your photos'}</p>
              </div>
              {!profile.verification.photo && profile.verification.phone && (
                <button onClick={() => handleVerification()}>Verify</button>
              )}
            </div>
            <div className={`verification-step ${profile.verification.social ? 'verified' : ''}`}>
              <span className="step-icon">🔗</span>
              <div className="step-info">
                <h3>Social Media Verification</h3>
                <p>{profile.verification.social ? 'Verified' : 'Connect your social media'}</p>
              </div>
              {!profile.verification.social && profile.verification.photo && (
                <button onClick={() => handleVerification()}>Verify</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 