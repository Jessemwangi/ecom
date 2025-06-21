import React, { useState, useCallback } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import Color from "../Color/Color";
import { buildImageUrl } from "../../Utility/imageHelper";

const Card = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [secondImageLoaded, setSecondImageLoaded] = useState(false);
  
  const images = item?.images || [];
  const hasImages = images.length > 0;
  
  // Only calculate random indices if we have images
  let randomIndex = 0;
  let img2Index = 0;
  
  if (hasImages) {
    randomIndex = Math.floor(Math.random() * images.length);
    img2Index = images.length > 1 
      ? (randomIndex === 0 ? 1 : randomIndex - 1)
      : randomIndex;
  }
  
  // Placeholder image - use a lightweight SVG or small placeholder
  const placeholderImage = "data:image/svg+xml,%3Csvg width='300' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ELoading...%3C/text%3E%3C/svg%3E";
  
  const mainImageUrl = hasImages ? buildImageUrl(images[randomIndex]?.url) : placeholderImage;
  const secondImageUrl = hasImages && images.length > 1 
    ? buildImageUrl(images[img2Index]?.url)
    : mainImageUrl;

  // Image load handlers
  const handleMainImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleMainImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true); // Still set loaded to hide skeleton
  }, []);

  const handleSecondImageLoad = useCallback(() => {
    setSecondImageLoaded(true);
  }, []);

  return (
    <Link className="link" to={`/product/${item.documentId}`}>
      <div className="card">
        <div className="image">
          {item?.isNew && <span>New arrivals</span>}
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          
          <img
            src={imageError ? placeholderImage : mainImageUrl}
            className={`mainImg ${imageLoaded ? 'loaded' : 'loading'}`}
            alt={item?.title || "Product"}
            onLoad={handleMainImageLoad}
            onError={handleMainImageError}
            loading="lazy" // Native lazy loading
            decoding="async" // Async decoding
          />
          
          {/* Only load second image after main image loads */}
          {imageLoaded && !imageError && (
            <img
              src={secondImageUrl}
              className={`secondImg ${secondImageLoaded ? 'loaded' : 'loading'}`}
              alt={item?.title || "Product"}
              onLoad={handleSecondImageLoad}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        
        <div className="itemDetails">
          <h2>{item?.title}</h2>
          <div className="colors">
            {item?.colors?.data?.map(color => 
              <Color 
                color={color?.name?.toLowerCase()} 
                key={`${item?.id}-${color?.name}`}
              />
            )}
          </div>
        </div>
        
        <div className="prices">
          <h3>${item?.oldPrice || (item?.price ? item.price + 10 : 'N/A')}</h3>
          <h3>${item?.price || 'N/A'}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;