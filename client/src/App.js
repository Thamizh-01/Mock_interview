import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import Simulator from './pages/Simulator';
import Resume from './pages/Resume';
import Progress from './pages/Progress';
import Tips from './pages/Tips';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/tips" element={<Tips />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;