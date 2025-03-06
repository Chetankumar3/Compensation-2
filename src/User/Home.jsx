import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", color:'black' }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem", color:'black' }}>Welcome to the Home Page</h1>
      <a href='#' onClick={navigate('../FillForm')} style={{ textAlign: "center", marginTop: "2rem", color:'black' }}>Fill Form</a>
    </div>
  );
}

export default HomePage;