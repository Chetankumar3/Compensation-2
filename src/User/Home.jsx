import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="UserHome">
      <h1>Welcome</h1>

      <div className="forms">
        <div className="form-card">
          <h3>Form Title</h3>
          <p>Form description</p>
          <button>View Form</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;