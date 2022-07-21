import React, { useState, useEffect } from "react";



function Header()

{

return(

    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top"> &nbsp; &nbsp;
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div class="logo">
              <img src="./assets/images/logo.jpg" alt="Gradious"/> &nbsp;
              <h2>Gradious</h2>
            </div>
            <div class="logout">
              <span id="profile"></span> &nbsp;
              <span id="name"></span>
              <a class="nav-link" href="">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

    
)



}


export default Header;