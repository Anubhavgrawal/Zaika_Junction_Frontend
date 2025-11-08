import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img
            className="logoimg"
            src={assets.logoImage}
            alt=""
            style={{ width: "190px", height: "auto" }}
          />
          <p>
            Zaika Junction is a food delivery service that brings delicious
            meals from local restaurants to your doorstep.
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 8765***219</li>
            <li>info@zaikajunction.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>© 2025 Zaika Junction. All rights reserved.</p>
    </div>
  );
}

export default Footer;
