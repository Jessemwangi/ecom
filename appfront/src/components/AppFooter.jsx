import React from "react";
import Contact from "./Contact/Contact";
import payment from '../assets/payment.webp'
import logo from '../assets/logo.png'

const AppFooter = () => {
  return (
    <div className="footer">
      <div className="top">
        <div className="items">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>Arrivals</span>
        </div>
        <div className="items">
        <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>'Compare'</span>
          <span>Cookies</span>
        </div>
        <div className="items">
            <h1>About</h1>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa tempora, itaque, nobis voluptatum distinctio quidem ullam neque rem officiis fugit iste ea at libero aut laboriosam debitis aliquam aperiam commodi!</span>
        </div>
        <div className="items">
        <h1>Contact</h1>
            <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa tempora, itaque, nobis voluptatum distinctio quidem ullam neque rem officiis fugit iste ea at libero aut laboriosam debitis aliquam aperiam commodi!</span>
       {/* <Contact/> */}
        </div>
      </div>
     
      <div className="bottom">
        <div className="left">
            <span className="logo">
              <img src={logo} alt="Logo" />
            </span>
            <span className="copyright">© CopyRight JZ 2023</span>
        </div>
        <Contact/>
        <div className="right">
            <img src={payment} alt="payments" />
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
