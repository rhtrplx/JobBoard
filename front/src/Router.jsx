import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

const WebRouter = () => {
  return (   
    <Router>
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/create" element={<CreateAccount />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
    </Router>
);
};

export default WebRouter;
