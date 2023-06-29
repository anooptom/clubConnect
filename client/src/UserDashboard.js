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

const UserDashboard = () => {

  const navigate = useNavigate();
  const Location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const[data,setData]=useState({})
  var n,c;
  const[events,setevents] = useState([])

  useEffect(() => {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert("Login To Continue")
      navigate('/user');
    }

    fetchdata();

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

  if(data[0] !== undefined){
    n=data[0].name
    c=data[0].club
  }
    

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
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

  const items = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Events', 'sub1', <UserOutlined />, [getItem('UpComming', '3'), getItem('Registerd', '4'), getItem('Completed', '5')]),
    getItem('Log Out', '6', <LogoutOutlined />),
  ];

  const handleMenuClick = ({ key }) => {

    if(key ==='6'){
        handleLogout();
      }
    if(key  ==="3"){
        fetchevents();
    }

    setSelectedKey(key);
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
          <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
              {getMenuItems(items)}
            </Menu>
          </Sider>

          {selectedKey ==='1' && Location.state && Location.state.uid && (
            <div>
              <h1>Welcome {n}</h1>
              <h1>Club : {c}</h1>
              
            </div>
          )}

{selectedKey ==='3' &&(
            <div>
              <div>
                <h1>Events</h1>
                <br />
                    <h2>Name</h2>
                    {events.map((data)=>{
                    return( <p>{data.name}</p>);
                    })}

                    <h2>Description</h2>
                    {events.map((data)=>{
                    return( <p>{data.des}</p>);
                    })}
                    
                    <h2>Date</h2>
                    {events.map((data)=>{
                    return( <p>{data.date}</p>);
                    })}  

                    {events.map((data)=>{
                  return(
                    <div>
                    <button onClick={()=>handleReg(data)}>Register</button>
                    <br />
                    </div>
                  );
                  })}
              </div>
            </div>
          )}
        </Layout>
   )
  };
  export default UserDashboard;