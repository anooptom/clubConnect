import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import myImage from "./logo.jpg"


const LoginForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 

    
    axios.post(' http://localhost:3001/login', formData)
      .then(response => {
        if(response.data.message === '1'){
          navigate('/UserDashboard',{state:{Name: formData.name}});
        }
        else if(response.data.message === '0'){
          console.log("Wrong Password");
        }
        else{
          console.log("User doesnt exist");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (

    <div className="main">
      
      <div className="img">
      <img src={myImage} alt="ere" />
      </div>


    <div className="form">
        
        <h1 className="login">LOG IN</h1>

        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label htmlFor="name">Username </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
        </div>

        <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        required/>
        </div>

        <div className="button-container">
        <input type="submit" value='Submit'/>
        </div>
        </form>

    </div>
  </div>

  );
};

export default LoginForm;
