import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "../styles/auth.css";

const imga = `${process.env.PUBLIC_URL}/images/output-onlinegiftools (3).gif`;

export default function Register() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      localStorage.setItem("uniqueId", credentials.password);
      window.sessionStorage.setItem("email", credentials.email);
      const { email, password } = credentials;

      const response = await fetch(
        "https://eventure-nozw.onrender.com/reg/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/otp");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="ev-auth">
      <span className="ev-auth__glow ev-auth__glow--a" aria-hidden="true" />
      <span className="ev-auth__glow ev-auth__glow--b" aria-hidden="true" />
      <span className="ev-auth__glow ev-auth__glow--c" aria-hidden="true" />

      <motion.div
        className="ev-auth__card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="ev-auth__head">
          <img
            className="ev-auth__avatar"
            src={imga}
            alt="Eventure registration avatar"
          />
          <h1 className="ev-auth__title">Create your account</h1>
          <p className="ev-auth__sub">Sign up to receive your secure OTP</p>
        </div>

        <form className="ev-auth__form" onSubmit={handleSubmit}>
          <input
            className="ev-auth__input"
            id="email"
            name="email"
            type="email"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Email address"
            required
            onChange={onChange}
          />

          <input
            className="ev-auth__input"
            id="password"
            name="password"
            type="password"
            aria-label="Password"
            autoComplete="new-password"
            placeholder="Create a password"
            required
            onChange={onChange}
          />

          <button
            className="ev-auth__btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
            <FaArrowRight />
          </button>
        </form>

        <p className="ev-auth__footer">
          Already have an account?{" "}
          <Link className="ev-auth__link" to="/login">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
