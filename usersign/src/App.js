import React, { useState } from 'react';
import './App.css';

const Data = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the data to the backend
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  return (
    <form>
      <h1>Signup</h1>
      User: <input type="text" value={user} onChange={handleUserChange} /><br />
      Password: <input type="password" value={pass} onChange={handlePassChange} />
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default Data;
