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
                <h1 className='dash'>ADMIN DASHBOARD</h1><br />               
                    
                </div>
            )}
            {selectedKey === '6' && (
                <div>
                <h1>clicked po create</h1>
                </div>
            )}
            {selectedKey === '9' && (
                navigate('/admin')
            )}
          </Content>
        
      </Layout>
    );
  };
export default AdminDashboard;