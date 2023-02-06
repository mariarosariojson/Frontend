import React from "react";
import { Link } from "react-router-dom";

import "../style/checkout.css";

export default function Checkout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  return (
    <div className="checkout-wrapper">
      <div className="products">
        {cartItems.length === 0 ? (
          <div className="empty-container">
            {" "}
            <h3>Nothing here</h3>
            <Link to="/">
              <button className="empty-btn" type="button">
                Back to our products
              </button>
            </Link>
          </div>
        ) : (
          <div className="product">
            <h3>Orders</h3>
            
          </div>
        )}
      </div>
      <div className="paymnet">
        <div className="checkout-in">
          <h2>Payment Information</h2>
        </div>
        <div className="checkout-name checkout-input">
          <label>First Name:</label>
          <input className="checkout-form" name="firstname" type="text" />
        </div>
        <div className="checkout-lastname checkout-input">
          <label>Last Name:</label>
          <input className="checkout-form" name="lastname" type="text" />
        </div>
        <div className="checkout-phone checkout-input">
          <label>Phone:</label>
          <input className="checkout-form" name="phonenumber" type="number" />
        </div>
        <div className="checkout-email checkout-input">
          <label>Email:</label>
          <input className="checkout-form" name="emailaddress" type="text" />
        </div>
        <div className="checkout-address checkout-input">
          <label>Address:</label>
          <input className="checkout-form" name="address" type="text" />
        </div>
        <div className="checkout-city checkout-input">
          <label>City:</label>
          <input className="checkout-form" name="city" type="text" />
        </div>
        <div className="checkout-zipcode checkout-input">
          <label>Zip Code:</label>
          <input className="checkout-form" name="zipcode" type="number" />
          <h3>TOTAL:  SEK</h3>
          <input className="checkout-btn" type="submit" value="Send it to me!" />
        </div>
      </div>
    </div>
  );
}
