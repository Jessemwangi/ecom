import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import useAuth from '../../hooks/useAuth';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null); // null, true, or false
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');

    // Real-time password confirmation validation
    if (name === 'confirmPassword') {
      if (value === '') {
        setPasswordMatch(null); // No input yet
      } else if (value === formData.password) {
        setPasswordMatch(true); // Passwords match
      } else {
        setPasswordMatch(false); // Passwords don't match
      }
    }

    // Also check when password field changes and confirmPassword has value
    if (name === 'password' && formData.confirmPassword !== '') {
      if (value === formData.confirmPassword) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate terms acceptance
    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Call register from useAuth hook
    const result = await register(formData);

    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
    }
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement social signup logic here
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card signup-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join us and start shopping today</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          {authError && <div className="error-message">{authError}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <PersonOutlineIcon className="input-icon" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <EmailOutlinedIcon className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <LockOutlinedIcon className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className={`input-wrapper ${passwordMatch === true ? 'input-success' : passwordMatch === false ? 'input-error' : ''}`}>
                <LockOutlinedIcon className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              {passwordMatch === false && (
                <div className="validation-message error">
                  Passwords do not match
                </div>
              )}
              {passwordMatch === true && (
                <div className="validation-message success">
                  Passwords match
                </div>
              )}
            </div>

            <div className="terms">
              <label>
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required 
                />
                <span>
                  I agree to the <Link to="/terms">Terms & Conditions</Link> and{' '}
                  <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>or sign up with</span>
          </div>

          <div className="social-login">
            <button
              className="social-btn google"
              onClick={() => handleSocialSignup('Google')}
            >
              <GoogleIcon />
            </button>
            <button
              className="social-btn facebook"
              onClick={() => handleSocialSignup('Facebook')}
            >
              <FacebookIcon />
            </button>
            <button
              className="social-btn twitter"
              onClick={() => handleSocialSignup('Twitter')}
            >
              <TwitterIcon />
            </button>
            <button
              className="social-btn linkedin"
              onClick={() => handleSocialSignup('LinkedIn')}
            >
              <LinkedInIcon />
            </button>
            <button
              className="social-btn instagram"
              onClick={() => handleSocialSignup('Instagram')}
            >
              <InstagramIcon />
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
