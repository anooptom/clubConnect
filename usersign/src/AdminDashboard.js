import { FileOutlined, PieChartOutlined, UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Home', '1', <PieChartOutlined />),
  getItem('Faculty', 'sub1', <UserOutlined />, [
    getItem('Create', '2'),
    getItem('Delete', '3'),
  ]),
  getItem('Club', 'sub2', <UserOutlined />, [
    getItem('Create', '4'),
    getItem('Delete', '5'),
  ]),
  getItem('PO Create', '6', <FileOutlined />),
  getItem('Users', 'sub3', <UserOutlined />, [
    getItem('Create', '7'),
    getItem('Delete', '8'),
  ]),
  getItem('Log Out', '9', <LogoutOutlined />),
];
const AdminDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
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
  
    const getContent = () => {
      const selectedItem = items.find(item => item.key === selectedKey);
      return selectedItem ? selectedItem.content : null;
    };
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
            {getMenuItems(items)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>{items.find(item => item.key === selectedKey)?.label}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {getContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>AAA ©2023</Footer>
        </Layout>
      </Layout>
    );
  };
export default AdminDashboard;