import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validatePassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const LoginForm = () => {
  const [showFirst, setShowFirst] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowFirst(false);
    }, 500);

    const user = localStorage.getItem("UserData");
    if (user) {
      navigate("/user/Home");
    }
  }, [navigate]);

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
  const handleLogin = () => {
    console.log("Called");
    signInWithEmailAndPassword(auth, username + '@gmail.com', password)
      .then((userCredential) => {
      console.log("Signed in successfully");

      const temp = 'Logged In';
      localStorage.setItem('UserData', JSON.stringify(temp) );
      navigate('../Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
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
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <h2>User Login</h2>
        <form className="login-form">
          <div className="login-field">
            <label>User ID</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autocomplete="current-password"
              placeholder="Enter your User ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-btn">
            Login
          </button>
        </form>
        <div className="login-links">
          <a href="#" onClick={() => navigate(`/User/Register`)}>
            New User? Sign Up
          </a>
          <a href="#" onClick={() => navigate(`/Official/Login`)}>
            Official Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
