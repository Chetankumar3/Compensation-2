import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FillForm.css";

export default function DamageReport() {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem('employeeData') || localStorage.getItem('UserData');
    if (!user) navigate("/User/Login");
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('damageReportForm');   
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach(key => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem('damageReportForm', JSON.stringify(watch()));
  }, [watch()]);

  const onSubmit = async (data) => {
    try {
      await fetch('https://web-production-5485.up.railway.app/compensationform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      alert('Form submitted successfully!');
      localStorage.removeItem('damageReportForm');
      navigate('/User/Home');
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Damage Report Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="damage-form">
          <section className="form-section">
            <h2>Incident Details</h2>
            <div className="form-group">
              <label>Case No.*</label>
              <input {...register("caseNo", { required: true })} />
            </div>
            <div className="form-group">
              <label>Division Name*</label>
              <input {...register("divisionName", { required: true })} />
            </div>
            <div className="form-group">
              <label>Range*</label>
              <input {...register("range", { required: true })} />
            </div>
            <div className="form-group">
              <label>Beat*</label>
              <input {...register("beat", { required: true })} />
            </div>
          </section>

          <section className="form-section">
            <h2>Cattle Loss Details</h2>
            <div className="form-group">
              <label>Details of Cattle Loss*</label>
              <textarea {...register("cattleLoss", { required: true })} />
            </div>
            <div className="form-group">
              <label>Cattle's Estimated Age*</label>
              <input type="number" {...register("cattleAge", { required: true })} />
            </div>
            <div className="form-group">
              <label>Market Rate*</label>
              <input type="number" {...register("marketRate", { required: true })} />
            </div>
            <div className="form-group">
              <label>Place of Incident*</label>
              <input {...register("incidentPlace", { required: true })} />
            </div>
            <div className="form-group">
              <label>Date of Incident*</label>
              <input type="date" {...register("incidentDate", { required: true })} />
            </div>
            <div className="form-group">
              <label>Name of Animal Caused the Incident*</label>
              <input {...register("animalCaused", { required: true })} />
            </div>
          </section>

          <section className="form-section">
            <h2>Human Loss Details</h2>
            <div className="form-group">
              <label>Name & Age of the Victim*</label>
              <input {...register("victimNameAge", { required: true })} />
            </div>
            <div className="form-group">
              <label>Family Details and Documents*</label>
              <textarea {...register("familyDetails", { required: true })} />
            </div>
            <div className="form-group">
              <label>Place of Incident*</label>
              <input {...register("humanIncidentPlace", { required: true })} />
            </div>
            <div className="form-group">
              <label>Date of Incident*</label>
              <input type="date" {...register("humanIncidentDate", { required: true })} />
            </div>
            <div className="form-group">
              <label>Name of the Animal Caused the Incident*</label>
              <input {...register("humanAnimalCaused", { required: true })} />
            </div>
            <div className="form-group">
              <label>Dead/Injury Details*</label>
              <textarea {...register("deadInjuryDetails", { required: true })} />
            </div>
          </section>

          <section className="form-section">
            <h2>Reporting & Witness</h2>
            <div className="form-group">
              <label>Person Who Reported the Incident*</label>
              <input {...register("reporterDetails", { required: true })} />
            </div>
            <div className="form-group">
              <label>Witness (People Name)*</label>
              <input {...register("witnessNames", { required: true })} />
            </div>
          </section>

          <section className="form-section">
            <h2>Document Submission</h2>
            <div className="form-group">
              <label>Name to Send Documents (Range Officer - SDO - DFO)*</label>
              <input {...register("documentRecipients", { required: true })} />
            </div>
          </section>

          <button type="submit" className="submit-button">Submit Report</button>
        </form>
      </div>
    </div>
  );
}