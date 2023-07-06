import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotUloggedin =() =>{
    const navigate = useNavigate();
    useEffect(() => { 
        const timeout = setTimeout(() => {
         navigate('/user')
        }, 2000); 
    
        return () => clearTimeout(timeout);
      },[]);

    return(
        <h1><center> Not Logged In! Login To Continue....</center></h1>
    )
};

export default NotUloggedin;