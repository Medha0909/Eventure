import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import {useNavigate} from 'react-router-dom';
import "../styles/otplog.css";
import {
    Link
  } from "react-router-dom";
  

export default function Otplog() {
  let navigate=useNavigate();
  const customInput = ({events, props}) => <input {...events} {...props} type="text" className="custom-otp-input" />;
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
        else{
          alert("Invalid OTP");
        }
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    
  return (
    <>
      <div className="h-[559px] flex-1 flex-col justify-center px-5 py-12 lg:px-8 mt-[65px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter One Time Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form className="space-y-6  " method="POST" onSubmit={handleSubmit} autocomplete="off">
            
            
            
            <div className='ml-[74px]'  >
            <InputOtp  value={otp}   onChange={(e) => setOtp(e.value)} integerOnly inputTemplate={customInput} />
        </div>
            

            
            <div>
              <button
                type="submit"
                className="flex w-[195px] justify-center ml-[92px] rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-[45px]"
              
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