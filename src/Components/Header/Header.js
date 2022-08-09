import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = (Props) => {

  const [onclick, setOnclick] = useState (false);

  return (
    <header>
      <div className="nav-item">
        <img
          className="logo"
          src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg"
          alt="Gradious"
        />
      </div>

      <div className="logout">
        <span id="profile" onClick={() => setOnclick(!onclick)} ></span> &nbsp;
        <span id="name"></span>
        {onclick === true ? localStorage.getItem("loggedin")==='true' && (
          <Link className="nav-link" to="/" onClick={()=>{localStorage.setItem('loggedin','false');}}>
            Logout
          </Link>
        ): null}
      </div>
    </header>
  );
};

export default Header;
