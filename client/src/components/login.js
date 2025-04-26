import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import "../styles/App.css";
import Otp from "./otplog.js"
import {
  Link
} from "react-router-dom";


function Login() {
    let navigate=useNavigate();
  
  const [modal, setModal] = useState(false);
   const toggleModal = () => {
     setModal(!modal);
   };
   const onSubmit = () => {
     toggleModal();
   };
 
  const [credentials,setCredentials]=useState({email:"",password:""})
      const handleSubmit=async (e)=>{
      e.preventDefault();
      window.sessionStorage.setItem("email",credentials.email);
      const response = await fetch("http://localhost:8080/reg/login",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email:credentials.email, password:credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        //save the authh token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/otplog");
      }
      else{
        alert("Please try to login with correct credentials");
      }
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
    }

  
  return (
    <>
      <div className="h-[700px] flex-1 flex-col justify-center px-5 py-12 lg:px-8 mt-[65px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="imgcontainer">
    <span
      className="close"
      title="Close Modal"
    >
      <img src="https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif" alt="IMAGE" className="avatar" />
   
    </span>
  </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                   onChange={onChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={onChange}
                />
              </div>
            </div>

            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Send OTP
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create your account.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}


export default Login;