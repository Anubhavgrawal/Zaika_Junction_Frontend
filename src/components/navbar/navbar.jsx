import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import logo from "../../assets/logo.json";
import { useContext } from "react";
import { StoreContext } from "../../Context/storeContext";
import { useNavigate } from "react-router-dom";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  //play functionality is not working
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  const onClickLogo = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1755);
  };

  useEffect(() => {
    onClickLogo();
  }, []);

  return (
    <div className="navbar">
      <Link to={"/"}>
        <div
          style={{ width: "180px", height: "90px" }}
          onClick={() => {
            onClickLogo();
          }}
        >
          <Lottie play={animate} animationData={logo} loop={true} />
        </div>
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : "navbar-item"}
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "about" ? "active" : "navbar-item"}
          onClick={() => setMenu("about")}
        >
          About
        </a>
        <a
          href="#appDownload"
          className={menu === "mobile-app" ? "active" : "navbar-item"}
          onClick={() => setMenu("mobile-app")}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          className={menu === "contact" ? "active" : "navbar-item"}
          onClick={() => setMenu("contact")}
        >
          Contact
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" className="search-icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
