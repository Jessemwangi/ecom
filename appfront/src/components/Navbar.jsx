import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import Cart from "./Cart/Cart";

const Navbar = () => {
  const [openCart , setOpenCart] = useState(false)
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="img/pd.png" alt="" className="image" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
          <img src="img/us.png" alt="" className="image" />
            
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className="link" to="products/1">Women</Link>
          </div>
          <div className="item">
            <Link className="link" to="products/2">Men</Link>
          </div>
          <div className="item">
            <Link className="link" to="products/3">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">Kuguza Shops</Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to="/">Home</Link>
          </div>
          <div className="item">
            <Link className="link" to="/">about</Link>
          </div>
          <div className="item">
            <Link className="link" to="/">contact</Link>
          </div>
          <div className="item">
            <Link className="link" to="/">store</Link>
          </div>
          <div className="icons">
            <SearchIcon />
            <PersonOutlineIcon />
            <FavoriteBorderOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpenCart(!openCart)}>
              <ShoppingCartOutlinedIcon />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      {openCart && <Cart/>}
    </div>
  );
};

export default Navbar;
