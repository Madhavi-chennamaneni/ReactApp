import React from 'react';
import pic from "./Images/logo.jpg";
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className='nav-item'>
        <img className='logo' src='https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg' alt="Gradious" />
      </div>
        
      <div className="logout">
        <span id="profile"></span> &nbsp;
        <span id="name"></span>
        <a className="nav-link" href="/">Logout</a>
      </div>
    </header>
  )
}

export default Header;