import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './Form.css';

const ApplicationVerification = () => {
  const [data, setData] = useState(0);
  const [FormID, setFormID] = useState(0);
  const [Comments, setComments] = useState("None");
  const [isOpen, setIsOpen] = useState(false);
  const [Decision, setDecision] = useState("");
  const [aprrove_type, setAprrove_type] = useState("Forward");
  const mapping = {
    0: 'Forest Guard',
    1: 'Deputy Ranger',
    2: 'Ranger',
    3: 'S.D.O',
    4: 'D.F.O',
    5: 'P.C.C.F',
  };
  const empData = JSON.parse(localStorage.getItem("employeeData"));
  const params = useParams();

  useEffect(() => {
    if (params.formID !== FormID) setFormID(params.formID);
    console.log(empData);
    if (empData.roll === "dfo") setAprrove_type("Accept");
  }, [params.formID]);

  useEffect(() => {
    fetch(`https://web-production-5485.up.railway.app/compensationform/${empData.roll}/${empData.emp_id}`)
      .then((response) => response.json())
      .then((array) => {
        const matchedData = array.find((item) => item.formID === parseInt(params.formID, 10));
        setData(matchedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [params.formID, empData]);

  const handlingButtons = (action) => {
    setData(null);
    fetch(`https://web-production-5485.up.railway.app/update_form_status/${FormID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_id: FormID,
        action: action,
        comments: Comments,
        verified_by: empData.emp_id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        return fetch(`https://web-production-5485.up.railway.app/compensationform/${empData.roll}/${empData.emp_id}`);
      })
      .then((response) => response.json())
      .then((array) => {
        const matchedData = array.find((item) => item.formID === parseInt(params.formID, 10));
        setData(matchedData);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClosePopup = () => {
    if (isOpen) setIsOpen(false);
  };
  const handlePopup = (temp) => {
    if (!isOpen) setIsOpen(true);
    if (Decision !== temp) setDecision(temp);
  };

  const handleConfirm = () => {
    handlingButtons(Decision);
    if (isOpen) setIsOpen(false);
  };

  if (!data) {
    return (
      <div className="container4">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container4">
      <h1 className="header">Application Verification: {data.formID}</h1>

      <div className="details">
        <div className="left">
          <div className="section">
            <h2>Applicant Details</h2>
            <div className="grid">
              <div className="field">Name: {data.applicantName}</div>
              <div className="field">Aadhaar Number: {data.aadhaarNumber}</div>
              <div className="field">Father/Spouse Name: {data.fatherSpouseName}</div>
              <div className="field">Address: {data.address}</div>
              <div className="field">Age: {data.age}</div>
              <div className="field">Additional Details: {data.additionalDetails || "N/A"}</div>
              <div className="field">Mobile: {data.mobile}</div>
              <div className="field">PAN Number: {data.panNumber}</div>
              <a href={data.documentURL} target="_blank" rel="noopener noreferrer">View/Download Document</a>
            </div>
          </div>

          <div className="section">
            <h2>Location Details</h2>
            <div className="grid">
              <div className="field">Circle CG: {data.circle_CG}</div>
              <div className="field">Division: {data.division}</div>
              <div className="field">Subdivision: {data.subdivision}</div>
              <div className="field">Circle1: {data.circle1}</div>
              <div className="field">Range: {data.range_}</div>
              <div className="field">Beat: {data.beat}</div>
            </div>

            <h2>Incident Details</h2>
            <div className="grid">
              <div className="field">Animal Name: {data.animalName}</div>
              <div className="field">Incident Date: {data.incidentDate}</div>
            </div>
          </div>

          <div className="section">
            <h2>Form Details</h2>
            <div className="grid">
              <div className="field">Form ID: {data.formID}</div>
              <div className="field">Filled By: {data.forestGuardID}</div>
              <div className="field">Current Status: {mapping[data.status]}</div>
              <div className="field">Submission Date & Time: {data.submissionDateTime}</div>
              <div className="field">Total Compensation Amount: {data.totalCompensationAmount}</div>
            </div>
          </div>

          <div className="section">
            <h2>Damage Details</h2>
            <div className="grid">
              <div className="field">Crop Damage Area: {data.cropDamageArea}</div>
              <div className="field">Crop Type: {data.cropType || "N/A"}</div>
              <div className="field">Cattle Injury Amount: {data.catleInjuryAmount || "N/A"}</div>
              <div className="field">Number of Cattles Died: {data.numberOfCattlesDied}</div>
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
            </div>
          </div>

          <div className="section">
            <h2>Approval</h2>
            <textarea value={Comments} onChange={(e) => setComments(e.target.value)} placeholder="Add your comments here..." className="textarea"></textarea>
            <div className="buttons">
              <button className="btn reject" onClick={() => handlePopup("reject")}>Reject</button>
              <button className="btn approve" onClick={() => handlePopup("accept")}>{aprrove_type}</button>
              <button className="btn send-back" onClick={() => handlePopup("send_back")}>Send Back</button>
            </div>
          </div>

          <div className="section table">
            <h2>Status History</h2>

            <div className="table-container">
              <table className="status-table">
                <thead>
                  <tr>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                    <th>Updated By (ID)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.statusHistory.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.comment || "No Comment"}</td>
                      <td>{entry.status}</td>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                      <td>{entry.updatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <iframe className="right" src={`${data.documentURL}#navbar=0`}></iframe>
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