import React, { useState, useMemo } from "react";
import NumericInput from "react-numeric-input";
import countryList from "react-select-country-list";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Wallet, PartyPopper } from "lucide-react";

export default function Forseeker() {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [expenses, setExpenses] = useState(0);
  const [attendees, setAttendees] = useState(0);
  const [eventType, setEventType] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { attendees, expenses, eventType };

    try {
      const res = await fetch("https://720d-34-27-139-56.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center px-4 py-10 bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72] transition-all duration-500 fv">
      <motion.h1
        className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        “Predict the future of your event — before it even begins!”
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 border border-white/30 backdrop-blur-xl p-10 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-blue-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Event Type */}
        <div>
          <label className="text-white font-medium mb-2 block flex items-center gap-2">
            <PartyPopper size={20} /> Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-black placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300"
            required
          >
            <option value="" disabled>-- Choose an option --</option>
            <option value="Cultural">Cultural</option>
            <option value="Seminar">Seminar</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Event Expenses */}
        <div>
          <label className="text-white font-medium mb-2 block flex items-center gap-2">
            <Wallet size={20} /> Event Expenses
          </label>
          <NumericInput
            className="w-full"
            value={expenses}
            onChange={(val) => setExpenses(val)}
            style={{
              wrap: {
                width: "100%",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                padding: "0.75rem 1rem",
                backdropFilter: "blur(10px)",
              },
              input: {
                background: "transparent",
                border: "none",
                color: "white",
                width: "100%",
                outline: "none",
              },
              btnUp: { background: "rgba(255,255,255,0.1)", color: "white" },
              btnDown: { background: "rgba(255,255,255,0.1)", color: "white" },
            }}
          />
        </div>

        {/* Number of Attendees */}
        <div>
          <label className="text-white font-medium mb-2 block flex items-center gap-2">
            <Users size={20} /> Number of Attendees
          </label>
          <NumericInput
            className="w-full"
            value={attendees}
            onChange={(val) => setAttendees(val)}
            style={{
              wrap: {
                width: "100%",
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                padding: "0.75rem 1rem",
                backdropFilter: "blur(10px)",
              },
              input: {
                background: "transparent",
                border: "none",
                color: "white",
                width: "100%",
                outline: "none",
              },
              btnUp: { background: "rgba(255,255,255,0.1)", color: "white" },
              btnDown: { background: "rgba(255,255,255,0.1)", color: "white" },
            }}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-full transition-all duration-300 shadow-lg"
        >
          🚀 Predict
        </motion.button>
      </motion.form>

      {/* Prediction Popup */}
      <AnimatePresence>
        {response && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResponse(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sparkles className="mx-auto text-green-500 mb-2 animate-pulse" size={36} />
              <h2 className="text-2xl font-bold text-green-600 mb-1">
                🎯 Prediction Result
              </h2>
              <p className="text-xl font-semibold text-purple-600">
                Success Rate: {response.success_probability}%
              </p>
              <p className="text-gray-700 mt-3">{response.prediction}</p>
              <button
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300"
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
