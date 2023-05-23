import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import './Slider.scss'

const Slider = () => {
  const [currentSlide, setCurrentSlide]= useState(0)

    const images = [
        'https://source.unsplash.com/1000x1000/?shoes',
        'https://source.unsplash.com/1000x1000/?dress',
        'https://source.unsplash.com/1000x1000/?bags',
        'https://source.unsplash.com/1000x1000/?shirts',
        'https://source.unsplash.com/1000x1000/?clothes',
        'https://source.unsplash.com/1000x1000/?pajamas',
    ]

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
