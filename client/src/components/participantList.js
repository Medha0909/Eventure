import React, { useEffect, useState } from "react";

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
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
        Participants for: <span className="text-indigo-600">{title}</span>
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone Number</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {participants.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No participants found.
                </td>
              </tr>
            ) : (
              participants.map((participant, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{participant.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{participant.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{participant.phoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
