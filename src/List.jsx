import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './List.css';

const FormDetails = () => {
  const [forms, setForms] = useState([]);
  const [currLevel, setCurrLevel] = useState(1); // Initialize currLevel to 1
  const [inView, setInView] = useState([]); // State for inView forms
  const navigate = useNavigate();

  let pendingForYou = document.getElementById("pendingForyou");
  let pending = document.getElementById("pending");
  let accepted = document.getElementById("accepted");
  let rejected = document.getElementById("rejected");

  useEffect(() => {
    // Fetch data from the API
    fetch("https://web-production-5485.up.railway.app/compensationform/shrey")
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewFullApplication = (formID) => {
    navigate(`/Form/${formID}`);
  };

  const handlePendingClick = () => {
    pending.className = "activated";
    pendingForYou.className = "deactivated";
    accepted.className = "deactivated";
    rejected.className = "deactivated";
    const temp = forms.filter((form) => (form.status > currLevel) && form.status != 4);
    setInView(temp);
  };
  
  const handlePendingForYouClick = () => {
    pendingForYou.className = "activated";
    pending.className = "deactivated";
    accepted.className = "deactivated";
    rejected.className = "deactivated";
    const temp = forms.filter((form) => form.status == currLevel);
    setInView(temp);
  };
  
  const handleAcceptedClick = () => {
    accepted.className = "activated";
    pendingForYou.className = "deactivated";
    pending.className = "deactivated";
    rejected.className = "deactivated";
    const temp = forms.filter((form) => form.status == 4);
    setInView(temp);
  };
  
  const handleRejectedClick = () => {
    rejected.className = "activated";
    pendingForYou.className = "deactivated";
    pending.className = "deactivated";
    accepted.className = "deactivated";
    const temp = forms.filter((form) => form.status == -1);
    setInView(temp);
  };

  return (
    <div className="container3">
      <div className="sidebar">
        <ul>
          <li>
            <button id="pendingForyou" className="deactivated" onClick={handlePendingForYouClick}>Pending (For You) <strong>&#8594;</strong> </button>
          </li>
          <li>
            <button id="pending" className="deactivated" onClick={handlePendingClick}>Pending <strong>&#8594;</strong></button>
          </li>
          <li>
            <button id="accepted" className="deactivated" onClick={handleAcceptedClick}>Accepted <strong>&#8594;</strong></button>
          </li>
          <li>
            <button id="rejected" className="deactivated" onClick={handleRejectedClick}>Rejected <strong>&#8594;</strong></button>
          </li>
        </ul>
      </div>

      <div className="outer">
        <h2 className="title">In View Forms</h2>
        <div className="form-container">
          {inView.length === 0 ? (
            <div> <p>No forms are currently in view.</p> </div>
          ) : (
            inView.map((form) => (
              <div key={form.formID} className="form-card">
                <h2 className="form-title">Form Details</h2>
                <p>
                  <strong>Form ID:</strong> {form.formID}
                </p>
                <p>
                  <strong>Submission Date:</strong>{" "}
                  {new Date(form.submissionDateTime).toISOString().split("T")[0]}
                </p>
                <p>
                  <strong>Applicant Name:</strong> {form.applicantName}
                </p>
                <p>
                  <strong>Age:</strong> {form.age}
                </p>
                <p>
                  <strong>Animal:</strong> {form.animalName}
                </p>
                <p>
                  <strong>Incident Date:</strong> {form.incidentDate}
                </p>
                <button
                  className="view-button"
                  onClick={() => handleViewFullApplication(form.formID)}
                >
                  View Full Application
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FormDetails;