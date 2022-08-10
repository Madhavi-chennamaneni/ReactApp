import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = (Props) => {

  const [onclick, setOnclick] = useState (false);

  return (
    <header className="header">
      <div className="headerBody">
        <img
          className="logo"
          src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg"
          alt="Gradious"
        />
      </div>
        <span id="logInProfile" onClick={() => setOnclick(!onclick)} ></span> &nbsp;
        <span id="logInName"></span>
      {  localStorage.getItem("loggedin")==="true" &&  (
          <Link className="logoutLink" to="/" onClick={()=>{localStorage.setItem('loggedin','false');}}>
            Logout
          </Link>
        )}
    </header>
  );
};

export default Header;
