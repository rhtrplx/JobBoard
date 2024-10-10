import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import CreateButton from '../components/CreateButton';
import logo from "../assets/Logo.png";

function FrontPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/home'; // Default to /home

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a POST request to the Flask API
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      localStorage.setItem('isLoggedIn', 'true'); // Store login state

      // Redirect to the specified path or default to /home
      navigate(redirectPath);
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
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="InputEmail1" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
