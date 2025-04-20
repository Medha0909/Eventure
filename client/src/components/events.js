import React, { useEffect, useState } from "react";

export default function Events() {
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-600 to-yellow-500 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-600 to-yellow-500 p-6 text-white text-center text-2xl font-bold">
          Live Events
        </div>
        <div className="divide-y-[30px] divide-gray-200 " >
          {events.map((event) => (
            <div
              // key={event._id || index}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-100 text-black rounded-xl mt-[30px] "
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold">pooh</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl">
                    {event.eventTitle}
                  </div>
                  <hr />
                  <div className="text-sm capitalize">{event.eventType}</div>
                  <div className="text-sm">{event.name}</div>
                  <div className="text-sm">{event.email}</div>
                  <div className="text-sm">
                    Duration: {event.startDate} - {event.endDate}
                  </div>
                  <div className="text-sm">
                    Participation Fees: ₹{event.regFees}
                  </div>
                  <div className="text-sm">
                    Location:{event.place}, {event.city}, {event.country1}
                  </div>
                </div>
              </div>
              <button className="mt-4 sm:mt-0 px-4 py-2 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700 transition">
                Enroll Now...
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
