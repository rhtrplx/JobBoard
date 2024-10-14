import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ApplicationForm from './pages/ApplicationForm';
import ModifyAccount from './pages/ModifyAccount';
import AdminPage from './pages/AdminPage';

const WebRouter = () => {
  return (   
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateAccount />} />
      <Route path="/login" element={<FrontPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/applicationform" element={<ApplicationForm/>} />
      <Route path="/modify" element={<ModifyAccount/>} />
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>
    </Router>
);
};

export default WebRouter;
