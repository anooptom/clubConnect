import './AdminDashboard.css';
import { FileOutlined, HomeOutlined, UserOutlined, LogoutOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [data, setData] = useState() 

  const [clubData, setclubData] = useState({
    nme: '',
    head: ''
  });

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
  
  if(data !== undefined){
    noe = data.noe;
    nof = data.nof;
    nos = data.nos;
    noc = data.noc;
  }
  

  const items = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('PO Create', '6', <FileOutlined />),
    getItem('Faculty', 'sub1', <UserOutlined />, [getItem('Create', '2'), getItem('Delete', '3')]),
    getItem('Club', 'sub2', <GlobalOutlined />, [getItem('Create', '4'), getItem('Delete', '5')]),
    getItem('Users', 'sub3', <TeamOutlined />, [getItem('Faculty', '7'), getItem('Students', '8')]),
    getItem('Log Out', '9', <LogoutOutlined />),
  ];

  const handleMenuClick = ({ key }) => {
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
            <center>
              <h2>FACULTY CREATION</h2>
            </center>
            <form className="form-main1">
              <label className="form-label">Name: </label>
              <input type="text" />
              <label className="form-label">Email: </label>
              <input type="text" />
              <label className="form-label">Initial password: </label>
              <input type="text" />
              <label>Club</label>
              <select>
                <option>1</option>
              </select>
              <button className="f-button">CREATE</button>
            </form>
          </div>
        )}

        {selectedKey === '3' && (
          <div className="faculty-delete">
            <h2>FACULTY DELETION</h2>
            <div>
              <p>SEARCH</p>
              <input type="email" />
              <p>NAME</p>
              <input type="text" />
              <button className="faculty-delete" id="button-delete">
                DELETE
              </button>
            </div>
          </div>
        )}

        {selectedKey === '4' && (
          <div className="club-create">
            <center>
              <h2>CLUB CREATION</h2>
            </center>
            <form className="club-form" onSubmit={handleCreate}>
              <label className="label-club" >Club Name: </label>
              <input className="input-club" type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange}/>
              
              <label className="label-club">Faculty Head: </label>
              <input type="text" id="head" name="head" value={clubData.head} onChange={handleChange}/>
              
              <button className="club-create-button" type='submit'>CREATE</button>
            </form>
          </div>
        )}

        {selectedKey === '5' && (
          <div className="club-create">
            <center>
              <h2>CLUB DELETION</h2>
            </center>
            <form className="club-form" onSubmit={handleDelete}>
              <label className="label-club">Club Name: </label>
              <input className="input-club" type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange}/>
              <button className="club-create-button" type='submit'>DELETE</button>
            </form>
          </div>
        )}

        {selectedKey === '6' && (
          <div className="po-create">
            <h2>PO CREATE: </h2>
            <input type="text" />
            <button className="po-button">Create</button>
          </div>
        )}

        {selectedKey === '7' && (
          <div className="main-users-faculty">
            <div className="name-users-faculty">
              <center>
                <h1>Name:</h1>
              </center>
            </div>

            <div className="mail-users-faculty">
              <center>
                <h1>Email:</h1>
              </center>
            </div>
          </div>
        )}

        {selectedKey === '8' && (
          <div className="main-users-students">
            <div className="name-users-students">
              <center>
                <h1>Name:</h1>
              </center>
            </div>

            <div className="mail-users-students">
              <center>
                <h1>Email:</h1>
              </center>
            </div>
          </div>
        )}

        {selectedKey === '9' && (
          <div className="name-users-students">
            <h1>Search</h1>
            <input type="search" />

            <div className="main-club1">
              <div className="search-name">
                <center>
                  <h1>Name:</h1>
                </center>
                <p value="p-name"></p>
              </div>

              <div className="search-mail">
                <center>
                  <h1>Email:</h1>
                </center>
                <p value="p-mail"></p>
              </div>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
        };
export default AdminDashboard;
