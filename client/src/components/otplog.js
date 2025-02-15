import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import {useNavigate} from 'react-router-dom';
import {
    Link
  } from "react-router-dom";
  

export default function Otplog() {
  let navigate=useNavigate();

  const [otp, setOtp] = useState('');

  const [credentials,setCredentials]=useState({email:""})
      //let navigate=useNavigate();
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const email = window.sessionStorage.getItem("email");      
      const response = await fetch("http://localhost:8080/otproutes/verify",{
      method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({email, otp})
      });

      const json = await response.json()
      
      console.log({json});
      if(json.success){
        //save the authh token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/organiser");

        }
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
    }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter One Time Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
            </div>
            <div className="a1">
            <div className="mt-2">
            <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            />
            </div>
            </div>

            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}