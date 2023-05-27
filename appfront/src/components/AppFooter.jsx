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
            <span>
            Welcome to our online e-commerce store, where you can find a wide range of shoes, 
            dresses, kidswear, and clothing for men and women. We take pride in offering a diverse
             selection of high-quality products that cater to various styles, preferences, and ages.
             Shop with us today and discover the perfect shoes, dresses, kidswear, and clothing that 
             will make you look and feel your best
            </span>
        </div>
        <div className="items">
        <h1>Contact</h1>
            <span>
            At our e-commerce store, we strive to provide an enjoyable shopping experience, with easy
             navigation, secure payments, and reliable shipping options. We are dedicated to customer
              satisfaction, ensuring that you receive top-notch service from the moment you browse our 
              website to the arrival of your carefully packaged order.
            </span>
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
