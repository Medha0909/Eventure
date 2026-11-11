
import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { useNavigate } from "react-router-dom";
import "../styles/otplogin.css";
import { ShieldCheck } from "lucide-react";

export default function OTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const customInput = ({ events, props }) => (
    <input
      {...events}
      {...props}
      type="text"
      placeholder="•"
      className="custom-otp-input"
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = window.sessionStorage.getItem("email");

      const response = await fetch(
        "https://eventure-nozw.onrender.com/otproutes/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const json = await response.json();

      console.log({ json });

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/organiserSpecific");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="ev-otp">
      <span className="ev-otp__glow ev-otp__glow--a" aria-hidden="true" />
      <span className="ev-otp__glow ev-otp__glow--b" aria-hidden="true" />
      <span className="ev-otp__ring" aria-hidden="true" />

      <div className="ev-otp__card">
        <div className="ev-otp__emblem">
          <ShieldCheck size={30} />
        </div>

        <h2 className="ev-otp__title">
          Enter One Time Password
        </h2>

        <form
          className="ev-otp__form"
          method="POST"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="ev-otp__fields">
            <InputOtp
              value={otp}
              onChange={(e) => setOtp(e.value)}
              integerOnly
              inputTemplate={customInput}
            />
          </div>

          <button type="submit" className="ev-otp__btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
