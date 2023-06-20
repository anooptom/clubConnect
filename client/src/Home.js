import React from "react";
import {Link} from 'react-router-dom';
import mImage from './logo-no-background.png';
import './Home.css'

const Home = () =>{
    return(
        <div>
        <div className="SVG">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#19456e" fill-opacity="1" d="M0,32L80,74.7C160,117,320,203,480,208C640,213,800,139,960,128C1120,117,1280,171,1360,197.3L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
            </path></svg>
    </div>

    <div className="logocontain">
        <img src={mImage} alt="er"/>
        <hr></hr>
        <div className="homecontainer">
            <h1>Effortless Club Management at Your<br></br> Fingertips</h1>
            
            <button className="btn" ><Link to="/user" className="link">STUDENT</Link></button>
            <button className="btn"><Link to="/faculty" className="link">FACULTY</Link></button> 
            </div>
        </div>
        </div>
    )
}

export default Home;