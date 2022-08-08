import React from 'react';
import pic from "./Images/logo.jpg";
import './Header.css';

const Header = (Props) => {
  return (
    <header>
      <div className='nav-item'>
        <img className='logo' src='https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg' alt="Gradious" />
      </div>
        
      <div className="logout">
        <span id="profile"></span> &nbsp;
        <span id="name"></span>
      {(localStorage.getItem("loggedin")==="true")&&  <a className="nav-link" onClick={()=>{localStorage.setItem('loggedin',"false");}} href="/">Logout</a>}
      </div>
    </header>
  )
}

export default Header;