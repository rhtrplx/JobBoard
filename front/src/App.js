import React from 'react';
import logo from './assets/Logo.png';
import './App.css';

function App() {

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted!");
  }


  return (
    <div className="App">
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
        <form className="w-50">
          <div className="mb-3">
            <label htmlFor="InputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="InputEmail1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Keep me signed-in</label>
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: '#1178be', color: 'white' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
