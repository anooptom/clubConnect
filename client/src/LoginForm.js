import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import "./LoginForm.css"
import myImage from "./logo.jpg"
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: '',
    password: ''
  });
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "uid") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.toUpperCase()
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.post('http://localhost:3001/user', formData)
      .then(response => {
        if (response.data.message === '1') {
          localStorage.setItem('isULoggedIn', 'true');
          navigate('/UserDashboard', { state: { uid: formData.uid } });
        }
        else if (response.data.message === '0') {
          setAlertMessage("Wrong Password");
          setFormData({ ...formData, password: '' });
        }
        else {
          setAlertMessage("User doesn't exist");
          setFormData({ ...formData, password: '',uid:'' });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div  className="signup">
      <div className="main-signup">
      <h1>Student Log In</h1>

        <form className="su-form"onSubmit={handleSubmit}>


          <div className="input-group">   
            <input className='suu-input' type="text" placeholder='Enter UID' id="uid" name="uid" value={formData.uid} onChange={handleChange} required />
          </div>        


          <div className="input-group">
            <input className='suu-input' type="password"  placeholder='Password' id="password" name="password" value={formData.password}
              onChange={handleChange}
              required
            />
            {alertMessage && <p className="alert-message">{alertMessage}</p>}</div>
            
          

          <div >
            <p className="psignup">Not a user? <Link to='/signup' className='linkk'>Sign Up</Link></p>

            <button className="su-button" type="submit">
            Log in
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
