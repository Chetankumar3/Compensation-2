import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [Title, setTitle] = useState("CHATTISGARH COMPENSATION");
  const [empData, setempData] = useState({
    emp_id: "--",
    Name: "XYZ",
    mobile_number: "--",
    Circle_CG: "--",
    Circle1: "--",
    roll: "--",
    division: "--",
    subdivision: "--",
    range_: "--",
    beat: null,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeData"));
    if (storedData !== null) {
      setempData(storedData);
    }
  }, []);

  useEffect(() => {
    if (empData.emp_id !== '--') {
      if (!loading) setLoading(true);
      setTitle('WELCOME, ' + empData.Name);
    }
  }, [empData]);

  const toggleSidebar = () => {
    if (profileRef.current.classList.contains("open")) {
      profileRef.current.classList.remove("open");
    } else {
      profileRef.current.classList.add("open");
    }
  };

  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="Logo" onClick={() => { navigate(`../`); }} />
        <h1><strong> {Title} </strong></h1>
      </div>

      {(empData.emp_id !== '--') && (
        <>
          <div className="right">
            <a href="#" id='profile' onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" id="user">
                <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
              </svg>
            </a>
          </div>

          <div className="profile" ref={profileRef}>
            <img  src='/cancel.png' className="minimize-btn" onClick={toggleSidebar}></img>

            {loading ? (
              <div className="employee-card">
                <h2>Profile Information</h2>
                <div className="info">
                  {Object.entries(empData).map(([key, value]) => (
                    <div className="info-item" key={key}>
                      <span className="label">{key.replace(/_/g, ' ')}:</span>
                      <span className="value">{value}</span>
                    </div>
                  ))}
                </div>
                <button className="logout" onClick={() => { navigate("/"); localStorage.clear(); }}>
                  Logout
                </button>
              </div>
            ) : (<div>Loading...</div>)}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;