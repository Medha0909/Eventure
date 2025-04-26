import * as React from "react";
import "../styles/forseeker.css";
import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Participant() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState();
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/payment/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Some error at razorpay screen loading");
      return;
    }

    const options = {
      key: "rzp_test_I1l0QEnsgVqUEv",
      amount: amount,
      currency: "INR",
      name: "Eventure",
      description: "payment to papaya coders",
      img: "https://papayacoders.com/demo.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "S-TELL",
        email: "stellmaghu@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios
      .get(
        `https://e-commerce-server-omav.onrender.com/payment/payment/${paymentId}`
      )
      .then((response) => {
        console.log(response.data);
        setResponseState(response.data);
      })
      .catch((error) => {
        console.log("error occures", error);
      });
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
        <form className="form-content">
          <h1>{localStorage.getItem("title")}</h1>
          <h1 className="form-title">
            <span>Register here !!!</span>
          </h1>

          <div className="form-div form-div-one">
            <div className="form-icon">
              <i className="bx bxs-user-circle" />
            </div>
          </div>

          <div className="input-group">
            <label>Enter your name</label>
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
                    sm: "36ch", // fixed width on small screens and up
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
          <div className="input-group2">
            <label>Enter your phone number</label>

            <PhoneInput
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
              placeholder="Enter phone number"
              value={phoneno}
              onChange={setPhoneno}
            />
          </div>


          <button
            type="button"
            onClick={() => createRazorpayOrder(localStorage.getItem("fees"))}
            style={{ background: "#00493A" }}
            className="form-button"           >
            pay
          </button>
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
      {responseId && <p>{responseId}</p>}
      <form style={{ display: "none" }} onSubmit={paymentFetch}>
        <div>
          <input type="text" name="paymentId" />
          <button type="submit">Fetch Payment</button>
          {responseState.length !== 0 && (
            <ul>
              <li>Amount: {responseState.amount / 100} Rs.</li>
              <li>Currency: {responseState.currency}</li>
              <li>Status: {responseState.status}</li>
              <li>Method: {responseState.method}</li>
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
