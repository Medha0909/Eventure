import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import '../styles/events.css';


export default function Events() {
  let navigate = useNavigate();

  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  function fetchEvents() {
    fetch("http://localhost:8080/eventroute/getapi", {
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
  async function enroll(eventTitle) {
    await localStorage.setItem("title", eventTitle);
   navigate("/participant");
  }
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-white-600 to-yellow-500">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-6 text-white text-center text-2xl font-bold bu">
          Live Events
        </div>
        <div className="divide-y-[30px] divide-gray-200 ">
          {events.map((event) => (
            <div
              // key={event._id || index}
              className="ft flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 text-black rounded-xl mt-[30px] "
            >
              <div className="flex items-center gap-4 box">
                <div className="text-center">
                  <div className="text-xl font-bold">pooh</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl">
                    {event.eventTitle}
                  </div>
                  <hr />
                  <div className="text-l font-bold  capitalize">{event.eventType}</div>
                  <div className="text-sm font-bold ">{event.name}</div>
                  <div className="text-sm font-bold ">{event.email}</div>
                  <div className="text-sm ck">
                    <FaClock className="clocks"/>{event.startDate} - {event.endDate}
                  </div>
                  <div className="text-sm font-bold ">
                    Participation Fees: ₹{event.regFees}
                  </div>
                  <div className="text-sm ck1 ">
                  <IoLocationSharp className="clocks "/>{event.place}, {event.city}, {event.country1}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={() =>{localStorage.setItem("title", event.eventTitle)
                  localStorage.setItem("fees", event.regFees)
                  navigate("/participant")}}

                className="mt-4 sm:mt-0 px-4 py-2 text-sm text-white font-semibold rounded  tst"
              >
                Enroll Now...
              </button>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
