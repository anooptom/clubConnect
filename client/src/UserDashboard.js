import {  HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router";
import axios from 'axios';
import './table.css';
import './Userdashboard.css';
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

const UserDashboard = () => {

  const navigate = useNavigate();
  const Location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const[data,setData]=useState({})
  var n,c,val;
  const[events,setevents] = useState([])
  const[revents,setrevents] = useState([])
  const[cevents,setcevents] = useState([]) 
  const [loading, setLoading] = useState(true); 
  const[notice,setnotice] = useState([])

  useEffect(() => {
    var isLoggedIn = localStorage.getItem('isULoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/NotUloggedin');
    }

    fetchdata()
    .then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false); 
    });
  }, [navigate]);

  const fetchdata = async()=>{
    await fetch(`http://localhost:3001/fetchd?uid=${encodeURIComponent(Location.state.uid)}`, {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(res=>(res.json()))
    .then(json=>{
        setData(json); 
    })
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

    if(pas.cpass !== pas.rpass){
      setpas({ rpass: '', cpass: '' });
      alert("Password Mismatch");
    }
    else{
    axios.post(' http://localhost:3001/changep', {pass:pas,user : Location.state.uid})
      .then(response => {
       if(response.data.message ==="1"){
        window.location.reload();
       }
       else{
        alert("Error Changing Password");
        setpas({ rpass: '', cpass: '' });
       }
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isULoggedIn', 'false');
    navigate('/user');
  };

  const fetchevents = async()=>{
    const response = await axios.get('http://localhost:3001/getevents', {
      params: {
        club: c
      }
    });
    const json = response.data;
    setevents(json.e);
  };

  const fetchrevents = async()=>{
    const response = await axios.get('http://localhost:3001/getrevents', {
      params: {
        club: c,
        nme:n,
        uid:Location.state.uid
      }
    });
    const json = response.data;
    setrevents(json);
  };

  const fetchnotice = async()=>{
    const response = await axios.get('http://localhost:3001/getnotice', {
      params: {
        club: c,
      }
    });
    const json = response.data;
    setnotice(json);
  };

  const [sugg, setsugg] = useState({
    title:"",
    des:"",
  });

  const fetchcevents = async()=>{
    const response = await axios.get('http://localhost:3001/getcevents', {
      params: {
        club: c,
        nme:n,
        uid:Location.state.uid
      }
    });
    const json = response.data;
    setcevents(json);
  };

  const items = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Notifications', '2', <HomeOutlined />),
    getItem('Events', 'sub1', <UserOutlined />, [getItem('UpComing', '3'), getItem('Registerd', '4'), getItem('Completed', '5')]),
    getItem('Suggestions', '7', <HomeOutlined />),
    getItem('Change Password', '11', <LogoutOutlined />),
    getItem('Log Out', '6', <LogoutOutlined />),
    
  ];

  const handleMenuClick = ({ key }) => {

    if(key ==='6'){
        handleLogout();
      }
    if(key  ==="3"){
        fetchevents();
    }
    if(key ==="4"){
      fetchrevents();
    }

    if(key ==="5"){
      fetchcevents();
    }

    if(key ==="2"){
      fetchnotice();
    }

    setSelectedKey(key);
  };



  if(data[0] !== undefined){
    
    n=data[0].name
    c=data[0].club
    if(data[0].vaild ==='no'){
        navigate("/Notvalidated");
    }
  }

  const handleSugg = (e) => {
    e.preventDefault();
   
    axios.post(' http://localhost:3001/pubsugg', {data:sugg ,club:c})
      .then(response => {
        if (response.data.message === "1") {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSChange = (e) => {
    setsugg({
      ...sugg,
      [e.target.name]: e.target.value
    });
  };

  const handleReg=(click)=>{
    axios.post(' http://localhost:3001/reg', {data:click,club:c,nme:n,uid:Location.state.uid})
        .then(response=>{
          if(response.data.message === "1"){
            alert("Registerd");
          }

          else{
            alert("Already Registerd");
          }

        });

  }

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
          <Sider className='menuant' collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu className='menuant' theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
              {getMenuItems(items)}
            </Menu>
          </Sider>
        <div className='content1'>
        {selectedKey === '1' && Location.state && Location.state.uid && (
  <div>
    <div className='welcome-container'>
      <h1>Welcome {n},</h1>
      <div className='profile-image'>
        <img className='circular-image' src={`https://www.rajagiritech.ac.in/stud/ktu/stud/Photo/${Location.state.uid}.jpg`} alt='Profile' />
      </div>
    </div>

    <div className='user-group'>
      <div className='user-card'>
        <div>
          <h2>Club</h2>
          <p>{c}</p>
        </div>
      </div>
      <div className='user-card'>
        <div>
          <h2>Upcoming Events</h2>
          <p>{events.length}</p>
        </div>
      </div>
    </div>

    <div className='user-group'>
      <div className='user-card'>
        <div>
          <h2>Registered Events</h2>
          <p>{revents.length}</p>
        </div>
      </div>
      <div className='user-card'>
        <div>
          <h2>Completed Events</h2>
          <p>{cevents.length}</p>
        </div>
      </div>
    </div>
  </div>
)}




          {selectedKey ==='2' &&(
            <div>
              <div>
                <h1>Notifications</h1>  

                <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Date</td>
                </tr>
                {notice.map((data)=>{
                  return( 
                    <tr>
                      <td>{data.title}</td>
                      <td>{data.des}</td>
                      <td>{data.date}</td>                      
                    </tr>
                    );
                  })}
                </table>  
              </div>      
            </div>
          )}

          {selectedKey ==='3' &&(
            <div>
              <div>
                <h1>Upcoming Events</h1>  

                <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Date</td>
                  <td>Register</td>
                </tr>
                {events.map((data)=>{
                  return( 
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.des}</td>
                      <td>{data.date}</td>
                      <td><button onClick={()=>handleReg(data)}>Register</button></td>                      
                    </tr>
                    );
                  })}
                </table>  
              </div>      
            </div>
          )}

        {selectedKey ==='4' &&(
            <div>
              <div>
                <h1>Registerd Events</h1>

                <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Date</td>
                </tr> 
                {revents.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.des}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                    })} 
              </table>    
              </div>
            </div>
          )}
           {selectedKey ==='5' &&(
            <div>
              <div>
                <h1>Completed Events</h1>
                <table>
                <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Date</td>
                </tr> 
                {cevents.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.des}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                    })} 
              </table> 
                </table> 
   
              </div>
            </div>
          )}
          {selectedKey === '7' && (
          <div className='create-event'>
            <h1>Suggestions And Feedbacks</h1>
            <form onSubmit={handleSugg}>
              <table>
                <tr>
                  <td>Tilte</td>
                  <td><input className='input-sug' type="text" id="title" name="title" value={sugg.title} onChange={handleSChange} required/></td>
                </tr>
                <tr>
                  <td>Description</td>
                  <textarea id="des" name="des" value={sugg.des} onChange={handleSChange} required></textarea>
                </tr>
                <tr>
                  <td></td>
                  <td><button type="submit">Create</button></td>
                </tr>
              </table>
            </form>
          </div>
         )}

           {selectedKey === '11' && (
            <div className='changepass-user'>
              <h1>Change Password</h1>


              <form onSubmit={handlePSubmit}>
              <table>
                <tr>
                  <td>New Password</td>
                  <td><input className='input-sug' type="password" id="cpass" name="cpass" value={pas.cpass} onChange={handlePChange} required/></td>
                </tr>
                <tr>
                  <td>Retype Password</td>
                  <td><input type="text" className='input-sug'  id="rpass" name="rpass" value={pas.rpass} onChange={handlePChange} required/></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button className="change-password-button-user" type='submit'>Submit</button></td>
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
  export default UserDashboard;