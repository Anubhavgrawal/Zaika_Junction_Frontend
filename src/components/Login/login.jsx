import React, { useState } from "react";
import "./login.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
// import { set } from "mongoose";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-container">
        <form onSubmit={onLogin} className="login-popup-container-form">
          <div className="login-title">
            <h2>{currState}</h2>
            {setShowLogin && (
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt="Close"
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "20px",
                  cursor: "pointer",
                  width: "20px",
                  height: "20px",
                  opacity: "0.7",
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "1")}
                onMouseLeave={(e) => (e.target.style.opacity = "0.7")}
              />
            )}
          </div>
          <div className="login-welcome">
            <h3>Welcome To Zaika Junction !!</h3>
            <p className="login-description">
              Join now to explore delicious food options
            </p>
          </div>
          <div className="login-popup-input">
            {currState === "Sign Up" && (
              <input
                type="text"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                className="login-name"
                placeholder="Your full name"
                required
              />
            )}
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="login-email"
              placeholder="Your email address"
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              className="login-password"
              placeholder="Enter your password"
              required
            />
            <div className="login-forgot-password">
              <div className="remember-me">
                <input
                  className="remember-me-checkbox"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              {currState === "Sign Up" || (
                <a className="login-forgot-password-link" href="/">
                  Forgot Password?
                </a>
              )}
            </div>
            <button type="submit" className="login-submit-btn">
              {currState === "Sign Up" ? "Create Account" : "Sign In"}
            </button>
          </div>
        </form>
        <div className="login-signup">
          <p>
            {currState === "Sign Up"
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              className="login-signup-link"
              onClick={() =>
                setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
              }
            >
              {currState === "Sign Up" ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
