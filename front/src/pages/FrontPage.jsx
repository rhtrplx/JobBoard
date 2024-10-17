import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton';
import logo from "../assets/Logo.png";
import './Style.css';
import { Link } from 'react-router-dom';
import NavigationHeader from '../components/Header';
import CreateAccount from '../components/CreateAccount';

function FrontPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/'); // Redirect if already logged in
    }
  }, [navigate]);

  // Get the redirect path from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/'; // Default to /home

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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

        // Save the token in localStorage
        localStorage.setItem('token', data.user.token);

        // Save user data in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('isAdmin', data.user.isAdmin);

        console.log(localStorage.getItem("isAdmin"))
        // Redirect to the specified path or default to /home
        navigate(redirectPath);
      } else {
        console.error(data.message);
        alert(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      {/* Navbar with Logo */}
      <NavigationHeader />

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

          <SubmitButton handleSubmit={handleSubmit} /><br />
          <CreateAccount/>
          <br /> <br /> 
        </form>
      </div>
    </div>
  );
}

export default FrontPage;
