import * as React from 'react';
import { DateRangePicker } from "rsuite"; 
import '../styles/forseeker.css';
import NumericInput from 'react-numeric-input';
import Select from 'react-select';
import { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
var ReactDOM = require('react-dom');
export default function Forseeker() {
    const options = [
        { value: 'sports', label: 'Sports' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'seminar', label: 'Seminar' },
      ];
      const [selectedOption, setSelectedOption] = useState(null);
      const [value, setValue] = useState('')
  const options1 = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }

  return (
    
    <>
    
         <div className="l-form ">
        <div className="shape1" />
        <div className="shape2" />
        <div className="form">
          <img src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-733.gif" alt="image" className="form-img" />
          <form action="#" className="form-content">
            <h6 className="form-title "><span>Welcome to ForeSeeker !!!</span></h6>
            <div className="form-div form-div-one ">
              <div className="form-icon">
                <i className="bx bxs-user-circle" />
              </div>
            </div>
            <div className="input-group">
              <label>Event Type</label>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>

    <div className="input-group">
                <label>Country</label>
                <Select options={options1} value={value} onChange={changeHandler} />          
            </div>
            <div className="input-group">
                <label>City</label>
                <Box
      component="form"
      sx={{ '& > :not(style)': {width: '41ch' } }}
      noValidate
      autoComplete="off"
    ><TextField id="outlined-basic"  /></Box>       
            </div>
            <div className="input-group">
                <label>Place</label>
                <Box
      component="form"
      sx={{ '& > :not(style)': {width: '41ch' } }}
      noValidate
      autoComplete="off"
    ><TextField id="outlined-basic"  /></Box>       
            </div>
  
            <div className="input-group">
                <label >Event Duration(In Days)</label>
                <NumericInput size={90}  />
            </div>

            <div className="input-group">
                <label for="Event-budget">Event Expenses</label>
                <NumericInput size={90} />
            </div>
            <div className="input-group">
                <label >Number Of People</label>
                <NumericInput size={90}  />
            </div>
            <input type="submit" defaultValue="Login" className="form-button" />
            <div className="form-social">
              <a href="#" className="form-social-icon"><i className="bx bxl-facebook" /></a>
              <a href="#" className="form-social-icon"><i className="bx bxl-google" /></a>
              <a href="#" className="form-social-icon"><i className="bx bxl-instagram" /></a>
            </div>
          </form>
        </div>
        
      </div>
      
      
    </>
  );

}
