import React, { Fragment, useState } from "react";
import "./Product.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import { Slider } from "@mui/material";
import UseFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import { buildImageUrl } from "../../Utility/imageHelper";

const Product = () => {
  const id = useParams().id;
  const { data, loading, error } = UseFetch(
    `/products/${id}?populate=* `
  );


  const [bgcolor, setbgColor] = useState('purple')
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(0);

const handleColorChange = (e) => {
  e.preventDefault();
  const color =e.target.value !==''? e.target.value : 'purple'
  setbgColor(color.toLowerCase())
console.log(e.target.value)
}
  console.log(data)
  return (
    <Fragment>
      { loading ? 
        (
<>Loading ..</>
        )
        :
        
        (
          <div className="product">
            <div className="upper">

          
          <div className="left">
            <div className="images">
              {data && data?.images.map((pic, index) => (
                <img
                  src={buildImageUrl(pic?.url)}
                  alt=""
                  key={pic.id}
                  onClick={(e) => setSelectedImg(index)}
                />
              ))}
            </div>
            <div className="mainImg">
              <img src={buildImageUrl(data?.images[selectedImg]?.url)} alt="preview" />
            </div>
          </div>
    
          <div className="right">
            <h1>{data?.title}</h1>
            <span className="price">Price ${data?.price} </span>
            <span className="quantity">In store #{data?.quantity} </span>
            <p>
            {data?.desc}
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
              <select className="select" onChange={(e) => handleColorChange(e)}
              style={{background:bgcolor, color:bgcolor ==='white'? 'purple' : 'white'}}>
                <option value="">Select an color</option>{" "}
                {/* Default/placeholder option */} 
                {data?.colors?.map((col) => (
                  <option key={col?.id} value={col?.name} className="options"
                   >
                    {col?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="size">
              <h3>Size</h3>
              <div className="item">
            
          {  data?.productsizes?.map(size => 
           <span key={size?.id}>
                {size?.size}
              </span>)
           
          }
          
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
          <div className="lower">
          <Comments/>
          </div>
        </div>
        )
      }
    {error ? 'error has occured ': ''}

    </Fragment>

  );
};

export default Product;
