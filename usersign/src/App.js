import React from 'react';
import SignUpForm from './SignUpForm';
import LoginForm  from './LoginForm';
import Home from './Home';
import { Route, Routes} from 'react-router';
import UserDashboard from './UserDashboard';


function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/signup' element={<SignUpForm/>} />
        <Route path='/UserDashboard' element={<UserDashboard/>} />
      </Routes>
    </div>
  );
};

export default App;
