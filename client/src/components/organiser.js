import * as React from "react";
import { DateRangePicker } from "rsuite";
import "../styles/forseeker.css";
import NumericInput from "react-numeric-input";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Organiser() {
  const options = [
    { value: "sports", label: "Sports" },
    { value: "cultural", label: "Cultural" },
    { value: "seminar", label: "Seminar" },
  ];

  const [name, setName] = useState("");
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

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/eventroute/eventroute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
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
      //if (contentType && contentType.includes("application/json")) {
      //  const json = await response.json();
      //console.log("Success:", json);
      //alert("Event scheduled successfully!");
      //}
      else {
        const text = await response.text();
        console.log("Non-JSON response:", text);
        alert("Event scheduled successfully.");
      }
    } catch (error) {
      console.error("Error occurred:", error.message);
      alert("An error occurred while submitting the event.");
    }
  };

  return (
    <div className="l-form">
      <div className="shape1" />
      <div className="shape2" />
      <div className="form">
        <img
          src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-733.gif"
          alt="image"
          className="form-img"
        />
        <form onSubmit={handleSubmit} className="form-content">
          <h1 className="form-title">
            <span>Welcome !!!</span>
          </h1>

          <div className="form-div form-div-one">
            <div className="form-icon">
              <i className="bx bxs-user-circle" />
            </div>
          </div>

          <div className="input-group">
            <label>Enter your name</label>
            <Box component="div" sx={{ "& > :not(style)": { width: "41ch" } }}>
              <TextField
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Box>
          </div>

          <div className="input-group">
            <label>Enter your Email</label>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  width: {
                    xs: "27ch", // full width on extra-small screens (mobile)
                    sm: "41ch", // fixed width on small screens and up
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Box>
          </div>

          <div className="input-group">
            <label>Event type</label>
            <Select
              className="opt"
              options={options}
              value={selectedOption}
              onChange={changeHandler}
            />
          </div>
          <div className="input-group">
            <label>Country</label>
            <Select
              className="opt"
              options={options1}
              value={country}
              onChange={changeHandler1}
            />
          </div>
          {/* {country?.label} */}
          <div className="input-group">
            <label>City</label>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  width: {
                    xs: "90ch", // full width on extra-small screens (mobile)
                    sm: "41ch", // fixed width on small screens and up
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </Box>
          </div>
          {city}
          <div className="input-group">
            <label>Place</label>
            <Box
              component="form"
              sx={{ "& > :not(style)": { width: "41ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                onChange={(e) => setPlace(e.target.value)}
                value={place}
              />
            </Box>
          </div>
          {place}

          <div className="input-group">
            <label>Event title</label>
            <Box component="div" sx={{ "& > :not(style)": { width: "41ch" } }}>
              <TextField
                id="outlined-basic"
                onChange={(e) => setEventTitle(e.target.value)}
                value={eventTitle}
              />
            </Box>
          </div>

          <div className="input-group">
            <label htmlFor="Event-budget">Registration Fees (If any)</label>
            <NumericInput
              size={90}
              onChange={(value) => setRegFees(value)}
              value={regFees}
            />
          </div>

          <div className="input-group">
            <label>Event Duration (Select Start and End Dates)</label>
            <DateRangePicker
              className="w-[370px] border-[10]"
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
            {/* {startDate && endDate && (
              <p>
                Duration: {startDate} to {endDate}
              </p>
            )} */}
          </div>

          <div className="input-group">
            <label>Number Of People</label>
            <NumericInput
              size={90}
              onChange={(value) => setNumPeople(value)}
              value={numPeople}
            />
          </div>

          <input type="submit" value="Submit" className="form-button" />

          <div className="form-social">
            <a href="#" className="form-social-icon">
              <i className="bx bxl-facebook" />
            </a>
            <a href="#" className="form-social-icon">
              <i className="bx bxl-google" />
            </a>
            <a href="#" className="form-social-icon">
              <i className="bx bxl-instagram" />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
