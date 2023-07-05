import React from 'react';
import SignUpForm from './SignUpForm';
import LoginForm  from './LoginForm';
import Home from './Home';
import { Route, Routes} from 'react-router';
import UserDashboard from './UserDashboard';
import FacultyLogin from './FacultyLogin';
import FacultyDashboard from './FacultyDashboard'
import AdminDashboard from './AdminDashboard'
import AdminLogin from './AdminLogin'
import Notvalidated from './Notvalidated';


function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<LoginForm/>} />
        <Route path='/faculty' element={<FacultyLogin/>} />
        <Route path='/signup' element={<SignUpForm/>} />
        <Route path='/admin' element={<AdminLogin/>} />
        <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        <Route path='/UserDashboard' element={<UserDashboard/>} />
        <Route path='/FacultyDashboard' element={<FacultyDashboard/>} />
        <Route path='/NotValidated' element={<Notvalidated/>} />
      </Routes>
    </div>
  );
};

export default App;
