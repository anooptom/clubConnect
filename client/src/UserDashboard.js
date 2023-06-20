import { useLocation } from "react-router";


const UserDashboard = () => {
    const Location = useLocation();
    return(
      <div className='dashmain'>

      <div className='.svg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e6e6e8" fill-opacity="1" d="M0,96L34.3,122.7C68.6,149,137,203,206,192C274.3,181,343,107,411,96C480,85,549,139,617,144C685.7,149,754,107,823,117.3C891.4,128,960,192,1029,202.7C1097.1,213,1166,171,1234,138.7C1302.9,107,1371,85,1406,74.7L1440,64L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z">
          </path></svg>
      </div>
      <div className='welcome'><h3>Welcome {Location.state.Name}</h3></div>


      <div className='dashboard'>   
         
          <div className='nav'>
              <nav className='navbar'>
                  <ul className='listmain'>
                      <li className='navlist'>Account</li>
                      <li  className='navlist'>Enrolled Activities</li>
                      <li className='navlist'>Upcoming Events</li>
                      <li className='navlist'>Log Out</li>
                  </ul>
              </nav>
          </div>
          <div className="dashboard-card">
              <h2>DASHBOARD</h2>
              
          </div>
          
      </div>

      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e6e6e8" fill-opacity="1" d="M0,96L34.3,122.7C68.6,149,137,203,206,192C274.3,181,343,107,411,96C480,85,549,139,617,144C685.7,149,754,107,823,117.3C891.4,128,960,192,1029,202.7C1097.1,213,1166,171,1234,138.7C1302.9,107,1371,85,1406,74.7L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
          </path></svg>
      </div>
      </div>
    );
  };
  export default UserDashboard;