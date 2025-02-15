import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";

function App() {
  const [empid, setEmpId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const selectElement = e.target.role;
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    const send_data = {
      emp_id: empid.trim(),
      mobile_number: mobileNumber.trim(),
    };

    try {
      const response = await fetch(
        "https://web-production-5485.up.railway.app/verify_guard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(send_data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.message === "Verified") {
          localStorage.setItem('mobileNumber', mobileNumber);
          setColor("#228B22");
          setMessage("Login successful!");

          fetch(`https://web-production-5485.up.railway.app/guards/${mobileNumber}`) // Replace with actual API URL
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              data.level = selectedOption.getAttribute("data-level");
              localStorage.setItem("employeeData", JSON.stringify(data));
            })
            .catch((error) => {
              setError(error.message);
            });

          setTimeout(() => {
            navigate("/List");
          }, 1000);
        } else {
          setMessage("Login failed. Invalid Guard ID or Mobile Number.");
        }
      } else {
        setMessage("Login failed. Server error.");
      }
    } catch (error) {
      setColor("#B22222");
      setMessage("Login failed. Network error.");
    }
  };

  const handleSendOtp = () => {
    setMessage("OTP sent to the provided mobile number.");
  };

  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirst(false);
    }, 1000);
  }, []);

  if(showFirst){
    return(
      <div className="container">
        <div className="loader-container">
          <div className="loading-logo"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <img className="logo" src="/logo.png" alt="Logo" />
        <h1>Account Login</h1>
        <form className="input" onSubmit={handleLogin}>
          <div className="fill">

            <div className="role">
              <label htmlFor="drop_down">Select you Role:</label>
              <select id="drop_down" className="dropdown" name="role" required>
                <option data-level="6" value="" hidden>Select your Role</option>
                <option data-level="5" value="pccf">P.C.C.F</option>
                <option data-level="4" value="dfo">D.F.O</option>
                <option data-level="3" value="sdo">S.D.O</option>
                <option data-level="2" value="ranger">Ranger</option>
                <option data-level="1" value="deputyranger">Deputy Ranger</option>
                <option data-level="0" value="forestguard">Forest Guard</option>
              </select>
            </div>

            <div className="guard-id">
              <label htmlFor="empid">Employee ID:</label>
              <input
                type="text"
                id="empid"
                name="empid"
                value={empid}
                onChange={(e) => setEmpId(e.target.value)}
                required
              />
            </div>
            <div className="mobile-number">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="button">
            Login
          </button>
          <button type="button" className="button" onClick={handleSendOtp}>
            Send OTP
          </button>
          <p className="resend">
            <a href="#" onClick={handleSendOtp}>
              Resend OTP
            </a>
          </p>
        </form>
        {message && <p className="message" style={{ color }}>{message}</p>}
      </div>
    </>
  );
}

export default App;