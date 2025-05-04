import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/App.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("uniqueId",credentials.password)
    window.sessionStorage.setItem("email", credentials.email);
    const response = await fetch("http://localhost:8080/reg/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/otplog");
    } else {
      alert("Please try to login with correct credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-indigo-300 ing">
        <div className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl con">
          <div className="flex flex-col items-center">
            <img
              src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
              alt="Avatar"
              className="h-40 w-30 rounded-full "
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send OTP
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Not a member?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Create your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
