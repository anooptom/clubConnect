import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotAloggedin =() =>{
    const navigate = useNavigate();
    useEffect(() => { 
        const timeout = setTimeout(() => {
         navigate('/admin')
        }, 2000); 
    
        return () => clearTimeout(timeout);
      },[]);

    return(
        <h1><center> Not Logged In! Login To Continue....</center></h1>
    )
};

export default NotAloggedin;