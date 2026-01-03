import React from 'react';
import './ProductSkeleton.scss';

const ProductSkeleton = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className="product-skeleton" key={index}>
          <div className="skeleton-image">
            <div className="shimmer"></div>
          </div>
          <div className="skeleton-details">
            <div className="skeleton-title shimmer"></div>
            <div className="skeleton-price shimmer"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;
