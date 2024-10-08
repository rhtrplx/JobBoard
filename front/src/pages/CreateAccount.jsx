import React from 'react';

function CreateAccount() {
  return (
    <div className="container">
      <h1>Create an Account</h1>
      {}
      <form>
        <div className="mb-3">
          <label htmlFor="InputUsername" className="form-label">Username</label>
          <input type="text" className="form-control" id="InputUsername" />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="InputEmail1" />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="InputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateAccount;
