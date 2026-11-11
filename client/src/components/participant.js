
import { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../styles/participant.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Participant() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [payment, setPayment] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://eventure-nozw.onrender.com/payment/orders",
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
        alert("Unable to create payment order. Please try again.");
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
      image: "https://papayacoders.com/demo.png",

      handler: function (response) {
        console.log("Payment successful:", response);
        setPayment(true);
        alert("Payment successful!");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (payment === false) {
      alert(
        "Pay registration amount of an event to proceed with a registration"
      );
      return;
    }

    try {
      const response = await fetch(
        "https://eventure-nozw.onrender.com/participant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventTitle,
            name,
            email,
            phoneno,
            payment,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const text = await response.text();

      console.log("Registration response:", text);

      alert("You have successfully registered yourself for an event.");
      navigate("/");
    } catch (error) {
      console.error("Error occurred:", error.message);
      alert("An error occurred while submitting the event.");
    }
  };

  useEffect(() => {
    setEventTitle(localStorage.getItem("title"));
  }, []);

  return (
    <div className="ev-participant">
      <span
        className="ev-participant__glow ev-participant__glow--a"
        aria-hidden="true"
      />
      <span
        className="ev-participant__glow ev-participant__glow--b"
        aria-hidden="true"
      />

      <div className="ev-participant__card">
        <aside className="ev-participant__aside">
          <span className="ev-participant__chip">
            <span className="ev-participant__chip-dot" />
            Participant registration
          </span>

          <figure className="ev-participant__figure">
            <img
              src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-733.gif"
              alt="Event registration animation"
              className="ev-participant__figure-img"
            />
          </figure>

          <h1 className="ev-participant__event">{eventTitle}</h1>
        </aside>

        <section className="ev-participant__main">
          <header className="ev-participant__header">
            <h2 className="ev-participant__heading">
              Register here
            </h2>

            <p className="ev-participant__sub">
              Fill in your details to join this event
            </p>
          </header>

          <form
            className="ev-participant__form"
            onSubmit={handleSubmit}
          >
            <div className="ev-participant__field">
              <span className="ev-participant__index">01</span>

              <div className="ev-participant__field-body">
                <label
                  className="ev-participant__label"
                  htmlFor="participant-name"
                >
                  Name
                </label>

                <input
                  id="participant-name"
                  className="ev-participant__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div className="ev-participant__field">
              <span className="ev-participant__index">02</span>

              <div className="ev-participant__field-body">
                <label
                  className="ev-participant__label"
                  htmlFor="participant-email"
                >
                  Email
                </label>

                <input
                  id="participant-email"
                  className="ev-participant__input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="ev-participant__field">
              <span className="ev-participant__index">03</span>

              <div className="ev-participant__field-body">
                <label
                  className="ev-participant__label"
                  htmlFor="participant-phone"
                >
                  Phone number
                </label>

                <PhoneInput
                  id="participant-phone"
                  className="ev-participant__phone"
                  placeholder="Enter phone number"
                  value={phoneno}
                  onChange={setPhoneno}
                />
              </div>
            </div>

            <div className="ev-participant__actions">
              <button
                type="button"
                className="ev-participant__pay"
                onClick={() => {
                  setPayment(false);
                  createRazorpayOrder(
                    localStorage.getItem("fees")
                  );
                }}
              >
                Pay fee
              </button>

              <input
                type="submit"
                value="Submit"
                className="ev-participant__submit"
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
