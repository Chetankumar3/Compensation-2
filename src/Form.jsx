import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './Form.css';

const ApplicationVerification = () => {
  const [data, setData] = useState(0);
  const [FormID, setFormID] = useState(0);
  const [Comments, setComments] = useState("");
  const params = useParams();

  useEffect(() => {
    // const newFormID = params.formID;
    // if (newFormID != FormID) {
      setFormID(params.formID);  // Only update state if FormID has changed
    // }
  }, [params.formID]);  // Only depend on params.formID

  useEffect(() => {
    fetch("https://web-production-5485.up.railway.app/compensationform/shrey")
      .then((response) => response.json())
      .then((array) => {
        const matchedData = array.find((item) => item.formID === parseInt(params.formID, 10));
        setData(matchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [params.formID]);

  const handlingButtons = (action) => {
    // console.log(FormID);
    return () => {
      fetch(`https://web-production-5485.up.railway.app/update_form_status/${FormID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_id: params.formID,
          action: action,
          comments: Comments,
        }),
      })
        .then(response => response.json())
        .catch((error) => console.error("Error updating Status:", error));
    };
  };

  if (!data) {
    return <div className="container4 Loading">Loading...</div>;
  }

  return (
    <div className="container4">
      <h1 className="header">Application Verification {params.formID}</h1>

      <div className="details">
        <div className="left">
          <div className="section">
            <h2>Applicant Details</h2>
            <div className="grid">
              <div className="field">Aadhaar Number: {data.aadhaarNumber}</div>
              <div className="field">Applicant Name: {data.applicantName}</div>
              <div className="field">Father/Spouse Name: {data.fatherSpouseName}</div>
              <div className="field">Address: {data.address}</div>
              <div className="field">Age: {data.age}</div>
              <div className="field">Mobile: {data.mobile}</div>
            </div>
          </div>

          <div className="section">
            <h2>Incident Details</h2>
            <div className="grid">
              <div className="field">Incident Date: {data.incidentDate}</div>
              <div className="field">Animal Name: {data.animalName}</div>
              <div className="field">Number of Deaths: {data.numberOfDeaths}</div>
              <div className="field">Permanent Injury Details: {data.permanentInjuryDetails || "N/A"}</div>
              <div className="field">Temporary Injury Details: {data.temporaryInjuryDetails || "N/A"}</div>
            </div>
          </div>

          <div className="section">
            <h2>Damage Details</h2>
            <div className="grid">
              <div className="field">Crop Type: {data.cropType || "N/A"}</div>
              <div className="field">Cereal Crop: {data.cerealCrop || "N/A"}</div>
              <div className="field">Crop Damage Area: {data.cropDamageArea || 0}</div>
              <div className="field">Number of Cattles Died: {data.numberOfCattlesDied || 0}</div>
              <div className="field">Full House Damage: {data.fullHouseDamage || "N/A"}</div>
              <div className="field">Partial House Damage: {data.partialHouseDamage || "N/A"}</div>
            </div>
          </div>

          <div className="section">
            <h2>Bank Details</h2>
            <div className="grid">
              <div className="field">Account Holder Name: {data.accountHolderName}</div>
              <div className="field">Account Number: {data.accountNumber}</div>
              <div className="field">Bank Name: {data.bankName}</div>
              <div className="field">Branch Name: {data.branchName}</div>
              <div className="field">IFSC Code: {data.ifscCode}</div>
              <div className="field">PAN Number: {data.panNumber}</div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="section">
            <h2>Verification & Status</h2>
            <div className="grid">
              <div className="field">Form ID: {data.formID}</div>
              <div className="field">Submission Date: {data.submissionDateTime}</div>
              <div className="field">Verified By: {data.verifiedBy}</div>
              <div className="field">Payment Processed By: {data.paymentProcessedBy}</div>
              <div className="field">Status: {data.status || "Pending"}</div>
              <div className="field">Message for not approval: <strong className="comments">{data.comments || "Pending"}</strong></div>
            </div>
            <a href={data.documentURL} target="_blank" rel="noopener noreferrer">
              View/Download Document
            </a>
          </div>

          <div className="section">
            <h2>Comments</h2>
            <textarea value = {Comments} onChange={(e)=>{ setComments(e.target.value) }} placeholder="Add your comments here..." className="textarea"></textarea>

            <div className="buttons">
              <button className="btn reject" onClick={handlingButtons("reject")}>Reject</button>
              <button className="btn approve" onClick={handlingButtons("accept")}>Approve</button>
              <button className="btn send-back" onClick={handlingButtons("send_back")}>Send Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationVerification;