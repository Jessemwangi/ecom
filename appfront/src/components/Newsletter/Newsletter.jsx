import React from 'react';
import './Newsletter.scss';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add newsletter submission logic here
    alert('Thank you for subscribing!');
  };

  return (
    <div className="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <MailOutlineIcon className="mail-icon" />
          <div className="text-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates on new products and upcoming sales</p>
          </div>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            required 
            aria-label="Email address"
          />
          <button type="submit" aria-label="Subscribe">
            Subscribe
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
