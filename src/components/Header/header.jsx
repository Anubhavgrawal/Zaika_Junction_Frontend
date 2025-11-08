import React from "react";
import "./header.css";
import heroSection from "../../assets/heroSection.json";
import Lottie from "react-lottie-player";

function Header() {
  return (
    <header className="header">
      <div className="heroSection">
        <Lottie animationData={heroSection} loop play={true} />
      </div>
    </header>
  );
}

export default Header;
