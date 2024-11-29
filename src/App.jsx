// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ToolsPage from './pages/ToolsPage';
import VerifyEmail from './pages/VerifyEmail';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

console.log('Entorno actual:', import.meta.env.MODE);

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tools" element={<ProtectedRoute><ToolsPage /></ProtectedRoute>} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </>
  );
};

export default App;
