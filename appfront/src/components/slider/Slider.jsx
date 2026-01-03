import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import './Slider.scss'

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      title: 'Summer Collection 2026',
      subtitle: 'New Arrivals',
      description: 'Discover the latest trends in fashion',
      cta: 'Shop Now',
      link: '/products/1',
      theme: 'light'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      title: 'Limited Time Offer',
      subtitle: 'Up to 50% Off',
      description: 'On selected items this week only',
      cta: 'View Deals',
      link: '/products/2',
      theme: 'dark'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg',
      title: 'Premium Quality',
      subtitle: 'Exclusive Designs',
      description: 'Handpicked collection for you',
      cta: 'Explore',
      link: '/products/3',
      theme: 'light'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
      title: 'Style Meets Comfort',
      subtitle: 'Everyday Essentials',
      description: 'Perfect for your daily wardrobe',
      cta: 'Shop Collection',
      link: '/products/1',
      theme: 'dark'
    }
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  return (
    <div className="slider">
      <div 
        className="container" 
        style={{ 
          transform: `translateX(-${currentSlide * 100}vw)`,
          width: `${slides.length * 100}vw` 
        }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className={`slide ${slide.theme}`}>
            <img src={slide.image} alt={slide.title} />
            <div className="overlay" />
            <div className="content">
              <div className="text-container">
                <span className="subtitle">{slide.subtitle}</span>
                <h1 className="title">{slide.title}</h1>
                <p className="description">{slide.description}</p>
                <Link to={slide.link} className="cta-button">
                  {slide.cta}
                  <ArrowForwardIosIcon className="cta-icon" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="navigation">
        <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <ArrowBackIosIcon />
        </button>
        <button className="nav-btn next" onClick={nextSlide} aria-label="Next slide">
          <ArrowForwardIosIcon />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
