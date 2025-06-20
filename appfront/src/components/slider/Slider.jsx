import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import './Slider.scss'

const Slider = () => {
  const [currentSlide, setCurrentSlide]= useState(0)

const images = [
  'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
  'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
  'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg',
  'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
  'https://images.pexels.com/photos/2983465/pexels-photo-2983465.jpeg',
  'https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg',
];


    const prevSlide = () =>{
      console.log(currentSlide, images.length)
setCurrentSlide(currentSlide === 0 ? images.length - 1 : (prev) => prev - 1 )
    }
    const nextSlide = () =>{
      console.log(currentSlide, images.length)
      setCurrentSlide(currentSlide === images.length -1  ? 0 : (prev) => prev + 1 )
    }
  return (
    <div className="slider">
      <div className="container" style={{ width:`${images.length * 100}vw`, transform: `translateX(-${currentSlide * 100}vw)` }}>
        <img src={images[0]} alt="" />
        <img src={images[1]} alt="" />
        <img src={images[2]} alt="" />
        <img src={images[3]} alt="" />
        <img src={images[4]} alt="" />
        <img src={images[5]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ArrowBackIosIcon  />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
