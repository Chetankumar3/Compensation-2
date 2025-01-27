import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './List.css'

const FormDetails = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="form-container">
      {forms.map((form) => (
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
      ))}
    </div>
  );
};

export default FormDetails;