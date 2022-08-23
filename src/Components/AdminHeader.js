import React from "react"
import logo from "./images/logo.png"
import "./css/header.css"
class AdminHeader extends React.Component {

    render() {
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
                            <a href="http://localhost:3000/" id="questions">QUESTIONS</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/test" id="tests">TESTS</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/candidate" id="candidate">CANDIADATES</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/" id="live">LIVE FEED</a>
                        </div>
                        <div className="Page">
                            <a href="http://localhost:3000/" id="reports">REPORTS</a>
                        </div>
                    </div>
                    <div id="Profile">
                        <img src={logo} id="profilepic" alt="Profilepic" />
                    </div>
                </div>
            </>
        )
    }
}

export default AdminHeader;