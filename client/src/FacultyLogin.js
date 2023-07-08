import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import myImage from "./logo.jpg"

const FacultyLogin =()=>{
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',
    Pass: ''
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(' http://localhost:3001/faculty', formData)
      .then(response => {
        if(response.data.message === '1'){
          localStorage.setItem('isFLoggedIn', 'true'); 
          navigate('/FacultyDashboard',{state:{Name: response.data.name}});
        }
        else if (response.data.message === '0') {
          setAlertMessage("Wrong Password!");
          setFormData({ ...formData, Pass: '' });
        }
        else {
          setAlertMessage("Invalid Email!");
          setFormData({ ...formData,Email: '',Pass:'' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (

    <div className="main">
      
      <div className="imghome">
      <img src={myImage} alt="logo" />
      </div>


    <div className="formlogin">
        
        <h1>FACULTY LOG IN</h1>

        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label >Email </label>
            <input type="text" id="Email" name="Email" value={formData.Email} onChange={handleChange} required/>
        </div>

        <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="Pass"
          name="Pass"
          value={formData.Pass}
          onChange={handleChange}
        required/>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
        </div>

        <div className="button-container">
        <input type="submit" value='LOG IN'/>
        </div>
        
        </form>

    </div>
  </div>

  );
};

export default FacultyLogin;

