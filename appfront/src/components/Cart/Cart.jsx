import React from "react";
import "./Cart.scss";
import { items } from "../featured/FeaturedProducts";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Cart = () => {
  const data = items;
  return (
    <div className="cart">
      <h1>Product in your Cart</h1>
      {data.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="Cart Item" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.description.substring(0, 100)}</p>
            <div className="price">1 X {item.price}</div>
          </div>
          <DeleteForeverOutlinedIcon className="deleteIcon" />
        </div>
      ))}
      <div className="total">
        <span>SUB TOTAL</span>
        <span>$299</span>
      </div>
      <button className="checkOut">Checkout</button>
      <span className="reset">Clear Cart</span>
    </div>
  );
};

export default Cart;
