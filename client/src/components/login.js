import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      localStorage.setItem("uniqueId", credentials.password);
      window.sessionStorage.setItem("email", credentials.email);

      const response = await fetch("https://eventure-nozw.onrender.com/reg/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/otplog");
      } else {
        alert("Please try to login with correct credentials");
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
            src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
            alt="Eventure login avatar"
          />
          <h1 className="ev-auth__title">Welcome back</h1>
          <p className="ev-auth__sub">Sign in to receive your secure OTP</p>
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
            autoComplete="current-password"
            placeholder="Password"
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
          New to Eventure?{" "}
          <Link className="ev-auth__link" to="/register">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
