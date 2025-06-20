import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import Color from "../Color/Color";
import { buildImageUrl } from "../../Utility/imageHelper";

const Card = ({ item }) => {
  const images = item?.images || [];
  const hasImages = images.length > 0;
  
 
  // Only calculate random indices if we have images
  let randomIndex = 0;
  let img2Index = 0;
  
  if (hasImages) {
    randomIndex = Math.floor(Math.random() * images.length);
    img2Index = images.length > 1 
      ? (randomIndex === 0 ? 1 : randomIndex - 1)
      : randomIndex; // Use same image if only one exists
  }
  
  // Fallback image URL (you might want to add a placeholder image)
  const fallbackImage = "https://picsum.photos/300/400?random=10"; // Replace with your placeholder
  
  const mainImageUrl = hasImages ? buildImageUrl(images[randomIndex]?.url) : fallbackImage;
  const secondImageUrl = hasImages && images.length > 1 
    ? buildImageUrl(images[img2Index]?.url)
    : mainImageUrl; // Use main image as fallback for second image

  
  return (
    <Link className="link" to={`/product/${item.documentId}`}>
      <div className="card">
        <div className="image">
          {item?.isNew && <span>New arrivals</span>}
          <img
            src={mainImageUrl}
            className="mainImg"
            alt={item?.title || "Product"}
          />
          <img
            src={secondImageUrl}
            className="secondImg"
            alt={item?.title || "Product"}
          />
        </div>
        <div className="itemDetails">
          <h2>{item?.title}</h2>
          <div className="colors">
            {item?.colors?.data?.map(color => 
              <Color 
                color={color?.name?.toLowerCase()} 
                key={`${item?.id}-${color?.name}`} // Better key
              />
            )}
          </div>
        </div>
        <div className="prices">
          <h3>{item?.oldPrice || (item?.price ? item.price + 10 : 'N/A')}</h3>
          <h3>{item?.price || 'N/A'}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;