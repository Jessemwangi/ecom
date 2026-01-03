import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ message = "Loading amazing products..." }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <div className="spinner"></div>
        <div className="spinner-glow"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
