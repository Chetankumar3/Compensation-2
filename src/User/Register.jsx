import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const RegisterForm = () => {
  const [showFirst, setShowFirst] = useState(true);
  const [RegisterSuccessful, setRegisterSuccessful] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
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
  const CreateAccount = () => {
    setErrorMessage("");

    createUserWithEmailAndPassword(auth, userID + '@gmail.com', password)
      .then((userCredential) => {
        setRegisterSuccessful(true);

        setTimeout(() => {
          navigate('../Login');          
        }, 200);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorMessage === 'Firebase: Error (auth/email-already-in-use).') setErrorMessage('Firebase: Error (auth/username-already-in-use).');
        else setErrorMessage(`${errorMessage}`);
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
                {/* Add more options  here */}
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

        {RegisterSuccessful &&
          <div className="msg">Account Registered Successfully</div>
        }
        {ErrorMessage &&
          <div className="error">{ErrorMessage}</div>
        }
      </div>
    </div>
  );
}

export default RegisterForm;