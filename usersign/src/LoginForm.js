import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';


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
    <form onSubmit={handleSubmit}>
      <h1>Login </h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        required/>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
