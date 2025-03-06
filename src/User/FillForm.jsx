import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FillForm.css";
import { use } from "react";

export default function DamageReport() {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const navigate = useNavigate();

  // Watch all form fields
  const formValues = watch();

  useEffect(()=>{
    let user = localStorage.getItem('employeeData');

    if(!user){
      user = localStorage.getItem('UserData');
      if(user){
        navigate("/User/FillForm");
      }else{
        navigate("/User/Login");
      }
    }
  },[]);

  useEffect(() => {
    const savedData = localStorage.getItem('damageReportForm');   
    
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
            setValue(key, parsedData[key]);
      });
    }
}, [setValue]);

useEffect(() => {
    localStorage.setItem('damageReportForm', JSON.stringify(formValues));
}, [formValues]);

const onSubmit = async (data) => {
    try{
        let savedData = JSON.parse(localStorage.getItem("damageReportForm"));

        if (savedData) {
            savedData.documentURL = "https://www.google.com";
            localStorage.setItem("damageReportForm", JSON.stringify(savedData));
        }

      const response = await fetch('https://web-production-5485.up.railway.app/compensationform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      alert('Form submitted successfully!');
      localStorage.removeItem('damageReportForm');
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Damage Report Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="damage-form">
        {/* <form onSubmit={onSubmit()} className="damage-form"> */}
            
            <div className="first">
              <section className="form-section">
                <h2>Personal Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Forest Guard ID*</label>
                    <input {...register("forestGuardID", { required: true })} />
                    {errors.forestGuardID && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Name*</label>
                    <input {...register("name", { required: true })} />
                    {errors.name && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Age*</label>
                    <input type="number" {...register("age", { required: true })} />
                    {errors.age && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Father/Spouse Name*</label>
                    <input {...register("fatherOrSpouseName", { required: true })} />
                    {errors.fatherOrSpouseName && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Mobile*</label>
                    <input type="tel" {...register("mobile", { required: true, pattern: /^\d{10}$/ })} />
                    {errors.mobile && <span className="error">Please enter a valid 10-digit number</span>}
                  </div>
                  <div className="form-group">
                    <label>Address*</label>
                    <textarea {...register("address", { required: true })} />
                    {errors.address && <span className="error">This field is required</span>}
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2>Bank Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Bank Name*</label>
                    <input {...register("bankName", { required: true })} />
                    {errors.bankName && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>IFSC Code*</label>
                    {/* <input {...register("ifscCode", { required: true, pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/ })} /> */}
                    <input {...register("ifscCode", { required: true})} />
                    {errors.ifscCode && <span className="error">Please enter a valid IFSC code</span>}
                  </div>
                  <div className="form-group">
                    <label>Bank Branch*</label>
                    <input {...register("bankBranch", { required: true })} />
                    {errors.bankBranch && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Account Holder Name*</label>
                    <input {...register("bankHolderName", { required: true })} />
                    {errors.bankHolderName && <span className="error">This field is required</span>}
                  </div>
                  <div className="form-group">
                    <label>Account Number*</label>
                    <input {...register("bankAccountNumber", { required: true})} />
                    {/* <input {...register("bankAccountNumber", { required: true, minLength: 9, maxLength: 18 })} /> */}
                    {errors.bankAccountNumber && <span className="error">Please enter a valid account number</span>}
                  </div>
                </div>
              </section>
            </div>

            <div className="second">
                <section className="form-section">
                  <h2>Damage Details</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Animal List*</label>
                      <input {...register("animalList", { required: true })} />
                      {errors.animalList && <span className="error">This field is required</span>}
                    </div>
                    <div className="form-group">
                      <label>Damage Date*</label>
                      <input type="date" {...register("damageDate", { required: true })} />
                      {errors.damageDate && <span className="error">This field is required</span>}
                    </div>
                    <div className="form-group">
                      <label>Crop Type</label>
                      <input {...register("cropType")} />
                    </div>
                    <div className="form-group">
                      <label>Cereal Crop</label>
                      <input {...register("cerealCrop")} />
                    </div>
                    <div className="form-group">
                      <label>Crop Damage Area</label>
                      <input {...register("cropDamageArea")} />
                    </div>
                  </div>
                </section>

                <section className="form-section">
                    <h2>Document Information</h2>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>PAN Number*</label>
                        {/* <input {...register("pan", { required: true, pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ })} /> */}
                        <input {...register("pan", { required: true})} />
                        {errors.pan && <span className="error">Please enter a valid PAN number</span>}
                      </div>
                      <div className="form-group">
                        <label>Aadhar Number*</label>
                        {/* <input {...register("adhar", { required: true, pattern: /^\d{12}$/ })} /> */}
                        <input {...register("adhar", { required: true})} />
                        {errors.adhar && <span className="error">Please enter a valid 12-digit Aadhar number</span>}
                      </div>
                      <div className="form-group">
                        <label>Document URL</label>
                        <input {...register("documentURL")} />
                      </div>
                    </div>
                </section>
            </div>

            <div className="third">
                <section className="form-section">
                  <h2>Housing & Injury Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Full Houses Damaged</label>
                      <input type="number" {...register("fullHousesDamaged")} />
                    </div>
                    <div className="form-group">
                      <label>Partial Houses Damaged</label>
                      <input type="number" {...register("partialHousesDamaged")} />
                    </div>
                    <div className="form-group">
                      <label>Number of Cattle Injured</label>
                      <input type="number" {...register("cattleInjuryNumber")} />
                    </div>
                    <div className="form-group">
                      <label>Estimated Age of Injured Cattle</label>
                      <input {...register("cattleInjuryEstimatedAge")} />
                    </div>
                    <div className="form-group">
                      <label>Human Death Victim Names</label>
                      <textarea {...register("humanDeathVictimNames")} />
                    </div>
                    <div className="form-group">
                      <label>Number of Human Deaths</label>
                      <input type="number" {...register("humanDeathNumber")} />
                    </div>
                    <div className="form-group">
                      <label>Temporary Injury Details</label>
                      <textarea {...register("temporaryInjuryDetails")} />
                    </div>
                    <div className="form-group">
                      <label>Permanent Injury Details</label>
                      <textarea {...register("permanentInjuryDetails")} />
                    </div>
                  </div>
                </section>
            </div>

            <button type="submit" className="submit-button">Submit Report</button>
        </form>
      </div>
    </div>
  );
}