import React from 'react';
import pic from "./Images/logo.jpg";
import './index.css';

const Header = () => {
  return (
    <nav className='navHeader'>
      <div className='nav-item'>
        <img className='logo' src={pic} alt="Gradious" />
        <h2>Gradious</h2>
      </div>
        
      <div className="logout">
        <span id="profile"></span> &nbsp;
        <span id="name"></span>
        <a class="nav-link" href="#">Logout</a>
      </div>
    </nav>
  )
}

export default Header;