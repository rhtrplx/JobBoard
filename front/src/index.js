import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontPage from './pages/FrontPage';
import WebRouter from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <WebRouter/>
  </React.StrictMode>
);

