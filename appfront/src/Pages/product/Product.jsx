import React, { useState } from "react";
import "./Product.scss";
import { items } from "../../components/featured/FeaturedProducts";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import { Slider } from "@mui/material";

const Product = () => {
  const color = ["red", "green", "blue", "pink", "white", "black"];
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const images_ = items[0];
  const [validationError, setValidationError] = useState("");
  const images = [images_.img, images_.img2, images_.img3, images_.img4];

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          {images.map((pic, index) => (
            <img
              src={pic}
              alt=""
              key={index}
              onClick={(e) => setSelectedImg(index)}
            />
          ))}
        </div>
        <div className="mainImg">
          <img src={images[selectedImg]} alt="preview" />
        </div>
      </div>

      <div className="right">
        <h1>title of</h1>
        <span className="price">price $19.99</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
          voluptatem voluptatibus tenetur, at debitis quis sunt laboriosam.
          Praesentium dolorem, nam labore accusantium amet, sit voluptate aut
          tempore explicabo, earum in?
        </p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev <= 0 ? 0 : prev - 1))}
          >
            -
          </button>
          <span className="totalSelected">{quantity}</span>

          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <div className="color">
          <select className="select">
            <option value="">Select an color</option>{" "}
            {/* Default/placeholder option */}
            {color.map((col, index) => (
              <option key={index} value={col} className="options">
                {col}
              </option>
            ))}
          </select>
        </div>
        <div className="size">
          <h3>Size</h3>
          <div className="item">
        {color.map((col, index) => (
          <span key={index}>
            {index + 20/100}
          </span>
        ))}
          </div>
        </div>

        <button className="add">
          <AddShoppingCartOutlinedIcon />
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderOutlinedIcon /> Add to wish
          </div>
          <div className="item">
            <CompareOutlinedIcon /> Add to compare
          </div>
        </div>

        <div className="info">
          <span>vendor</span>
          <span>product : .....</span>
          <span>tag : ......</span>
          <hr></hr>
        </div>
        <div className="details">
          <h4>rating</h4>
          <div className="description">
            <h4>Description</h4>
            <p>description</p>
          </div>

          <div className="review">
            <h4>leave a review</h4>
            <div className="reviewSlider">
              0 <Slider sx={{ color: "purple" }} /> 5
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
