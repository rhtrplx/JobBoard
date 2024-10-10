import React from 'react';
import logo from "../assets/Logo.png";
import SubmitButton from '../components/SubmitButton';
import CreateAccountButton from '../components/CreateAccountButton';
import './Style.css';

function FrontPage() {

  return (
    <div>
      {/* Navbar with Logo */}
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center align-items-center">
          <a className="navbar-brand">
            <img src={logo} alt="Logo" width="120" height="120" />
          </a>
        </div>
      </nav>

      {/* Form Section */}
      <div className="container mt-4">
        <form className="row g-3 d-flex justify-content-center">

          <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input type="text" className="form-control" id="inputName" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="inputLastname" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="inputConfirmPassword" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAge" className="form-label">Birthday</label>
            <input type="date" className="form-control" id="inputAge" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="inputTitle" placeholder="Expert in Cybersecurity" />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" placeholder="Hi, my name is..." rows="4"></textarea>
          </div>



          <div className="row g-3 Location d-flex justify-content-center">
            <div className="col-md-4">
              <label htmlFor="inputCity" className="form-label">City</label>
              <input type="text" className="form-control" id="inputCity"/>
            </div>

            <div className="col-md-4">
              <label htmlFor="inputCountry" className="form-label">Country</label>
              <input type="text" className="form-control" id="inputCountry" />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputZip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          
          <div className="col-12 d-flex justify-content-center mt-3">
            <CreateAccountButton />
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default FrontPage;
