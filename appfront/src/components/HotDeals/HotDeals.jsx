import React, { useState, useEffect } from 'react';
import './HotDeals.scss';
import Card from '../Card/Card';
import UseFetch from '../../hooks/useFetch';
import ProductSkeleton from '../Loading/ProductSkeleton';
import EmptyState from '../EmptyState/EmptyState';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HotDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const { data, loading, error } = UseFetch(
    `/products?populate=*&[filters][type][$eq]=hot`
  );

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when countdown ends
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="hot-deals">
      <div className="hot-deals-header">
        <div className="title-section">
          <LocalFireDepartmentIcon className="fire-icon" />
          <div className="title-text">
            <h2>Hot Deals</h2>
            <p>Limited time offers - Don't miss out!</p>
          </div>
        </div>
        
        <div className="countdown">
          <AccessTimeIcon className="clock-icon" />
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.hours)}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="separator">:</span>
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.minutes)}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="separator">:</span>
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.seconds)}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hot-deals-content">
        {error ? (
          <EmptyState 
            icon="🔥"
            title="Oops! Deals Temporarily Unavailable"
            message="We're working hard to bring you the hottest deals. Please check back in a few moments!"
          />
        ) : loading ? (
          <div className="products-grid">
            <ProductSkeleton count={4} />
          </div>
        ) : data && data.length > 0 ? (
          <div className="products-grid">
            {data.slice(0, 4).map((item) => (
              <Card item={item} key={item.documentId} isHotDeal={true} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon="⏰"
            title="New Hot Deals Loading Soon!"
            message="Amazing flash deals are on their way! We're preparing exclusive offers with unbeatable prices just for you. Check back in a few hours for incredible savings!"
          />
        )}
      </div>
    </div>
  );
};

export default HotDeals;
