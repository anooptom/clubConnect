import React, { useState,useEffect } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [clb,setclub] =useState([]);
  const [formData, setFormData] = useState({
    name: "",
    uid:'',
    password: "",
    club:''
  });

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

  useEffect(() =>{
    const fetchClub = async () =>{
      await fetch('http://localhost:3001/fetchclub',{method:'get', mode: 'cors'})
      .then(response=>(response.json()))
      .then(json=>{        
        setclub(json);
      })
    };
  
    fetchClub();  
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.club ==="Select" || formData.club===""){
      alert("Select Club");
    }

    else{
    axios
      .post(" http://localhost:3001/signup", formData)
      .then((response) => {
        if (response.data.message === "1") {
          navigate("/Notvalidated")
        } else {
          alert("Existing User!,Login To Continue");
          navigate("/user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <div className="signup">
      
      <div className="main-signup">
        <h2>Create an Account</h2>

        <form className="su-form" onSubmit={handleSubmit}>  

          <div className="input-group">
            <input className='suu-input' placeholder='Name' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
          </div>

          <div className="input-group">
            <input className='suu-input'type="text" placeholder="UID" id="uid" name="uid" value={formData.uid} onChange={handleChange} required></input>
          </div>

          <div className="input-group">
          <input className='suu-input' type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleChange} required/>  
          </div>

          <div className="input-group">
          <select id='club'className='suu-input' name='club' value={formData.club} onChange={handleChange} required>
          <option>Select</option>
          {clb.map((data)=>{
                  return( <option >{data.name}</option>);
          })}
          </select>
          </div>
          
          <button className="su-button" type="submit">
            Register
          </button>
        </form>
        <a className='link' href='/user'>Back to login</a>
      </div>
    </div>
  );
};

export default SignUpForm;