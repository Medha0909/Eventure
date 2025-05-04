import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import "../styles/events.css";

export default function ParticipantList() {
  const [participants, setParticipants] = useState([]);
  const title = localStorage.getItem("title1");
  useEffect(() => {
    fetchEvents();
  }, []);

  function fetchEvents() {
    fetch(`http://localhost:8080/getparticipant/${title}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
  }

  return (
 
      <div className="container">
      <h2>          {title}
      </h2>            
      <table className="table">
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email</th>
            <th>Phonenumber</th>
          </tr>
        </thead>
        <tbody>
        {participants.map((participant) => (

          <tr>
            <td data-label="full-name">    {participant.name}</td>
            <td data-label="email">              {participant.email}
            </td>
            <td data-label="Phonenumber">              {participant.phoneNumber}
            </td>
          </tr>
                   ))}

        </tbody>
      </table>
    </div>
  );
}
