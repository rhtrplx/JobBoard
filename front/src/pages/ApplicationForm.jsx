import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/Logo.png";
import ProfileLogo from "../assets/ProfileLogo.png";
import Logout from "../assets/Logout.png";
import './Style.css';
import HomeLogo from "../assets/HomeLogo.png";
import { useNavigate } from 'react-router-dom';

function ApplicationForm() {

  return (
    <div>
      {/* Navbar with Logo */}
      <header>
        <div className="HeaderContainer">
          <a className="Logo">
            <img src={logo} alt="Logo" width="100" height="100" />
          </a>
          <a className="ProfileLogo" href="/profile">
            <img src={ProfileLogo} alt="Profile Logo" width="40" height="40" />
          </a>
          <a className="HomeLogo" href="/">
              <img src={HomeLogo} alt="Profile Logo" width="40" height="40" />
          </a>
        </div>
      </header>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>



      </div>
      
  );
}

export default ApplicationForm;
