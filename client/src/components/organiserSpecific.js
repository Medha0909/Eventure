import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import "../styles/events.css";

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
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Events
        </h1>
        <button
          onClick={() => navigate("/organiser")}
          className="mt-4 ml-[1200px] sm:mt-0 px-4 py-2 text-sm text-white font-semibold rounded tst"
        >
          Organise
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-end items-center mt-4 px-3 py-1 text-xl rounded">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsEditModalOpen(true);
                  }}
                  className="tst2"
                >
                  <HiMiniPencilSquare />
                </button>
                <button onClick={() => deleteEvent(event._id)} className="tst1">
                  <RiDeleteBinLine />
                </button>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {event.eventTitle}
                  </h2>
                  <p className="text-sm font-semibold text-indigo-600 uppercase">
                    {event.eventType}
                  </p>
                  <div className="mt-4 space-y-2 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-indigo-500" />
                      {event.startDate} - {event.endDate}
                    </div>
                    <div className="flex items-center">
                      <IoLocationSharp className="ml-[-4px] mr-2 h-[30px] w-[20px] text-red-500" />
                      {event.place}, {event.city}, {event.country1}
                    </div>
                    <div className="font-bold">Fee: ₹{event.regFees}</div>
                  </div>

                  {expandedEventIds.includes(index) && (
                    <div className="mt-4 text-gray-700 text-sm">
                      <div className="font-bold">{event.name}</div>
                      <div className="font-bold">{event.email}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={() => toggleMoreInfo(index)}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl transition-colors duration-300"
                  >
                    {expandedEventIds.includes(index)
                      ? "Less"
                      : "Organiser Info..."}
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem("title1", event.eventTitle);
                      navigate("/participantList");
                    }}
                    className="px-4 py-2 text-sm text-white font-semibold rounded tst"
                  >
                    Participants...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-gray-700 text-2xl tst4"
              onClick={() => setIsEditModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
            <form
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
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={selectedEvent[key] || ""}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, [key]: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
