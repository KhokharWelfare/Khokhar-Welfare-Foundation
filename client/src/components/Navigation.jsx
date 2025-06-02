import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAdmin = token && JSON.parse(atob(token.split('.')[1])).role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Khokhar Welfare Foundation" />
        </Link>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/view-usage">View Usage</Link>
        </div>
        <div className="nav-auth">
          {token ? (
            <>
              {isAdmin && <Link to="/admin" className="mr-4">Admin</Link>}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
