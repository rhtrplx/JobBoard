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

      <form className="row g-3 d-flex justify-content-center">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email"/>
          </div>
          <div className="col-md-6">
            <label htmlFor="contactInformations" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="contactInformations"/>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Message</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label">Upload Resume</label>
            <input class="form-control" type="file" id="formFile"/>
          </div>

          </form>

    </div>
      
  );
}

export default ApplicationForm;
