import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import myImage from "./logo.jpg";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Display form data in the console

    // Send form data to the server using Axios
    axios
      .post(" http://localhost:3001/signup", formData)
      .then((response) => {
        if (response.data.message === "1") {
          navigate("/UserDashboard", { state: { Name: formData.name } });
        } else {
          alert("Existing User!,Login To Continue");
          navigate("/user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="signup">
      <div className="main-signup">
        <h2>Register</h2>

        <form className="su-form" onSubmit={handleSubmit}>
          <label className="su-label">Name : </label>
          <input type="text"></input>
          <label className="su-label">UID : </label>
          <input type="text"></input>
          <label className="su-label">Password: </label>
          <input type="password"></input>
          <label className="su-label">Club: </label>
          <select className="select-su">
            <option>1</option>
            <option>2</option>
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
