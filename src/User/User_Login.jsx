import React from "react";
import { useNavigate } from "react-router-dom";
import "./User_Login.css";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/logo.png"
          alt="Logo"
          className="login-logo"
        />
        <h2>User Login</h2>

        <form className="login-form">
          <div className="login-field">
            <label>User ID</label>
            <input type="text" placeholder="Enter your User ID" />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <button className="login-btn">Login</button>
        </form>

        <div className="login-links">
          <a href="#" onClick={() => navigate(`/`)}>
            New User? Sign Up
          </a>
          <a href="#" onClick={() => navigate(`/Administration/Login`)}>
            Administration Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;