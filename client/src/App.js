import "./styles/home.css";
import React from "react";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Organiser from "./components/organiser";
import Participant from "./components/participant";
import Navbar from "./components/Navbar";
import Otplog from "./components/otplog";
import Otp from "./components/otp";
import Events from "./components/events";
import OrganiserSpecific from "./components/organiserSpecific";
import ParticipantList from "./components/participantList";
import Hello from "./components/hello";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Forseeker from "./components/forseeker";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="organiser" element={<Organiser />} />
        <Route path="participant" element={<Participant />} />
        <Route path="otplog" element={<Otplog />} />
        <Route path="otp" element={<Otp />} />
        <Route path="forseeker" element={<Forseeker />} />
        <Route path="events" element={<Events />} />
        <Route path="organiserSpecific" element={<OrganiserSpecific />} />
        <Route path="participantList" element={<ParticipantList />} />
        <Route path="hello" element={<Hello />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
