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
    const [loading, setLoading] = useState(true); 

  useEffect(() => {
    var isLoggedIn = localStorage.getItem('isALoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/NotAloggedin');
    }
  }, [navigate]);

    const [clubData, setclubData] = useState({
      nme: '',
      head: ''
    });

    const [pas, setpas] = useState({
      rpass: '',
      cpass: ''
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

    const handlePChange = (e) => {
      setpas({
        ...pas,
        [e.target.name]: e.target.value
      });
    };

    const handleDelete = (e) => {
      e.preventDefault();

      axios.post(' http://localhost:3001/clubDelete', clubData)
        .then(response => {
          if(response.data.message === '1'){
            alert("Club Deleted")
            setclubData({nme:''})
          }
          else if(response.data.message === '0'){
            alert("Club Doesn't Exist");
            setclubData({nme:''})
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
            setFacultyData({Fname:'',Email:'',Pass:''});
          }
          else if(response.data.message === '1'){
            alert("Faculty Created");
            setFacultyData({Fname:'',Email:'',Pass:''});
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
            setFacultyDData({Email:''})
          }
          else if(response.data.message === '1'){
            alert("Faculty Deleted");
            setFacultyDData({Email:''})
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
            setclubData({nme:'',head:''})
          }
          else if(response.data.message === '0'){
            alert("Club Already Exist");
            setclubData({nme:'',head:''})
          }
          else{
            alert("Faculty Not Found");
            setclubData({head:''})
          }
        })
        .catch(error => {
          console.error(error);
        });
    };

    const handlePSubmit = (e) => {
      e.preventDefault();

      if(pas.cpass !== pas.rpass){
        setpas({ rpass: '', cpass: '' });
        alert("Password Mismatch");
      }
      else{
      axios.post(' http://localhost:3001/changepass', {pass:pas,user : "admin"})
        .then(response => {
         if(response.data.message ==="1"){
          setpas({ rpass: '', cpass: '' });
          alert("Password Changed");
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

    useEffect(() =>{
      const fetchData = async () =>{
        await fetch('http://localhost:3001/data',{method:'get', mode: 'cors'})
        .then(response=>(response.json()))
        .then(json=>{        
          setData(json);
        })
      };
    
      fetchData().then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); 
      });
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
      getItem('Change Password', '11', <LogoutOutlined />),
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
      localStorage.setItem('isALoggedIn', 'false');
      navigate('/admin');
    };

    return (
      <Layout style={{ minHeight: '100vh' }}>
      {loading ? (
        <div>
         <center><h2>Loading...</h2></center> 
          </div>
      ) : (
        <>
        <Sider collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenuClick}>
            {getMenuItems(items)}
          </Menu>
        </Sider>

        <Content className='content2'>         
          {selectedKey === '1' && (         
          
          <div>              
              <h1>Admin Dashboard</h1>

            <div className='admin-group'>
             <div className='admin-card'>
               <div>
               <h2>Clubs</h2>
               <p>{noc}</p>
              </div>
            </div>

            <div className='admin-card'>
              <div>
              <h2>Faculty</h2>
              <p>{nof}</p>
              </div>
            </div>

            <div className='admin-card'>
              <div>
              <h2>Completed Events</h2>
              <p>{nof}</p>
              </div>
            </div>

          </div>


          <div className='admin-group'>
             <div className='admin-card'>
               <div>
               <h2>Students</h2>
               <p>{nos}</p>
              </div>
            </div>

            <div className='admin-card'>
              <div>
              <h2>Upcoming Events</h2>
              <p>{noe}</p>
              </div>
            </div>
            

            <div className='admin-card'>
              <div>
              <h2>Enthelum</h2>
              <p>{nof}</p>
              </div>
            </div>          
            
            </div>
            </div>
            
          )}

          {selectedKey === '2' && (
            <div className='changepass-admin'>
              <h1>Create Faculty</h1>
            <form onSubmit={handleFSubmit}>
              <table>
                <tr>
                  <td>Name</td>
                  <td><input type="text"  id="Fname" name="Fname" value={FacultyData.Fname} onChange={handleFChange} required/></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input type="text"  id="Email" name="Email" value={FacultyData.Email} onChange={handleFChange} required/>
                </td>
                </tr>
                
                <tr>
                  <td>Initial Password</td>
                  <td> <input type="password"   id="Pass" name="Pass" value={FacultyData.Pass} onChange={handleFChange} required/>
                </td>
                </tr>
                <tr>
                  <td></td>
                  <td><button className="change-password-button-admin" type='submit'>Create</button></td>
                </tr>
              </table>
            </form>
            </div>
          )}

          {selectedKey === '3' && (
            <div>
              <div className='changepass-admin'>
              <h1>Delete Faculty</h1>
            <form onSubmit={handleFDSubmit}>
              <table>
                <tr>
                  <td>Email</td>
                  <td><input type="text"  id="Email" name="Email" value={FacultyDData.Email}
                onChange={handleFDChange} required/>
                </td>
                </tr>
                
                <tr>
                  <td></td>
                  <td><button  className='f-del-but' type='submit'>DELETE</button></td>
                </tr>
              </table>
            </form>
            </div>
              
             
          </div>
          )}

          {selectedKey === '4' && (
            <div className="changepass-admin">
              <h1>Club Creation</h1>
              <form onSubmit={handleCreate}>
              <table>
                <tr>
                  <td>Club Name</td>
                  <td><input type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange} required/></td>
                </tr>
                <tr>
                  <td>Faculty Head</td>
                  <td><input  type="text" id="head" name="head" value={clubData.head} onChange={handleChange} required/>
                </td>
                </tr>
                
                <tr>
                  <td></td>
                  <td><button className="change-password-button-admin" type='submit'>Create</button></td>
                </tr>
              </table>
            </form>              
            </div>
          )}

          {selectedKey === '5' && (
            <div className="changepass-admin">
               <h1>Club Deletion</h1>
              <form onSubmit={handleDelete}>
              <table>
                <tr>
                  <td>Club Name</td>
                  <td><input  type="text" id="nme" name="nme" value={clubData.nme} onChange={handleChange} required/></td>
                </tr>
                
                <tr>
                  <td></td>
                  <td><button type='submit'>DELETE</button></td>
                </tr>
              </table>
            </form>
              
            </div>
          )}

          {selectedKey === '7' && (
            <div>              
              <h1>Faculty Details</h1>
              <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Club</td>
                </tr>
                {fac.map((data)=>{
                  return(     
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.Email}</td>
                    <td>{data.club}</td>

                  </tr>
                );
              })}
            </table>
            </div>
          )}

          {selectedKey === '8' && (
            <div>
                  <h1>Student Deails</h1>
              <table>
                <tr className='heading'>
                  <td>Name</td>
                  <td>UID</td>
                  <td>Club</td>
                </tr>
                {usr.map((data)=>{
                  return(   
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.uid}</td>
                    <td>{data.club}</td>

                  </tr>
                );
              })}
            </table>
           
            </div>
          )}
          
          {selectedKey === '10' && (
            <div >

            <h1>Club Details</h1>
            <table>
              <tr className='heading'>
                <td>Name</td>
                <td>Faculty Head</td>
              </tr>
              {clb.map((data)=>{
                  return(
                  <tr>
                    <td>{data.name}</td>
                    <td>{data.head}</td>
                  </tr>
                );
              })}
            </table>             

            </div>
          )}

        {selectedKey === '11' && (
            <div className='changepass' >
               <h1>Change Password</h1>
            <form onSubmit={handlePSubmit}>
              <table>
                <tr>
                  <td>New Password</td>
                  <td><input type="password" id="cpass" name="cpass" value={pas.cpass} onChange={handlePChange} required/></td>
                </tr>
                <tr>
                  <td>Confirm Password</td>
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
          
        </Content>
        </>
        )}
      </Layout>
    );
   };
export default AdminDashboard;