import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="row bg-primary text-white text-center p-4">
        <div className="col">
          <h1>HELLO</h1>
        </div>
      </header>

      {/* Main Content Area: Menu and Page */}
      <div className="row" style={{ minHeight: '80vh' }}>
        {/* Menu */}
        <nav className="col-md-3 bg-info text-white p-4">
          <h2>HELLO</h2>
          {/* Add menu items here */}
        </nav>

        {/* Page Content */}
        <main className="col-md-9 bg-dark text-white p-4">
          <h2>HELLO</h2>
          {/* Add page content here */}
        </main>
      </div>

      {/* Footer */}
      <footer className="row bg-success text-white text-center p-4">
        <div className="col">
          <p>Footer</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
