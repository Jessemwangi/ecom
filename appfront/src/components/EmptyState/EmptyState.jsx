import React from 'react';
import './EmptyState.scss';

const EmptyState = ({ 
  icon = "📦", 
  title = "Coming Soon!", 
  message = "Awesome items will be loaded here soon. We're working hard to bring you the best products!", 
  actionText = "",
  onAction = null 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && onAction && (
        <button className="empty-state-action" onClick={onAction}>
          {actionText}
        </button>
      )}
      <div className="empty-state-animation">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default EmptyState;
