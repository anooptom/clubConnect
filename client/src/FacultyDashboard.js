import { HomeOutlined, UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router';
import axios from 'axios';
import './table.css'
import './FacultyDashboard.css' 
import LoadingScreen from './LoadingScreen';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const Location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [std, setStd] = useState({})
  var len = 0;
  const [events, setevents] = useState([])
  const [cevents, setcevents] = useState([])
  const [notif, setnotif] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    var isLoggedIn = localStorage.getItem('isFLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/Notloggedin');
    }
    fetchstudents()
    .then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false); 
    });
  }, [navigate]);


  const fetchevents = async () => {
    const response = await axios.get('http://localhost:3001/getevents', {
      params: {
        club: std.c
      }
    });
    const json = response.data;
    setevents(json.e);
    setcevents(json.ce);
  };

  const fetchstudents = async () => {
    await fetch(`http://localhost:3001/fetchstd?name=${encodeURIComponent(Location.state.Name)}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => (res.json()))
      .then(json => {
        setStd(json);

      })
  };

  const fetchnotif = async () => {
    await fetch(`http://localhost:3001/fetchnotif?name=${encodeURIComponent(Location.state.Name)}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => (res.json()))
      .then(json => {
        setnotif(json);

      })
  };
  if (std.info)
    len = std.info.length;

  const handleLogout = () => {
    localStorage.setItem('isFLoggedIn', 'false');
    navigate('/faculty');
  };

  const [pas, setpas] = useState({
    rpass: '',
    cpass: ''
  });

  const handlePChange = (e) => {
    setpas({
      ...pas,
      [e.target.name]: e.target.value
    });
  };

  const handlePSubmit = (e) => {
    e.preventDefault();

    if (pas.cpass !== pas.rpass) {
      setpas({ rpass: '', cpass: '' });
      alert("Password Mismatch");
    }
    else {
      axios.post(' http://localhost:3001/changepas', { pass: pas, user: Location.state.Name })
        .then(response => {
          if (response.data.message === "1") {
            window.location.reload();
          }
          else {
            alert("Error Changing Password");
            setpas({ rpass: '', cpass: '' });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const items = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Notifications', '10', <UserOutlined />),
    getItem('Notice', '7', <UserOutlined />),
    getItem('Students', '2', <UserOutlined />),
    getItem('Events', 'sub1', <UserOutlined />, [getItem('View', '3'), getItem('Create', '4')]),
    getItem('Change Password', '11', <LogoutOutlined />),
    getItem('Log Out', '6', <LogoutOutlined />),
  ];

  const handleMenuClick = ({ key }) => {

    if (key === '6') {
      handleLogout();
    }

    if (key === '2') {
      fetchstudents()
    }
    if (key === "3") {
      fetchevents();
    }
    if (key === '10') {
      fetchnotif();
    }
    setSelectedKey(key);
  };

  const [eventData, seteventData] = useState({
    name: "",
    des: "",
    date: new Date()
  });

  const [notice, setnotice] = useState({
    title: "",
    des: "",
  });

  const handleChange = (e) => {
    seteventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleNChange = (e) => {
    setnotice({
      ...notice,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(' http://localhost:3001/eventcreate', { data: eventData, club: std.c })
      .then(response => {
        if (response.data.message === "1") {
          window.location.reload();
        }
        else {
          alert("Already Exist");
        }

      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlecomp = (clicked, attr) => {

    axios.post(' http://localhost:3001/markcomp', { data: clicked.name, club: std.c, op: attr })
      .then(response => (
        window.location.reload()
      ));


  };

  const handlenotif = (clicked, attr) => {

    axios.post(' http://localhost:3001/marknotif', { data: clicked.uid, op: attr })
      .then(response => (
        window.location.reload()
      ));
  };

  const handleNotice = (e) => {
    e.preventDefault();
    

    axios.post(' http://localhost:3001/pubnotice', {data:notice , club: std.c})
      .then(response => {
        if (response.data.message === "1") {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getMenuItems = items => {
    return items.map(item => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {getMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      );
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {loading ? (
       <LoadingScreen />
      ) : (
        <>
          <Sider collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
              {getMenuItems(items)}
            </Menu>
          </Sider>
      <div className='content'>
        {selectedKey === '1' && Location.state && Location.state.Name && (
          <div>
            <h1>Welcome {Location.state.Name} ,</h1>
            <div className='faculty-group'>
            <div className='faculty-card'>
              <div>
              <h2>Students</h2>
              <p>{len}</p>
              </div>
            </div>
            <div className='faculty-card'>
              <div>
              <h2>Club</h2>
              <p>{std.c}</p>
              </div>
            </div>
            </div>
            <div className='faculty-group'>
            <div className='faculty-card'>
              <div>
              <h2>Upcoming Events</h2>
              <p>{events.length}</p>
              </div>
            </div>
            <div className='faculty-card'>
              <div>
              <h2>Completed Events</h2>
              <p>{cevents.length}</p>
              </div>
            </div>
            </div>
          </div>
        )}

        {selectedKey === '2' && (
          <div>
            <h1>Student Details</h1>
            <table>
              <tr className='heading'>
                <td>Name</td>
                <td>UID</td>
              </tr>
              {std.info.map((data) => {
                return (
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.uid}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}

        {selectedKey === '3' && (
          <div>
            <div>
              <h1>Upcoming Events</h1>
              <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Date</td>
                  <td>Action</td>
                </tr>
                {events.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.date}</td>
                      <td><button onClick={() => handlecomp(data, "comp")}>Completed</button>
                        <button onClick={() => handlecomp(data, "del")}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </table>

            </div>

            <div>
              <h1>Completed Events</h1>
              <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Date</td>
                </tr>
                {cevents.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        )}

        {selectedKey === '11' && (
          <div className='changepass'>
            <h1>Change Password</h1>
            <form onSubmit={handlePSubmit}>
              <table>
                <tr>
                  <td>New Password</td>
                  <td><input type="password" id="cpass" name="cpass" value={pas.cpass} onChange={handlePChange} required/></td>
                </tr>
                <tr>
                  <td>Retype Password</td>
                  <td><input type="text" id="rpass" name="rpass" value={pas.rpass} onChange={handlePChange} required/></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button className="change-password-button" type='submit'>Submit</button></td>
                </tr>
              </table>
            </form>
          </div>
        )}

        {selectedKey === '10' && (
          <div>
            {notif.length === 0 ? (
              <div className='no-notif'>
                <div style={{ textAlign: "center" }}>
                  <BellOutlined style={{ fontSize: 7 + "rem" }} />
                  <p>No New Notifications</p>
                </div>

              </div>
            ) : (
              <div>
                <div>
                  <h1>New Notifications</h1>
                  <table>
                    <tr className='heading'>
                      <td>Name</td>
                      <td>UID</td>
                      <td>Action</td>
                    </tr>
                    {notif.map((data) => (
                      <tr>
                        <td key={data.uid}>{data.name}</td>
                        <td key={data.uid}>{data.uid}</td>
                        <td>
                          <button onClick={() => handlenotif(data, "app")}>Approve</button>
                          <button onClick={() => handlenotif(data, "rej")}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            )}
          </div>
        )}


        {selectedKey === '4' && (
          <div className='create-event'>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
              <table>
                <tr>
                  <td>Name</td>
                  <td><input type="text" id="name" name="name" value={eventData.name} onChange={handleChange} required/></td>
                </tr>
                <tr>
                  <td>Description</td>
                  <textarea id="des" name="des" value={eventData.des} onChange={handleChange} required></textarea>
                </tr>
                <tr>
                  <td>Date</td>
                  <input type="date" id="date" name="date" value={eventData.date} onChange={handleChange} required/>
                </tr>
                <tr>
                  <td></td>
                  <td><button type="submit">Create</button></td>
                </tr>
              </table>
            </form>
          </div>
         )}

          {selectedKey === '7' && (
          <div className='create-event'>
            <h1>Notice</h1>
            <form onSubmit={handleNotice}>
              <table>
                <tr>
                  <td>Tilte</td>
                  <td><input type="text" id="title" name="title" value={notice.title} onChange={handleNChange} required/></td>
                </tr>
                <tr>
                  <td>Description</td>
                  <textarea id="des" name="des" value={notice.des} onChange={handleNChange} required></textarea>
                </tr>
                <tr>
                  <td></td>
                  <td><button type="submit">Create</button></td>
                </tr>
              </table>
            </form>
          </div>
         )}
         </div>
       </>
     )}
   </Layout>
 );
};
export default FacultyDashboard;