import logo from "../assets/Logo.png";
import SubmitButton from '../components/SubmitButton';
import CreateButton from '../components/CreateButton';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function FrontPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a POST request to the Flask API
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email" : email, "password": password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      navigate("/home");
    } else {
      console.error(data.message);
      alert(data.error);
    }
  };

  return (
    <div>
      {/* Navbar with Logo */}
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex justify-content-center align-items-center">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" width="120" height="120" />
          </a>
        </div>
      </nav>

      {/* Form */}
      <div className="d-flex justify-content-center align-items-top min-vh-100">
        <form className="w-50" onSubmit={handleSubmit}> {/* Add onSubmit here */}
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="InputEmail1" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Corrected onChange
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Added onChange for password
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Keep me signed-in</label>
          </div>

          <SubmitButton handleSubmit={handleSubmit} />
          <br /> <br />
          <CreateButton />
        </form>
      </div>
    </div>
  );
}

export default FrontPage;
