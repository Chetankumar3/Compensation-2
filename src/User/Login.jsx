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
  const [LogInSuccessful, setLogInSuccessful] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
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
    apiKey: "AIzaSyCZe9gNm1yMdEvz1404e88MdzzhHmHMTyc",
    authDomain: "compensation-app-4b6fa.firebaseapp.com",
    projectId: "compensation-app-4b6fa",
    storageBucket: "compensation-app-4b6fa.firebasestorage.app",
    messagingSenderId: "565021771486",
    appId: "1:565021771486:web:380ebb8fb6325d3d4ae44f",
    measurementId: "G-NX2LX8M5DV"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const handleLogin = () => {
    setErrorMessage("")
    signInWithEmailAndPassword(auth, username + '@gmail.com', password)
      .then((userCredential) => {
      setLogInSuccessful(true);

      const temp = 'Logged In';
      localStorage.setItem('UserData', JSON.stringify(temp) );
       
      setTimeout( () => (navigate('/User/Home')), 200);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorMessage);
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
          <button type="button" onClick={()=> handleLogin()} className="login-btn">
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

        {LogInSuccessful &&
          <div className="msg">Log In Successfully</div>
        }
        {ErrorMessage &&
          <div className="error">{ErrorMessage}</div>
        }
      </div>
    </div>
  );
};

export default LoginForm;