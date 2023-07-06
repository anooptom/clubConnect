import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Notvalidated =() =>{
    const navigate = useNavigate();
    useEffect(() => { 
        const timeout = setTimeout(() => {
         navigate('/user')
        }, 2500); 
    
        return () => clearTimeout(timeout);
      },[]);

    return(
        <h1><center> Please Wait For The  Faculty To Approve</center></h1>
    )
};

export default Notvalidated;