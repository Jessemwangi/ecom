import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import Color from "../Color/Color";
import { server } from "../../Utility/functions";


const Card = ({ item }) => {

  const number = item?.attributes?.images?.data?.length || 0;
  const randomIndex = Math.floor(Math.random() * number);

  const img2 = randomIndex ===0 ? randomIndex + 1 : randomIndex - 1
  
  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes?.isNew && <span>New arrivals</span>}

          <img
            src={
              server+
              item?.attributes?.images?.data[
                randomIndex
              ].attributes?.url
            }
            className="mainImg"
            alt=""
          />
          <img
            src={
              server +
              item?.attributes?.images?.data[img2].attributes.url
            }
            className="secondImg"
            alt=""
          />
        </div>
        <div className="itemDetails">

        <h2>{item?.attributes?.title}</h2>
        <div className="colors">
          
      { item?.attributes?.colors?.data.map(color => 
       <Color color={color?.attributes?.name.toLowerCase()} key={item?.attributes?.title}/>
        
        )
        
        }
        </div>
        </div>
        <div className="prices">
          <h3>{item?.attributes?.oldPrice || item?.attributes?.price + 10}</h3>
          <h3>{item?.attributes?.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
