import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import myImage from "./logo.jpg"

const AdminLogin =()=>{
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    password: ''
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

    axios.post(' http://localhost:3001/admin', formData)
      .then(response => {
        if(response.data.message === '1'){
          localStorage.setItem('isALoggedIn', 'true');
          navigate('/AdminDashboard');
        }
        else if (response.data.message === '0') {
          setAlertMessage("Wrong Password!");
          setFormData({ ...formData, password: '' });
        }
        else {
          setAlertMessage("Invalid Username!");
          setFormData({ ...formData,name: '',password:'' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (

    <div className="signup">


    <div className="main-signup">
        
        <h1>ADMIN LOG IN</h1>

        <form onSubmit={handleSubmit} className="su-form">
        <div className="input-group">
            
            <input className='suu-input' placeholder='Username' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
        </div>

        <div className="input-group">
        
        <input
        className='suu-input'
        placeholder='Password'
          type="password"
          id="password"
          name="password"
          value={formData.password}
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

export default AdminLogin;

