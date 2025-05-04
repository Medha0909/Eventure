import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import "../styles/events.css";
export default function OrganiserSpecific() {
  const [expandedEventIds, setExpandedEventIds] = useState([]);
  let navigate = useNavigate();

  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  function fetchEvents() {
    const uid = localStorage.getItem("uniqueId");

    fetch(`http://localhost:8080/eventroute/getevent/${uid}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Events
        </h1>
        <button
          type="submit"
          onClick={() => navigate("/organiser")}
          className="mt-4 ml-[1200px] sm:mt-0 px-4 py-2 text-sm text-white font-semibold rounded  tst"
        >
          organise
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Event Image
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-400">No Image</span>
              </div> */}

              {/* Event Content */}
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
                      <IoLocationSharp className=" ml-[-4px] mr-2 h-[30px] w-[20px] text-red-500" />
                      {event.place}, {event.city}, {event.country1}
                    </div>
                    <div className="font-bold">Fee: ₹{event.regFees}</div>
                  </div>

                  {/* More Info */}
                  {expandedEventIds.includes(index) && (
                    <div className="mt-4 text-gray-700 text-sm">
                      <div className="font-bold">{event.name}</div>
                      <div className="font-bold">{event.email}</div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
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
                    type="submit"
                    onClick={() => {  localStorage.setItem("title1",event.eventTitle) 
                      navigate("/participantList")}}
                    className="mt-4 sm:mt-0 px-4 py-2 text-sm text-white font-semibold rounded  tst"
                  >
                    Participants...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
