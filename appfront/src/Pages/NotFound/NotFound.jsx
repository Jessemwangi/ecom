import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <div className="error-icon">🛍️</div>
        <h1 className="error-title">Oops! Page Not Found</h1>
        <p className="error-message">
          Looks like this page went on a shopping spree and never came back! 
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="error-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            <span>🏠</span> Back to Home
          </button>
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            <span>←</span> Go Back
          </button>
        </div>
        <div className="error-suggestions">
          <p>You might want to try:</p>
          <ul>
            <li onClick={() => navigate('/')}>🏠 Home Page</li>
            <li onClick={() => navigate('/products/1')}>👕 Shop Products</li>
            <li onClick={() => navigate('/products/2')}>👗 New Arrivals</li>
          </ul>
        </div>
      </div>
      <div className="floating-items">
        <div className="float-item item-1">🛒</div>
        <div className="float-item item-2">👜</div>
        <div className="float-item item-3">👟</div>
        <div className="float-item item-4">👗</div>
        <div className="float-item item-5">⭐</div>
        <div className="float-item item-6">💳</div>
      </div>
    </div>
  );
};

export default NotFound;
