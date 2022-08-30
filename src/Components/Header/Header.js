import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Header = (Props) => {
  const [onclick, setOnclick] = useState(false);
  const {pathname} = useLocation()

  return (
    <header className="header">
      <div className="headerBody">
        <img
          className="logo"
          src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg"
          alt="Gradious"
        />
      </div>

      {(Props.hideTimer.includes(pathname) ) && (<span className="timer">  {`Time Left :${Math.floor(Props.seconds / 3600)}h:${Math.floor(
        (Props.seconds % 3600) / 60
      )}m:${Math.floor((Props.seconds % 3600) % 60)}s`}</span>)}
      
      <span id="logInProfile" onClick={() => setOnclick(!onclick)} ></span> &nbsp;
      <span id="logInName"></span>
      {localStorage.getItem("loggedin") === "true" && (
        <a
          className="logoutLink"
          href="/"
          onClick={() => {
            localStorage.setItem("loggedin", "false");
          }}
        >
          Logout
        </a>
      )}
    </header>
  );
};

export default Header;
