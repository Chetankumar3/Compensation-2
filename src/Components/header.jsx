import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './header.css'

const header = ({ LoggedIn }) => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const [MobNo, setMobNo] = useState("q");
  const [loading, setLoading] = useState(false);
  const [employee, setemployee] = useState({
    Name: "---",
    beat: null,
    division: "--",
    emp_id: "--",
    mobile_number: "--",
    range_: "--",
  });

  useEffect(() => {
    // console.log(LoggedIn);
    if (LoggedIn) {
      setemployee(JSON.parse(localStorage.getItem("employeeData")));
      if (employee.mobile_number !== MobNo) setMobNo(employee.mobile_number);
      if (!loading) setLoading(true);
    }
  }, [LoggedIn]);

  const toggleSidebar = () => {
    if (profileRef.current.className === "profile open") profileRef.current.className = "profile";
    else profileRef.current.className = "profile open";
  }

  // return null;
  return (
    <header>
      <div className="logo" onClick={() => { navigate(`/List`); localStorage.clear(); }} >
        <img src="/logo.png" alt="Logo" />
        <h1>CHHATISGARH COMPENSATION</h1>
      </div>

      {LoggedIn ? (
        <>
          <div className="right">
            <a href="#" id='profile' onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" id="user">
                <path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
              </svg>
            </a>
            <a href="#" className='logout' onClick={() => { navigate("/") }}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                <path d="M 12 6 C 8.7099679 6 6 8.7099679 6 12 L 6 36 C 6 39.290032 8.7099679 42 12 42 L 29 42 C 31.776017 42 34.247059 40.180505 34.9375 37.498047 A 2.0004892 2.0004892 0 1 0 31.0625 36.501953 C 30.864941 37.269495 29.951983 38 29 38 L 12 38 C 10.872032 38 10 37.127968 10 36 L 10 12 C 10 10.872032 10.872032 10 12 10 L 29 10 C 29.951983 10 30.864941 10.730505 31.0625 11.498047 A 2.0004892 2.0004892 0 1 0 34.9375 10.501953 C 34.247059 7.8194949 31.776017 6 29 6 L 12 6 z M 33.978516 15.980469 A 2.0002 2.0002 0 0 0 32.585938 19.414062 L 35.171875 22 L 17 22 A 2.0002 2.0002 0 1 0 17 26 L 35.171875 26 L 32.585938 28.585938 A 2.0002 2.0002 0 1 0 35.414062 31.414062 L 41.414062 25.414062 A 2.0002 2.0002 0 0 0 41.414062 22.585938 L 35.414062 16.585938 A 2.0002 2.0002 0 0 0 33.978516 15.980469 z"></path>
              </svg>
            </a>
          </div>

          <div className="profile" ref={profileRef} onClick={toggleSidebar}>
            {loading ? (
              <>
                <div className="employee-card">
                  <h2>Profile Information</h2>
                  <div className="info">
                    <div className="info-item">
                      <span className="label">Employee ID:</span>
                      <span className="value">{employee.emp_id}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Name:</span>
                      <span className="value">{employee.Name}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Mobile Number:</span>
                      <span className="value">{employee.mobile_number}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Division:</span>
                      <span className="value">{employee.division}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Range:</span>
                      <span className="value">{employee.range_}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Beat:</span>
                      <span className="value">{employee.beat}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (<div>Loading...</div>)}

          </div>
        </>
      ) : (<></>)}

    </header>
  )
}

export default header