import './AdminDashboard.css'
import { FileOutlined,HomeOutlined, UserOutlined,LogoutOutlined,TeamOutlined,GlobalOutlined } from '@ant-design/icons';
import { Layout, Menu,Card,Col,Row } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const {Content, Sider } = Layout;


function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Faculty', 'sub1', <UserOutlined />, [
    getItem('Create', '2'),
    getItem('Delete', '3'),
  ]),
  getItem('Club', 'sub2', <GlobalOutlined />, [
    getItem('Create', '4'),
    getItem('Delete', '5'),
  ]),
  getItem('PO Create', '6', <FileOutlined />),
  getItem('Users', 'sub3', <TeamOutlined />, [
    getItem('Faculty', '7'),
    getItem('Students', '8'),
  ]),
  getItem('Log Out', '9', <LogoutOutlined />),
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
  
    const handleMenuClick = ({ key }) => {
      setSelectedKey(key);
    };
  
    const getMenuItems = (items) => {
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
                <div>
                <h1 className='dash'>ADMIN DASHBOARD</h1>

                <div  className='content-main'>
                  <div  className='content-main1'> No:Of Clubs:     {club} </div>
                  <div  className='content-main2'>No:Of Faculties:  {faculty}</div>
                  <div  className='content-main3'>No:Of Students:   {students}</div>
                </div>

                <div>
                <div  className='content-main4'>Upcoming Events :   {uevents} </div>
                </div>

                
                </div>
            )}
            {selectedKey === '2' && (
                
                <div> 
                  <center><h2>FACULTY CREATION</h2></center>
                  <form className='form-main1'>
                    <label className='form-label' value={name}>Name: </label>
                    <input type='text'/>
                    <label className='form-label' value={email}>Email: </label>
                    <input type='text'/>
                    <label className='form-label' value={ipassword}>Initial pasword: </label>
                    <input type='text'/>
                    <label>Club</label>
                    <select value={aclubs}>
                      <option>1</option>
                    </select>
                    <button className='f-button'> CREATE</button>
                  </form>
                </div>
            )}

            {selectedKey === '3' && (
              <div className='faculty-delete'>

                <h2>FACULTY DELETION</h2>

                <div>
                  <p>SEARCH</p>
                  <input type='email'/>
                  <p>NAME</p>
                  <input type='text'/>
                  <button className='faculty-delete' id='button-delete'>DELETE</button>                  
                </div>          
                
                
                </div>             

            )}

            {selectedKey === '4' && (
                
                <div className='club-create'> 
                  <center><h2>CLUB CREATION</h2></center>
                  <form className='club-form' >
                    <label className='label-club' >Name of the club: </label>
                    <input className='input-club' type='text'/>
                    <label className='label-club'>Faculty Head: </label>
                    <input type='text'/>
                                                  
                    <button className='club-create-button'> CREATE</button>
                  </form>
                </div>
            )}

            {selectedKey === '5' && (
                
                <div className='club-create'> 
                  <center><h2>CLUB DELETION</h2></center>
                  <form className='club-form' >
                    <label className='label-club' >Name of the club: </label>
                    <input className='input-club' type='text'/>
                    <label className='label-club'>Faculty Head: </label>
                    <input type='text'/>
                                                  
                    <button className='club-create-button'> DELETE</button>
                  </form>
                </div>
            )}

            
            {selectedKey === '6' && (
              <div className='po-create'>
                <h2>PO CREATE: </h2>
                <input type='text'/>
                <button className='po-button'>Create</button>
              </div>
              
            )}


            {selectedKey === '7' && (
              <div className='main-users-faculty'>

                

                  <div  className='name-users-faculty' >
                    <center><h1>Name:</h1></center>
                  </div>

                  <div  className='mail-users-faculty'>
                    <center><h1>Email:</h1></center>
                  </div>

              </div>
              
            )}

            {selectedKey === '8' && (
              <div className='main-users-students'>

                

                  <div  className='name-users-students' >
                    <center><h1>Name:</h1></center>
                  </div>

                  <div  className='mail-users-students'>
                    <center><h1>Email:</h1></center>
                  </div>

              </div>
              
            )}

            {selectedKey === '9' && (
              
                  <div  className='name-users-students' >
                    <h1>Search</h1>
                    <input type='search'/>

                  <div className='main-club1'>
                    
                    <div  className='search-name' >
                    <center><h1>Name:</h1></center>
                    <p value='p-name'></p>                     
                   </div>


                  <div  className='search-mail'>
                    <center><h1>Email:</h1></center>
                    <p value='p-mail'></p>                  
                  </div>                 
          
                
                  
              </div>
              </div>
              
            )}
          </Content>
        
      </Layout>
    );
  };
export default AdminDashboard;