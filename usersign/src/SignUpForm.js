import React, { useState } from 'react';
import axios from 'axios';
import "./LoginForm.css"
import myImage from "./logo.jpg"
import { useNavigate } from 'react-router';

const SignUpForm = () => {
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
    console.log(formData); // Display form data in the console

    // Send form data to the server using Axios
    axios.post(' http://localhost:3001/signup', formData)
      .then(response => {
        if(response.data.message === '1'){
          alert("User Created");
          navigate('/UserDashboard',{state:{Name: formData.name}});
        }
        else{
          alert("Existing User!,Login To Continue");
          navigate('/login');
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
      
      <h1>SIGN UP</h1>

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
      <input type="submit" value='SIGN UP'/>
      </div>
      </form>

  </div>
</div>
  );
};

export default SignUpForm;
