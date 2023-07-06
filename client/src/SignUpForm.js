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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <h2>Register</h2>

        <form className="su-form" onSubmit={handleSubmit}>
          <label className="su-label" >Name : </label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
          <label className="su-label">UID : </label>
          <input type="text" id="uid" name="uid" value={formData.uid} onChange={handleChange} required></input>
          <label className="su-label">Password: </label>
          <input type="password"  id="password" name="password" value={formData.password} onChange={handleChange} required/>
          <label className="su-label">Club: </label>
         <select id='club' name='club' value={formData.club} onChange={handleChange} required>
          <option>Select</option>
          {clb.map((data)=>{
                  return( <option >{data.name}</option>);
          })}
          </select>
          <br></br>
          <button className="button-signup" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;