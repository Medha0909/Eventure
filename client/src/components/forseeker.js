import React, { useState } from "react";
import NumericInput from "react-numeric-input";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Wallet, PartyPopper, ArrowRight } from "lucide-react";
import "../styles/forseeker.css";

export default function Forseeker() {
  const [expenses, setExpenses] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [eventType, setEventType] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { attendees, expenses, eventType };

    try {
      const res = await fetch(
        "https://720d-34-27-139-56.ngrok-free.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="ev-foreseeker">
      <span className="ev-foreseeker__glow ev-foreseeker__glow--a" aria-hidden="true" />
      <span className="ev-foreseeker__glow ev-foreseeker__glow--b" aria-hidden="true" />
      <span className="ev-foreseeker__glow ev-foreseeker__glow--c" aria-hidden="true" />

      <motion.div
        className="ev-foreseeker__card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="ev-foreseeker__head">
          <span className="ev-foreseeker__orb">
            <Sparkles size={26} />
          </span>
          <h1 className="ev-foreseeker__title">ForeSeeker</h1>
          <p className="ev-foreseeker__sub">Predict your event's success rate</p>
        </div>

        <form className="ev-foreseeker__form" onSubmit={handleSubmit}>
          <div className="ev-foreseeker__field">
            <label className="ev-foreseeker__label">
              <PartyPopper size={14} />
              Event type
            </label>
            <div className="ev-foreseeker__select-wrap">
              <select
                className="ev-foreseeker__select"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose your event type
                </option>
                <option value="Cultural">Cultural</option>
                <option value="Seminar">Seminar</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>

          <div className="ev-foreseeker__field">
            <label className="ev-foreseeker__label">
              <Wallet size={14} />
              Event expenses (₹)
            </label>
            <div className="ev-foreseeker__input-wrap">
              <NumericInput
                value={expenses}
                onChange={(val) => setExpenses(val)}
                min={0}
              />
            </div>
          </div>

          <div className="ev-foreseeker__field">
            <label className="ev-foreseeker__label">
              <Users size={14} />
              Expected attendees
            </label>
            <div className="ev-foreseeker__input-wrap">
              <NumericInput
                value={attendees}
                onChange={(val) => setAttendees(val)}
                min={0}
              />
            </div>
          </div>

          <button className="ev-foreseeker__submit" type="submit">
            Predict success rate
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {response && (
          <motion.div
            className="ev-foreseeker__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResponse(null)}
          >
            <motion.div
              className="ev-foreseeker__modal-panel"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="ev-foreseeker__modal-title">Prediction result</h3>
              <div
                className="ev-foreseeker__ring"
                style={{ "--ev-rate": Number(response.success_probability) || 0 }}
              >
                <div className="ev-foreseeker__ring-inner">
                  <span className="ev-foreseeker__ring-value">
                    {response.success_probability}
                  </span>
                  <span className="ev-foreseeker__ring-unit">%</span>
                </div>
              </div>
              <p className="ev-foreseeker__modal-text">{response.prediction}</p>
              <button
                className="ev-foreseeker__modal-close"
                onClick={() => setResponse(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
