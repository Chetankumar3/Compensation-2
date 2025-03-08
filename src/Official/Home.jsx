import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './Home.css';

const FormDetails = () => {
  const [forms, setForms] = useState();
  const [inView, setInView] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("Loading");
  const [Loading, setLoading] = useState(true);
  const [empData, setempData] = useState();
  const [currLevel, setCurrLevel] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("employeeData"));

    console.log(user);
    if (!user) {
      user = localStorage.getItem('UserData');
      if(user){
        navigate("/User/Home");
      }else{
        navigate('/Official/Login');
      }
    }else{
        setempData(user);
    }
  }, []);

  useEffect(() => {
    if (!empData) return;

    setCurrLevel(empData.level);
    fetch(`https://web-production-5485.up.railway.app/compensationform/${empData.roll}/${empData.emp_id}`)
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [empData]);

  useEffect(() => {
    if(!forms) return;
    console.log(forms);

    if(Loading) setLoading(false);
    handlePendingForYouClick();
  }, [forms]);

  const handleViewFullApplication = (formID) => {
    navigate(`/Official/Form/${formID}`);
  };

  const handlePendingClick = () => {
    setInView(forms.filter((form) => (form.status > currLevel) && form.status != 4));
    setCurrentFilter("Pending");
  };

  const handlePendingForYouClick = () => {
    setInView(forms.filter((form) => form.status == currLevel));
    setCurrentFilter("Pending (For You)");
  };

  const handleAcceptedClick = () => {
    setInView(forms.filter((form) => form.status == 4));
    setCurrentFilter("Accepted");
  };

  const handleRejectedClick = () => {
    setInView(forms.filter((form) => form.status == -1));
    setCurrentFilter("Rejected");
  };

  return (
    <div className="container3">
      <div className="sidebar">
        <ul>
          <li>
            <button id="pendingForyou" className={currentFilter === "Pending (For You)" ? "activated" : "deactivated"}
              onClick={()=> handlePendingForYouClick()}> Pending (For You) <strong>&#8594;</strong> </button>
          </li>
          <li>
            <button id="pending" className={currentFilter === "Pending" ? "activated" : "deactivated"} onClick={()=> handlePendingClick()}>Pending <strong>&#8594;</strong></button>
          </li>
          <li>
            <button id="accepted" className={currentFilter === "Accepted" ? "activated" : "deactivated"} onClick={()=> handleAcceptedClick()}>Accepted <strong>&#8594;</strong></button>
          </li>
          <li>
            <button id="rejected" className={currentFilter === "Rejected" ? "activated" : "deactivated"} onClick={()=> handleRejectedClick()}>Rejected <strong>&#8594;</strong></button>
          </li>
        </ul>
      </div>

      <div className="outer">
        <h2 className="title">{currentFilter} Forms</h2>
        <div className="form-container">
          {Loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : inView.length === 0 ? (
            <div> <p>No forms.</p> </div>
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