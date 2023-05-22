import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import './Slider.scss'

const Slider = () => {
    const images = [
        'https://source.unsplash.com/1000x1000/?shoes',
        'https://source.unsplash.com/1000x1000/?dress',
        'https://source.unsplash.com/1000x1000/?bags',
        'https://source.unsplash.com/1000x1000/?shirts',
        'https://source.unsplash.com/1000x1000/?newarrivals',
        'https://source.unsplash.com/1000x1000/?babycloths',
    ]
  return (
    <div className="slider">
      <div className="container">
        <img src={images[0]} alt="" />
        <img src={images[1]} alt="" />
        <img src={images[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon">
          <ArrowBackIosIcon />
        </div>
        <div className="icon">
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
