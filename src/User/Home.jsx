import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="UserHome" style={{ textAlign: "center", marginTop: "2rem", color: 'black' }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem", color: 'black' }}>Welcome</h1>

      <div className="forms">
        <div className="form-card">
          <h3>Form Title</h3>
          <p>Form description</p>
          <button>View Forms</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;