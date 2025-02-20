import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const registerForm = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="inner">
        <h2>Sign Up</h2>
        <form className="register-form">
          <div className="register-field">
            <label>User ID</label>
            <input type="text" placeholder="Enter your User ID" />
          </div>

          <div className="register-field">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <div className="register-field">
            <label>Name</label>
            <input type="text" placeholder="Enter your Name" />
          </div>

          <div className="register-field">
            <label>Re-enter Password</label>
            <input type="password" placeholder="Re-enter Password" />
          </div>

          <div className="register-field">
            <label>Mobile Number</label>
            <input type="text" placeholder="Enter your Mobile Number" />
          </div>

          <div className="dropdowns">
            <div className="dropdown-field">
              <label>Select your Division:</label>
              <select>
                <option>Select your Division</option>
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Sub-Division:</label>
              <select>
                <option>Select your Sub-Division</option>
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Range:</label>
              <select>
                <option>Select your Range</option>
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Beat:</label>
              <select>
                <option>Select your Beat</option>
              </select>
            </div>
          </div>

          <button className="register-btn">Register</button>
        </form>

        <div className="login-links">
          <a href="#" onClick={() => navigate(`/User/Login`)}>
            Already a User? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default registerForm;