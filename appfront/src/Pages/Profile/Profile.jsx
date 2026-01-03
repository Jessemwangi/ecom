import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAuth } from '../../contexts/AuthContext';
import useProfile from '../../hooks/useProfile';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    birthday: '',
    bio: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getProfile, createProfile, updateProfile, loading } = useProfile();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        // Fetch user's profile from backend
        const result = await getProfile(user.id);
        if (result.success && result.data) {
          setProfile(result.data);
          const attrs = result.data.attributes;
          setFormData({
            fullname: attrs.fullname || '',
            phone: attrs.phone || '',
            address: attrs.address || '',
            city: attrs.city || '',
            country: attrs.country || '',
            birthday: attrs.birthday || '',
            bio: attrs.bio || ''
          });
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [user, navigate, getProfile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const profileData = {
      ...formData,
      user: user.id
    };

    let result;
    if (profile) {
      // Update existing profile
      result = await updateProfile(profile.id, profileData);
    } else {
      // Create new profile
      result = await createProfile(profileData);
    }

    if (result.success) {
      setProfile(result.data);
      setSuccessMessage('Profile saved successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setErrorMessage(result.error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <div className="avatar-circle">
              <PersonOutlineIcon />
            </div>
            <button className="edit-avatar-btn">
              <EditIcon />
            </button>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <ShoppingBagOutlinedIcon />
              <div className="stat-info">
                <h3>12</h3>
                <p>Orders</p>
              </div>
            </div>
            <div className="stat">
              <FavoriteOutlinedIcon />
              <div className="stat-info">
                <h3>8</h3>
                <p>Wishlist</p>
              </div>
            </div>
          </div>

          <div className="profile-menu">
            <button className="menu-item active">
              <PersonOutlineIcon />
              <span>Profile Details</span>
            </button>
            <Link to="/dashboard" className="menu-item">
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
            <Link to="/dashboard" className="menu-item">
              <ShoppingBagOutlinedIcon />
              <span>My Orders</span>
            </Link>
            <Link to="/dashboard" className="menu-item">
              <FavoriteOutlinedIcon />
              <span>Wishlist</span>
            </Link>
            <button className="menu-item">
              <SettingsOutlinedIcon />
              <span>Settings</span>
            </button>
            <button className="menu-item logout" onClick={handleLogout}>
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="content-header">
            <div>
              <h1>Profile Details</h1>
              <p>Manage your personal information</p>
            </div>
            <button
              className="edit-toggle-btn"
              onClick={() => setIsEditing(!isEditing)}
              disabled={loading}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <PersonOutlineIcon />
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <div className="input-wrapper">
                      <PersonOutlineIcon />
                      <input
                        type="text"
                        value={user?.username || ''}
                        disabled
                        placeholder="Username (read-only)"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <EmailOutlinedIcon />
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        placeholder="Email (read-only)"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-wrapper">
                      <PhoneOutlinedIcon />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Birthday</label>
                  <div className="input-wrapper">
                    <CakeOutlinedIcon />
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Location Information</h3>
                <div className="form-group">
                  <label>Address</label>
                  <div className="input-wrapper">
                    <LocationOnOutlinedIcon />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <div className="input-wrapper">
                      <LocationOnOutlinedIcon />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <div className="input-wrapper">
                      <LocationOnOutlinedIcon />
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>About Me</h3>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="details-section">
                <h3>Basic Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Full Name</label>
                    <p>{formData.fullname || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Username</label>
                    <p>{user?.username || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email Address</label>
                    <p>{user?.email || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Phone Number</label>
                    <p>{formData.phone || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Birthday</label>
                    <p>{formData.birthday || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Location Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Address</label>
                    <p>{formData.address || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>City</label>
                    <p>{formData.city || 'Not provided'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Country</label>
                    <p>{formData.country || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>About Me</h3>
                <div className="detail-item full-width">
                  <p className="bio-text">
                    {formData.bio || 'No bio added yet. Click "Edit Profile" to add one.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
