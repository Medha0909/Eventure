import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import "../styles/events.css";

export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [expandedEventIds, setExpandedEventIds] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  function fetchEvents() {
    fetch("https://eventure-nozw.onrender.com/eventroute/getapi", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
          console.warn("Unexpected data format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([]);
      });
  }

  function toggleMoreInfo(index) {
    if (expandedEventIds.includes(index)) {
      setExpandedEventIds(expandedEventIds.filter((id) => id !== index));
    } else {
      setExpandedEventIds([...expandedEventIds, index]);
    }
  }

  function handleEnroll(event) {
    localStorage.setItem("title", event.eventTitle);
    localStorage.setItem("fees", event.regFees);
    navigate("/participant");
  }

  return (
    <div className="ev-events">
      <div className="ev-events__shell">
        <motion.header
          className="ev-events__header"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="ev-events__eyebrow">
            <span className="ev-events__eyebrow-dot" />
            Discover events
          </span>
          <h1 className="ev-events__title">
            Find your next
            <span> unforgettable moment</span>
          </h1>
          <p className="ev-events__text">
            Browse curated events from visionary organizers. From conferences
            to cultural showcases, pick your experience and secure your spot in
            seconds.
          </p>
        </motion.header>

        <motion.div
          className="ev-events__grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {events.length === 0 && (
            <div className="ev-events__empty">
              <h2>No events available right now</h2>
              <p>Check back soon for freshly curated experiences.</p>
            </div>
          )}

          {events.map((event, index) => (
            <motion.article
              className="ev-events__card"
              key={index}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="ev-events__card-header">
                <span className="ev-events__chip">{event.eventType}</span>
                <span className="ev-events__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="ev-events__card-title">{event.eventTitle}</h2>

              <div className="ev-events__card-body">
                <div className="ev-events__info">
                  <span className="ev-events__info-icon">
                    <FaCalendarAlt />
                  </span>
                  <div className="ev-events__info-text">
                    <span className="ev-events__info-label">Dates</span>
                    <span className="ev-events__info-value">
                      {event.startDate} — {event.endDate}
                    </span>
                  </div>
                </div>

                <div className="ev-events__info">
                  <span className="ev-events__info-icon">
                    <IoLocationSharp />
                  </span>
                  <div className="ev-events__info-text">
                    <span className="ev-events__info-label">Venue</span>
                    <span className="ev-events__info-value">
                      {event.place}, {event.city}, {event.country1}
                    </span>
                  </div>
                </div>

                <div className="ev-events__fee">
                  <span className="ev-events__fee-label">Registration fee</span>
                  <span className="ev-events__fee-value">₹{event.regFees}</span>
                </div>
              </div>

              <button
                className="ev-events__expand"
                onClick={() => toggleMoreInfo(index)}
              >
                {expandedEventIds.includes(index)
                  ? "Hide organiser details"
                  : "Show organiser details"}
              </button>

              <AnimatePresence>
                {expandedEventIds.includes(index) && (
                  <motion.div
                    className="ev-events__organiser"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="ev-events__organiser-label">Organiser</span>
                    <div className="ev-events__info">
                      <span className="ev-events__info-icon">
                        <FaUser />
                      </span>
                      <span className="ev-events__info-value">{event.name}</span>
                    </div>
                    <div className="ev-events__info">
                      <span className="ev-events__info-icon">
                        <HiOutlineMail />
                      </span>
                      <span className="ev-events__info-value">{event.email}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="ev-events__card-footer">
                <button
                  className="ev-events__enroll"
                  onClick={() => handleEnroll(event)}
                >
                  Enroll now
                  <FaArrowRight />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
