import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  // Hide Navbar on the "/login" page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <img src="/path-to-your-logo.svg" alt="Logo" className="navbar-logo-img" />
          AM
        </NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/tenders" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
          Tenders
        </NavLink>
        <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
          Blogs
        </NavLink>
        <NavLink to="/offers" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
          Offers
        </NavLink>
      </div>

      <div className="navbar-contact">
        <span>Sales: +91-1234567890</span>
        <NavLink to="/login" className="nav-login-link">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
