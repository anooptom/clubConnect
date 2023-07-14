import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"

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

    <div className="signup">
        <div className="main-signup">
          
        <h1>FACULTY LOG IN</h1>

        <form className="su-form" onSubmit={handleSubmit}>
        
        <div className="input-group">            
            <input className='suu-input' placeholder='Email' type="text" id="Email" name="Email" value={formData.Email} onChange={handleChange} required/>
        </div>

        <div className="input-group">
        <input
        className='suu-input'
        placeholder='Password'
          type="password"
          id="Pass"
          name="Pass"
          value={formData.Pass}
          onChange={handleChange}
        required/>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
        </div>

        <button className="su-button" type="submit">
            Log in
          </button>
        </form>
        
        </div>
        
        
        

    </div>
  

  );
};

export default FacultyLogin;

