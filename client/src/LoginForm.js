import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import myImage from "./logo.jpg"
import {Link} from 'react-router-dom';


const LoginForm = () => {
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: '',
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

    
    axios.post(' http://localhost:3001/user', formData)
      .then(response => {
        if(response.data.message === '1'){
          localStorage.setItem('isULoggedIn', 'true');
          navigate('/UserDashboard',{state:{uid: formData.uid}});
        }
        else if(response.data.message === '0'){
          alert("Wrong Password");
        }
        else{
          alert("User doesn't exist");
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
        
        <h1>STUDENT LOG IN</h1>

        <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label htmlFor="name">Username </label>
            <input type="text" id="uid" name="uid" value={formData.uid} onChange={handleChange}/>
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
        <p className="psignup">Not a user ? <Link to='/signup' className='linkk'>Sign Up</Link> </p>
        <input type="submit" className="plogin" value="LOG IN"/>
        </div>
        </form>

    </div>
  </div>

  );
};

export default LoginForm;
