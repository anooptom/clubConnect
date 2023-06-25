import {  HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router";
import axios from 'axios';

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
  const[std,setStd]=useState({})
  var len =0;

    useEffect(() => {
      var isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        alert("Login To Continue")
        navigate('/faculty');
      }
      fetchstudents();
    }, [navigate]);

    const fetchstudents = async()=>{
      await fetch(`http://localhost:3001/fetchstd?name=${encodeURIComponent(Location.state.Name)}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res=>(res.json()))
      .then(json=>{
          setStd(json);
          
      })
    };

    if(std.info)
      len = std.info.length;

    const handleLogout = () => {
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/faculty');
    };
    
    const items = [
        getItem('Home', '1', <HomeOutlined />),
        getItem('Students', '2', <UserOutlined/>),
        getItem('Events', 'sub1', <UserOutlined />, [getItem('View', '3'), getItem('Create', '4'), getItem('Delete', '5')]),
        getItem('Log Out', '6', <LogoutOutlined />),
      ];

      const handleMenuClick = ({ key }) => {

        if(key ==='6'){
          handleLogout();
        }

        if(key ==='2'){
          fetchstudents()
        }

        setSelectedKey(key);
      };

      const [eventData, seteventData] = useState({
        name: "",
        des: "",
        date: new Date()
      });

      const handleChange = (e) => {
        seteventData({
          ...eventData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(' http://localhost:3001/eventcreate', {data:eventData,club:std.c})
        .then(response => {
          if(response.data.message == "1"){
            alert("Event Created");
          }
          else{
            alert ("Already Exist");
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
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
              {getMenuItems(items)}
            </Menu>
          </Sider>
          
          {selectedKey ==='1' && Location.state && Location.state.Name && (
            <div>
              <h1>Welcome {Location.state.Name}</h1>
              <h2>Students:  { len } </h2>
              <h2>club: {std.c}  </h2>
            </div>
          )}

          {selectedKey ==='2' &&(
            <div>
              <div>
                <h1>Name</h1>
                {std.info.map((data)=>{
                  return( <p>{data.name}</p>);
                  })}
              </div>

              <div>
                <h1>Uid</h1>
                {std.info.map((data)=>{
                  return( <p>{data.uid}</p>);
                  })}
              </div>
            </div>
          )}

            {selectedKey ==='3' &&(
            <div>
              <div>
                <h1>Upcomming Events</h1>
                
              </div>

              <div>
                <h1>Completed Events</h1>
                
              </div>
            </div>
          )}

          {selectedKey ==='4' &&(
            <div>
              <h1>Create Event</h1>

              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" id="name" name="name" value={eventData.name}
                onChange={handleChange}/>


                <label>Description</label>
                <input type="textArea" id="des" name="des" value={eventData.des}
                onChange={handleChange}/>

                <label >Date</label>
                <input type="date" id="date" name="date" value={eventData.date}
                onChange={handleChange}/>

                <button type="submit">Create</button>
              </form>
            </div>
          )}

          </Layout>

          
  );
  };
  export default FacultyDashboard;