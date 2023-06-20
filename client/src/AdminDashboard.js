import './AdminDashboard.css';
import {HomeOutlined, UserOutlined, LogoutOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const { Content, Sider } = Layout;
var noe, nof,noc,nos;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const AdminDashboard = () => {

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const [data, setData] = useState() ;
    const [fac,setFac] =useState([]);
    const [usr,setUsr] =useState([]);
    const [clb,setClb] =useState([]);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert("Login To Continue")
      navigate('/admin');
    }
  }, [navigate]);

    const [clubData, setclubData] = useState({
      nme: '',
      head: ''
    });

    const [FacultyData, setFacultyData] = useState({
      Fname: '',
      Email: '',
      Pass: '',
      club: ''
    });

    const [FacultyDData, setFacultyDData] = useState({
      Email: ''
    });

    const handleFChange = (e) => {
      setFacultyData({
        ...FacultyData,
        [e.target.name]: e.target.value
      });
      
    };

    const handleFDChange = (e) => {
      setFacultyDData({
        ...FacultyDData,
        [e.target.name]: e.target.value
      });
    };

    const handleChange = (e) => {
      setclubData({
        ...clubData,
        [e.target.name]: e.target.value
      });
    };

    const handleDelete = (e) => {
      e.preventDefault();

      axios.post(' http://localhost:3001/clubDelete', clubData)
        .then(response => {
          if(response.data.message === '1'){
            alert("Club Deleted")
          }
          else if(response.data.message === '0'){
            alert("Club Doesn't Exist");
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleFSubmit = (e) => {
      e.preventDefault();
      axios.post(' http://localhost:3001/facultyCreate', FacultyData)
        .then(response => {
          if(response.data.message === '0'){
            alert("Faculty Already Exists")
          }
          else if(response.data.message === '1'){
            alert("Faculty Created");
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleFDSubmit = (e) => {
      e.preventDefault();
      axios.post(' http://localhost:3001/facultyDelete', FacultyDData)
        .then(response => {
          if(response.data.message === '0'){
            alert("Faculty Doesn't Exist")
          }
          else if(response.data.message === '1'){
            alert("Faculty Deleted");
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handleCreate = (e) => {
      e.preventDefault();

      axios.post(' http://localhost:3001/clubCreate', clubData)
        .then(response => {
          if(response.data.message === '1'){
            alert("Success")
          }
          else if(response.data.message === '0'){
            alert("Club Already Exist");
          }
          else{
            alert("Faculty Not Found");
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    useEffect(() =>{
      const fetchData = async () =>{
        await fetch('http://localhost:3001/data',{method:'get', mode: 'cors'})
        .then(response=>(response.json()))
        .then(json=>{        
          setData(json);
        })
      };
    
      fetchData();  
    },[]);
    
    const fetchfaculty = async()=>{
      await fetch('http://localhost:3001/facultydisplay',{method:'get',mode:'cors'})
      .then(res=>(res.json()))
      .then(json=>{
          setFac(json);
      })
    };

    const fetchclub = async()=>{
      await fetch('http://localhost:3001/clubdisplay',{method:'get',mode:'cors'})
      .then(res=>(res.json()))
      .then(json=>{
          setClb(json);

      })
    };

    const fetchuser = async()=>{
      await fetch('http://localhost:3001/userdisplay',{method:'get',mode:'cors'})
      .then(res=>(res.json()))
      .then(json=>{
          setUsr(json);
      })
    };
    
    if(data){
      noe = data.noe;
      nof = data.nof;
      nos = data.nos;
      noc = data.noc;
    }
    


    const items = [
      getItem('Home', '1', <HomeOutlined />),
      getItem('Faculty', 'sub1', <UserOutlined />, [getItem('Create', '2'), getItem('Delete', '3')]),
      getItem('Club', 'sub2', <GlobalOutlined />, [getItem('View','10'),getItem('Create', '4'), getItem('Delete', '5')]),
      getItem('Users', 'sub3', <TeamOutlined />, [getItem('Faculty', '7'), getItem('Students', '8')]),
      getItem('Log Out', '9', <LogoutOutlined />),
    ];

    const handleMenuClick = ({ key }) => {
      if(key==="7"){
        fetchfaculty();
      }

      if(key ==='10'){
        fetchclub();
      }

      if(key ==='9'){
        handleLogout();
      }

      if(key ==='8'){
        fetchuser();
      }
      setSelectedKey(key);
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

    const handleLogout = () => {
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/admin');
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
            {getMenuItems(items)}
          </Menu>
        </Sider>

        <Content>
          {selectedKey === '1' && (
            <div className="dash">
              <h1>ADMIN DASHBOARD</h1>
              <div className="cards">
                <div className="content-main">
                  <div className="content-main1">
                    <p>Clubs</p>
                    {noc}
                  </div>
                  <div className="content-main1">
                    <p>Faculties</p>
                    {nof}
                  </div>
                </div>
                <div className="content-main2">
                  <div className="content-main1">
                    <p>Students</p>
                    {nos}
                    
                  </div>
                  <div className="content-main1">
                    <p>Upcoming Events</p>
                    {noe}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedKey === '2' && (
            <div>
              <center><p className='f-create'>FACULTY CREATION</p></center>
              <form className="form-main1" onSubmit={handleFSubmit}>
                <label className="form-label">Name: </label>
                <input type="text"  id="Fname" name="Fname" value={FacultyData.Fname}
                onChange={handleFChange}/>
                
                <label className="form-label">Email: </label>
                <input type="text"  id="Email" name="Email" value={FacultyData.Email}
                onChange={handleFChange} />
                
                <label className="form-label">Initial Password: </label>
                <input type="password"   id="Pass" name="Pass" value={FacultyData.Pass}
                onChange={handleFChange}/>
                
                <button className="f-button" type='submit'>CREATE</button>
              </form>
            </div>
          )}

          {selectedKey === '3' && (
            <div>
              
              <center><p className='f-create'>FACULTY DELETION</p></center> 

            <form className='f-del-main' onSubmit={handleFDSubmit}>
              
              <label className='f-del-label'>Email: </label>
              <input type="text"  id="Email" name="Email" value={FacultyDData.Email}
                onChange={handleFDChange} />             

              <button  className='f-del-but' type='submit'>DELETE</button>
            </form>
          </div>
          )}

          {selectedKey === '4' && (
            <div className="club-create">
              <center><p className='h-clubcreate'>CLUB CREATION</p></center>
              <form className="club-form" onSubmit={handleCreate}>
                <label className="label-club" >Club Name: </label>
                <input className="input-club" type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange}/>
                
                <label className="label-club">Faculty Head: </label>
                <input className='input-club' type="text" id="head" name="head" value={clubData.head} onChange={handleChange}/>
                
                <button className="club-create-button" type='submit'>CREATE</button>
              </form>
            </div>
          )}

          {selectedKey === '5' && (
            <div className="club-create">
              <center><p className='h-clubcreate'>CLUB DELETION</p></center>

              <form className="club-form" onSubmit={handleDelete}>
                <label className="label-club">Club Name: </label>
                <input className="input-club" type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange}/>
                <button className="club-create-button" type='submit'>DELETE</button>
              </form>
            </div>
          )}

          {selectedKey === '7' && (
            <div>
            <div className="main-users-faculty">
              <div className="name-users-faculty">
                <center>
                  <h1>Name </h1>
                  {fac.map((data)=>{
                  return( <p>{data.name}</p>);
                  })}
                </center>
              </div>

              <div className="mail-users-faculty">
                <center>
                  <h1>Email</h1>
                  {fac.map((data)=>{
                  return( <p>{data.Email}</p>);
                  })}
                </center>
              </div>

              
              <div className="mail-users-faculty">
                <center>
                  <h1>Club</h1>
                  {fac.map((data)=>{
                  return( <p>{data.club}</p>);
                  })}
                </center>
              </div>
            </div>
            </div>
          )}

          {selectedKey === '8' && (
            <div className="main-users-students">
              <div className="name-users-students">
                <center>
                  <h1>Name</h1>
                  {usr.map((data)=>{
                  return( <p>{data.name}</p>);
                  })}
                </center>
              </div>

              <div className="mail-users-students">
                <center>
                  <h1>UserId</h1>
                  {usr.map((data)=>{
                  return( <p>{data.uid}</p>);
                  })}
                </center>
              </div>

              <div className="mail-users-students">
                <center>
                  <h1>Club</h1>
                  {usr.map((data)=>{
                  return( <p>{data.club}</p>);
                  })}
                </center>
              </div>
            </div>
          )}
          
          {selectedKey === '10' && (
            <div className="main-users-students">
              <div className="name-users-students">
                <center>
                  <h1>Name</h1>
                  {clb.map((data)=>{
                  return( <p>{data.name}</p>);
                  })}
                </center>
              </div>

              <div className="mail-users-students">
                <center>
                  <h1>FacultyHead</h1>
                  {clb.map((data)=>{
                  return( <p>{data.head}</p>);
                  })}
                </center>
              </div>

            </div>
          )}
        </Content>
      </Layout>
    );
  
};
export default AdminDashboard;