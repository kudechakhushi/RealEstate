import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// props.closeform = function that closes the popup (comes from App.js)
function Contactmodal(props) {
  const [step, setStep] = useState(1); // 1, 2 or 3
  const [formData, setFormData] = useState({ name: "", email: "", phone: "91" }); // 91 = India
  const [errors, setErrors] = useState({});

  // runs every time the user types in name or email
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when the phone number changes (value = digits with country code)
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  // Step 1 -> Step 2 (the button is disabled until the name has 4 characters)
  const handleNext = () => {
    setErrors({});
    setStep(2);
  };

  // Step 2 -> Step 3
  const handleSubmit = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,12}$/;

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email, e.g. name@gmail.com";
    }
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 to 12 digits, including country code.";
    }

    setErrors(newErrors);

    // no errors? go to the thank you screen
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setStep(3);
    }
  };

  // Back button: go to step 1, data stays in formData
  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={props.closeform}>
          X
        </button>

        {/* heading is shown in step 1 and step 2 */}
        {step !== 3 && (
          <div>
            <p className="modal-small">CONTACT US</p>
            <h2 className="modal-title">Get In Touch With Us</h2>
            <p className="modal-text">
              Get free consultation with a professional real estate consultant.
            </p>
          </div>
        )}

        {/* STEP 1: name */}
        {step === 1 && (
          <div className="modal-form">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            <button
              className="modal-btn"
              onClick={handleNext}
              disabled={formData.name.trim().length < 4}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2: email and phone */}
        {step === 2 && (
          <div className="modal-form">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email id"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label>Phone Number</label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

            <div className="modal-buttons">
              <button className="modal-btn back" onClick={handleBack}>
                Back
              </button>
              <button className="modal-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: thank you */}
        {step === 3 && (
          <div className="modal-thanks">
            <p className="modal-small">THANK YOU FOR CONNECTING!</p>
            <h2 className="modal-title">
              We appreciate your interest and will be in touch soon
            </h2>
            <p className="modal-text">
              In the meantime, feel free to browse our website to learn more
              about our offerings.
            </p>
            <button className="explore-btn" onClick={props.closeform}>
              Explore more &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contactmodal;