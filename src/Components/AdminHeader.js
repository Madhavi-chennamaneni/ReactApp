import React, { useState } from "react";
import logo from "./images/logo.png"
import "./css/header.css"
import { Link } from "react-router-dom";
function AdminHeader () {
    const [onclick, setOnclick] = useState(false);


        return (
            <>
                <div className="Header">
                    <div id="logo">
                        <img src={logo} alt="Gradious" id="logo" />
                        <span id="logoName">Gradious</span>
                    </div>
                    <div className="Pages">
                        <div className="Page">
                            <a href="http://localhost:3000/" id="home">HOME</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/questions" id="questions">QUESTIONS</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/test" id="tests">TESTS</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/candidate" id="candidate">CANDIADATES</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/uploads" id="live">UPLOADS</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/" id="reports">REPORTS</a>
                        </div>
                    </div>
                    {/* <div id="Profile">
                        <img src={logo} id="profilepic" alt="Profilepic" />
                    </div> */}

                    <span id="logInName"></span>

      {localStorage.getItem("loggedin") === "true" && (
        <Link
          className="logoutLink"
          to="/"
          onClick={() => {
            localStorage.removeItem("loggedin");
            localStorage.removeItem("isadmin");
          }}
        >
          Logout
        </Link>
      )}
                </div>
            </>
        )
    }


export default AdminHeader;