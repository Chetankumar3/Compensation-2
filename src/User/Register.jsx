import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const RegisterForm = () => {
  const [showFirst, setShowFirst] = useState(true);
  const navigate = useNavigate();

  // State variables for form fields
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [division, setDivision] = useState("");
  const [subDivision, setSubDivision] = useState("");
  const [range, setRange] = useState("");
  const [beat, setBeat] = useState("");

  ompendation
  
  useEffect(() => {
    setTimeout(() => {
      if (showFirst) setShowFirst(false);
    }, 500);

    const user = localStorage.getItem("UserData");
    if (user) {
      navigate("/user/Home");
    }
  }, [navigate, showFirst]);

  const firebaseConfig = {
    apiKey: "AIzaSyBQOW9h79nT9AtL376WYdl3V5WCOrAyfNo",
    authDomain: "compensation-20bcd.firebaseapp.com",
    projectId: "compensation-20bcd",
    storageBucket: "compensation-20bcd.firebasestorage.app",
    messagingSenderId: "512952393727",
    appId: "1:512952393727:web:28ec53152fbad15e38d1ca",
    measurementId: "G-2056CNQLGG"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const CreateAccount = () => {
    createUserWithEmailAndPassword(auth, userID + '@gmail.com', password)
      .then((userCredential) => {
        console.log("Account created successfully");

        navigate('User/Login');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during registration:", errorCode, errorMessage);
        // Optionally display the error to the user
      });
  };

  if (showFirst) {
    return (
      <div className="container">
        <div className="loader-container">
          <div className="loading-logo"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="inner">
        <h2>Sign Up</h2>
        <form className="register-form">
          <div className="register-field">
            <label>User ID</label>
            <input
              type="text"
              placeholder="Enter your User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Re-enter Password</label>
            <input
              type="password"
              placeholder="Re-enter Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="dropdowns">
            <div className="dropdown-field">
              <label>Select your Division:</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                <option value="">Select your Division</option>
                {/* Add more options here */}
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Sub-Division:</label>
              <select
                value={subDivision}
                onChange={(e) => setSubDivision(e.target.value)}
              >
                <option value="">Select your Sub-Division</option>
                {/* Add more options here */}
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Range:</label>
              <select value={range} onChange={(e) => setRange(e.target.value)}>
                <option value="">Select your Range</option>
                {/* Add more options here */}
              </select>
            </div>

            <div className="dropdown-field">
              <label>Select your Beat:</label>
              <select value={beat} onChange={(e) => setBeat(e.target.value)}>
                <option value="">Select your Beat</option>
                {/* Add more options here */}
              </select>
            </div>
          </div>

          <button type="button" onClick={CreateAccount} className="register-btn">
            Register
          </button>
        </form>

        <div className="login-links">
          <a href="#" onClick={() => navigate(`/User/Login`)}>
            Already a User? Log in
          </a>
          <a href="#" onClick={() => navigate(`/Official/Login`)}>
            Official Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;