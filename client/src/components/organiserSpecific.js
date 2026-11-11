import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaChevronDown, FaUser } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import "../styles/organiserSpecific.css";

export default function OrganiserSpecific() {
  const [expandedEventIds, setExpandedEventIds] = useState([]);
  const [events, setEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  function fetchEvents() {
    const uid = localStorage.getItem("uniqueId");
    fetch(`https://eventure-nozw.onrender.com/eventroute/getevent/${uid}`)
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

  function deleteEvent(id) {
    fetch(`https://eventure-nozw.onrender.com/eventroute/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Event deleted successfully");
        fetchEvents();
      })
      .catch((err) => {
        console.error("Error occurred while deleting an event", err);
      });
  }

  function updateEvent(id) {
    fetch(`https://eventure-nozw.onrender.com/eventroute/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedEvent),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Event updated successfully");
        fetchEvents();
        setIsEditModalOpen(false);
      })
      .catch((err) => {
        console.error("Error updating event:", err);
      });
  }

  function toggleMoreInfo(index) {
    if (expandedEventIds.includes(index)) {
      setExpandedEventIds(expandedEventIds.filter((id) => id !== index));
    } else {
      setExpandedEventIds([...expandedEventIds, index]);
    }
  }

  return (
    <div className="ev-org">
      <div className="ev-org__shell">
        <header className="ev-org__top">
          <div className="ev-org__head">
            <span className="ev-org__eyebrow">
              <span className="ev-org__eyebrow-dot" />
              Manage events
            </span>
            <h1 className="ev-org__title">
              Your <span>Events</span>
            </h1>
            <p className="ev-org__text">
              Create, edit and track every event you organise — all in one
              place.
            </p>
          </div>

          <button className="ev-org__new-btn" onClick={() => navigate("/organiser")}>
            <HiMiniPencilSquare />
            Organise
          </button>
        </header>

        <div className="ev-org__grid">
          {events.length === 0 && (
            <div className="ev-org__empty">
              <h2>No events yet</h2>
              <p>Hit Organise to create your first one.</p>
            </div>
          )}

          {events.map((event, index) => (
            <article className="ev-org__card" key={index}>
              <div className="ev-org__card-header">
                <span className="ev-org__chip">{event.eventType}</span>
                <div className="ev-org__actions">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsEditModalOpen(true);
                    }}
                    className="ev-org__icon-btn ev-org__icon-btn--edit"
                    aria-label="Edit event"
                  >
                    <HiMiniPencilSquare />
                  </button>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    className="ev-org__icon-btn ev-org__icon-btn--delete"
                    aria-label="Delete event"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>

              <h2 className="ev-org__card-title">{event.eventTitle}</h2>

              <div className="ev-org__card-body">
                <div className="ev-org__info">
                  <span className="ev-org__info-icon">
                    <FaCalendarAlt />
                  </span>
                  <div className="ev-org__info-text">
                    <span className="ev-org__info-label">Dates</span>
                    <span className="ev-org__info-value">
                      {event.startDate} — {event.endDate}
                    </span>
                  </div>
                </div>

                <div className="ev-org__info">
                  <span className="ev-org__info-icon">
                    <IoLocationSharp />
                  </span>
                  <div className="ev-org__info-text">
                    <span className="ev-org__info-label">Venue</span>
                    <span className="ev-org__info-value">
                      {event.place}, {event.city}, {event.country1}
                    </span>
                  </div>
                </div>

                <div className="ev-org__fee">
                  <span className="ev-org__fee-label">Registration fee</span>
                  <span className="ev-org__fee-value">₹{event.regFees}</span>
                </div>
              </div>

              <button
                className={`ev-org__reveal${
                  expandedEventIds.includes(index) ? " is-open" : ""
                }`}
                onClick={() => toggleMoreInfo(index)}
              >
                <span className="ev-org__reveal-dot" />
                {expandedEventIds.includes(index)
                  ? "Hide organiser"
                  : "Click here to show organiser"}
                <FaChevronDown className="ev-org__reveal-icon" />
              </button>

              <AnimatePresence>
                {expandedEventIds.includes(index) && (
                  <motion.div
                    className="ev-org__organiser"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="ev-org__organiser-label">Organiser</span>
                    <div className="ev-org__info">
                      <span className="ev-org__info-icon">
                        <FaUser />
                      </span>
                      <span className="ev-org__info-value">{event.name}</span>
                    </div>
                    <div className="ev-org__info">
                      <span className="ev-org__info-icon">
                        <HiOutlineMail />
                      </span>
                      <span className="ev-org__info-value">{event.email}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="ev-org__card-footer">
                <button
                  className="ev-org__participants"
                  onClick={() => {
                    localStorage.setItem("title1", event.eventTitle);
                    navigate("/participantList");
                  }}
                >
                  Participants
                  <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedEvent && (
        <div className="ev-org__modal">
          <div className="ev-org__modal-panel">
            <button
              className="ev-org__modal-close"
              onClick={() => setIsEditModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="ev-org__modal-title">Edit Event</h2>
            <form
              className="ev-org__form"
              onSubmit={(e) => {
                e.preventDefault();
                updateEvent(selectedEvent._id);
              }}
            >
              {[
                { label: "Event Title", key: "eventTitle" },
                { label: "Event Type", key: "eventType" },
                { label: "Country", key: "country1" },
                { label: "City", key: "city" },
                { label: "Place", key: "place" },
                { label: "Start Date", key: "startDate", type: "date" },
                { label: "End Date", key: "endDate", type: "date" },
                { label: "Registration Fees", key: "regFees", type: "number" },
                { label: "Number of People", key: "numPeople", type: "number" },
                { label: "Organiser Name", key: "name" },
                { label: "Organiser Email", key: "email", type: "email" },
                { label: "Unique ID", key: "uniqueID" },
              ].map(({ label, key, type = "text" }) => (
                <div className="ev-org__field" key={key}>
                  <label className="ev-org__label">{label}</label>
                  <input
                    className="ev-org__input"
                    type={type}
                    value={selectedEvent[key] || ""}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, [key]: e.target.value })
                    }
                  />
                </div>
              ))}

              <button type="submit" className="ev-org__save">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
