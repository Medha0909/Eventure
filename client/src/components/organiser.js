import * as React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "../styles/organiser.css";
import NumericInput from "react-numeric-input";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useState, useMemo } from "react";
import {useNavigate} from 'react-router-dom'
export default function Organiser() {
  const options = [
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "seminar", label: "Seminar" },
  ];

  const [name, setName] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [eventType, setEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [regFees, setRegFees] = useState();
  const [numPeople, setNumPeople] = useState();
  const [duration, setDuration] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [country1, setCountry1] = useState("");
  const [country, setCountry] = useState("");
  const options1 = useMemo(() => countryList().getData(), []);
  const changeHandler1 = (country) => {
    setCountry(country);
    setCountry1(country.label);
  
  };
  const changeHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    setEventType(selectedOption.value);
  };
  localStorage.setItem("uniqueId",uniqueID)
  let navigate=useNavigate();
  

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = (value) =>
      value === null ||
      value === undefined ||
      value === "" ||
      Number.isNaN(value);
    const isBlank = (value) =>
      value === null ||
      value === undefined ||
      String(value).trim() === "";

    const missing = [];
    if (isBlank(name)) missing.push("Name");
    if (isBlank(email)) missing.push("Email");
    if (isBlank(uniqueID)) missing.push("Unique ID");
    if (!selectedOption) missing.push("Event type");
    if (!country) missing.push("Country");
    if (isBlank(city)) missing.push("City");
    if (isBlank(place)) missing.push("Place");
    if (isBlank(eventTitle)) missing.push("Event title");
    if (isEmpty(regFees)) missing.push("Registration fees");
    if (!duration || !duration[0] || !duration[1]) missing.push("Event duration");
    if (isEmpty(numPeople)) missing.push("Number of people");

    if (missing.length > 0) {
      alert(
        "Please fill in all the details before submitting.\nMissing: " +
          missing.join(", ")
      );
      return;
    }
  

    try {
      const response = await fetch(
        "https://eventure-nozw.onrender.com/eventroute/eventroute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            uniqueID,
            eventType,
            country1,
            place,
            city,
            eventTitle,
            regFees,
            startDate,
            endDate,
            numPeople,
          }),
        }
      );

      //const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }
      
      else {
        const text = await response.text();
        console.log("Non-JSON response:", text);
        alert("Event scheduled successfully.");
        navigate("/organiserSpecific");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      alert("An error occurred while submitting the event.");
    }
  };

  return (
    <div className="ev-create">
      <div className="ev-create__shell">
        <div className="ev-create__layout">
          <aside className="ev-create__aside">
            <span className="ev-create__aside-eyebrow">
              <span className="ev-create__aside-eyebrow-dot" />
              Host with us
            </span>
            <h2 className="ev-create__aside-title">
              Create your <span>event</span>
            </h2>
            <p className="ev-create__aside-text">
              Fill in the details and publish your event for thousands of
              eager participants to discover and join.
            </p>
            <div className="ev-create__steps">
              <div className="ev-create__step">
                <span className="ev-create__step-num">01</span>
                <span className="ev-create__step-label">Organiser details</span>
              </div>
              <div className="ev-create__step">
                <span className="ev-create__step-num">02</span>
                <span className="ev-create__step-label">Event & tickets</span>
              </div>
              <div className="ev-create__step">
                <span className="ev-create__step-num">03</span>
                <span className="ev-create__step-label">Location</span>
              </div>
              <div className="ev-create__step">
                <span className="ev-create__step-num">04</span>
                <span className="ev-create__step-label">Schedule</span>
              </div>
            </div>
          </aside>

          <div className="ev-create__card">
            <form onSubmit={handleSubmit} className="ev-create__form">
              <section className="ev-create__section">
                <div className="ev-create__section-head">
                  <span className="ev-create__section-num">01</span>
                  <h3 className="ev-create__section-title">Organiser details</h3>
                </div>
                <div className="ev-create__fields">
                  <div className="ev-create__field">
                    <label className="ev-create__label">Enter your name <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>

                  <div className="ev-create__field">
                    <label className="ev-create__label">Enter your Email <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="ev-create__field ev-create__field--wide">
                    <label className="ev-create__label">Create your uniqueID <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="password"
                      onChange={(e) => setUniqueID(e.target.value)}
                      value={uniqueID}
                    />
                    <p className="ev-create__note">
                      Note: Your password is your uniqueID
                    </p>
                  </div>
                </div>
              </section>

              <section className="ev-create__section">
                <div className="ev-create__section-head">
                  <span className="ev-create__section-num">02</span>
                  <h3 className="ev-create__section-title">Event & tickets</h3>
                </div>
                <div className="ev-create__fields">
                  <div className="ev-create__field">
                    <label className="ev-create__label">Event type <span className="ev-create__req">*</span></label>
                    <Select
                      className="opt"
                      options={options}
                      value={selectedOption}
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="ev-create__field">
                    <label className="ev-create__label">Registration fees (if any) <span className="ev-create__req">*</span></label>
                    <NumericInput
                      onChange={(value) => setRegFees(value)}
                      value={regFees}
                    />
                  </div>

                  <div className="ev-create__field ev-create__field--wide">
                    <label className="ev-create__label">Event title <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="text"
                      onChange={(e) => setEventTitle(e.target.value)}
                      value={eventTitle}
                    />
                  </div>
                </div>
              </section>

              <section className="ev-create__section">
                <div className="ev-create__section-head">
                  <span className="ev-create__section-num">03</span>
                  <h3 className="ev-create__section-title">Location</h3>
                </div>
                <div className="ev-create__fields">
                  <div className="ev-create__field">
                    <label className="ev-create__label">Country <span className="ev-create__req">*</span></label>
                    <Select
                      className="opt"
                      options={options1}
                      value={country}
                      onChange={changeHandler1}
                    />
                  </div>

                  <div className="ev-create__field">
                    <label className="ev-create__label">City <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="text"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  </div>

                  <div className="ev-create__field ev-create__field--wide">
                    <label className="ev-create__label">Place <span className="ev-create__req">*</span></label>
                    <input
                      className="ev-create__input"
                      type="text"
                      onChange={(e) => setPlace(e.target.value)}
                      value={place}
                    />
                  </div>
                </div>
              </section>

              <section className="ev-create__section">
                <div className="ev-create__section-head">
                  <span className="ev-create__section-num">04</span>
                  <h3 className="ev-create__section-title">Schedule</h3>
                </div>
                <div className="ev-create__fields">
                  <div className="ev-create__field ev-create__field--wide">
                    <label className="ev-create__label">
                      Event duration (select start and end dates) <span className="ev-create__req">*</span>
                    </label>
                    <DateRangePicker
                      className="ev-create__daterange"
                      showWeekNumbers
                      value={duration}
                      onChange={(value) => {
                        setDuration(value);
                        if (value && value[0] && value[1]) {
                          setStartDate(formatDate(value[0]));
                          setEndDate(formatDate(value[1]));
                        }
                      }}
                    />
                  </div>

                  <div className="ev-create__field">
                    <label className="ev-create__label">Number of people <span className="ev-create__req">*</span></label>
                    <NumericInput
                      onChange={(value) => setNumPeople(value)}
                      value={numPeople}
                    />
                  </div>
                </div>
              </section>

              <input type="submit" value="Submit" className="ev-create__submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
