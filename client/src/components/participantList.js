
import React, { useEffect, useState, useCallback } from "react";
import "../styles/participantList.css";

export default function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const title = localStorage.getItem("title1");

  const fetchEvents = useCallback(() => {
    fetch(
      `https://eventure-nozw.onrender.com/getparticipant/${title}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setParticipants(data);
        } else {
          setParticipants([]);
          console.warn("Unexpected data format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setParticipants([]);
      });
  }, [title]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const getInitials = (name) =>
    (name || "")
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="ev-roster">
      <div className="ev-roster__shell">
        <header className="ev-roster__header">
          <div className="ev-roster__head">
            <span className="ev-roster__eyebrow">
              <span className="ev-roster__eyebrow-dot" />
              Event roster
            </span>

            <h2 className="ev-roster__title">
              Participants for: <span>{title}</span>
            </h2>

            <p className="ev-roster__sub">
              Everyone who secured a spot at your event, in order of arrival.
            </p>
          </div>

          <span className="ev-roster__count">
            <span className="ev-roster__count-value">
              {participants.length}
            </span>
            <span className="ev-roster__count-label">
              Enrolled
            </span>
          </span>
        </header>

        <div className="ev-roster__table-card">
          <table className="ev-roster__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>

            <tbody>
              {participants.length === 0 ? (
                <tr className="ev-roster__empty-row">
                  <td colSpan="4">
                    <span className="ev-roster__empty-title">
                      No participants found.
                    </span>
                    Once people enroll, they will appear here.
                  </td>
                </tr>
              ) : (
                participants.map((participant, index) => (
                  <tr key={index} className="ev-roster__row">
                    <td className="ev-roster__cell--index">
                      {String(index + 1).padStart(2, "0")}
                    </td>

                    <td className="ev-roster__cell--person">
                      <span className="ev-roster__avatar">
                        {getInitials(participant.name)}
                      </span>

                      <span className="ev-roster__name">
                        {participant.name}
                      </span>
                    </td>

                    <td className="ev-roster__cell--email">
                      {participant.email}
                    </td>

                    <td className="ev-roster__cell--phone">
                      {participant.phoneNumber}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
