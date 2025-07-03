import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import imga from './output-onlinegiftools (3).gif';

export default function Register() {
    let navigate=useNavigate();


  const [credentials,setCredentials]=useState({email:"",password:""})
    
    const handleSubmit=async (e)=>{
      e.preventDefault();
      localStorage.setItem("uniqueId",credentials.password);
      window.sessionStorage.setItem("email",credentials.email);
      const {email,password} = credentials;
      const response = await fetch("http://localhost:8080/reg/createuser",{
      method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken);
        navigate("/otp");

        }
        else{
          alert("Invalid credentials");
        }
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
    }


  return (
    <>
      <div className="h-[700px] mt-[65px] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="z-50 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="imgcontainer">
    <span
      className="close"
      title="Close Modal"
    >
      <img src={imga} alt="IMAGE" className="avatar" />
   
    </span>
  </div>
          <h2 className="z-50 mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign up to your account
          </h2>
        </div>

        <div className="z-50 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
        </div>
      </div>
    </>
  )
}