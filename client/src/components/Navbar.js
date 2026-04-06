import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MockPro</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/questions">Questions</Link></li>
            <li><Link to="/simulator">Mock Interview</Link></li>
            <li><Link to="/resume">Resume Analysis</Link></li>
            <li><Link to="/tips">Tips</Link></li>
          </>
        )}
      </ul>
      <div className="nav-auth">
        {user ? (
          <div className="user-menu">
            <span className="user-initial">{user.name?.charAt(0)}</span>
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;