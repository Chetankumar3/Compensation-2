import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './Form.css';

const ApplicationVerification = () => {
  const [data, setData] = useState(0);
  const [FormID, setFormID] = useState(0);
  const [Comments, setComments] = useState("None");
  const [isOpen, setIsOpen] = useState(false);
  const [Decision, setDecision] = useState("");
  const empData = JSON.parse(localStorage.getItem("employeeData"));
  const params = useParams();

  useEffect(() => {
    if (params.formID !== FormID) setFormID(params.formID);
  }, [params.formID]);

  useEffect(() => {
    fetch(`https://web-production-5485.up.railway.app/compensationform/${empData.roll}/${empData.emp_id}`)
      .then((response) => response.json())
      .then((array) => {
        const matchedData = array.find((item) => item.formID === parseInt(params.formID, 10));
        setData(matchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [params.formID]);

  const handlingButtons = (action) => {
    fetch(`https://web-production-5485.up.railway.app/update_form_status/${FormID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: FormID,
        action: action,
        comments: Comments,
      }),
    })
      .then(response => response.json())
      .catch((error) => console.error("Error updating Status:", error));
  };

  const handleClosePopup = () => {
    // console.log("Close Pop up called");
    if (isOpen) setIsOpen(false);
  };
  const handlePopup = (temp) => {
    // console.log(temp);
    if (!isOpen) setIsOpen(true);
    if (Decision !== temp) setDecision(temp);
  };

  const handleConfirm = () => {
    // console.log("Decision: ");
    // console.log(Decision);
    // console.log("Done...");
    handlingButtons(Decision);
    if (isOpen) setIsOpen(false);
  };

  if (!data) {
    return <div className="container4 Loading">Loading...</div>;
  }

  return (
    <div className="container4">
      <h1 className="header">Application Verification: {data.formID}</h1>

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
            <textarea value={Comments} onChange={(e) => { setComments(e.target.value) }} placeholder="Add your comments here..." className="textarea"></textarea>

            <div className="buttons">
              <button className="btn reject" onClick={() => { handlePopup("reject") }}>Reject</button>
              <button className="btn approve" onClick={() => { handlePopup("accept") }}>Approve</button>
              <button className="btn send-back" onClick={() => { handlePopup("send_back") }}>Send Back</button>
            </div>
          </div>
        </div>

        {/* <div className="right"> */}
        {/* <iframe className="right" src={`https://drive.google.com/file/d/1SjBtVtx0tFqnCWeMt4GU9lES0WywMK58/preview`} frameborder="0"></iframe> */}
        <iframe className="right" src={`${data.documentURL}#navbar=0`}></iframe>
        {/* </div> */}
      </div>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure? This can't be reverted back.</p>
            <div className="popup-actions">
              <button onClick={() => { handleClosePopup() }} className="btn cancel-btn">
                Cancel
              </button>
              <button onClick={() => { handleConfirm() }} className="btn confirm-btn">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationVerification;