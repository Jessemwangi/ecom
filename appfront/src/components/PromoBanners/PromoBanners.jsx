import React from 'react';
import { Link } from 'react-router-dom';
import './PromoBanners.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PromoBanners = () => {
  const banners = [
    {
      id: 1,
      title: 'New Season',
      subtitle: 'Spring Collection',
      discount: 'Up to 30% Off',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/products/1',
      theme: 'blue'
    },
    {
      id: 2,
      title: 'Best Sellers',
      subtitle: 'Shop Now',
      discount: 'Limited Stock',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/products/2',
      theme: 'purple'
    }
  ];

  const themeColors = {
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    purple: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  };

  return (
    <div className="promo-banners">
      {banners.map((banner) => (
        <Link to={banner.link} key={banner.id} className="banner">
          <div className="banner-image">
            <img src={banner.image} alt={banner.title} />
            <div className="overlay" style={{ background: themeColors[banner.theme] }} />
          </div>
          <div className="banner-content">
            <span className="subtitle">{banner.subtitle}</span>
            <h3 className="title">{banner.title}</h3>
            <p className="discount">{banner.discount}</p>
            <div className="cta">
              <span>Shop Now</span>
              <ArrowForwardIcon />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PromoBanners;
