import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {

    const navigate = useNavigate();
    useEffect(() => { 
        const timeout = setTimeout(() => {
         navigate('/')
        }, 2000); 
    
        return () => clearTimeout(timeout);
      },[]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The requested URL was not found on this server.</p>
    </div>
  );
};

export default NotFound;
