import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import your CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink
        to="/home"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/tender-management"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        Tender Management
      </NavLink>
      <NavLink
        to="/content-management"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        Content Management
      </NavLink>
      <NavLink
        to="/user-management"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        User Management
      </NavLink>
      <NavLink
        to="/reports"
        className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
      >
        Reports and Analytics
      </NavLink>
      <NavLink
        to="/logout"
        className={({ isActive }) => `menu-item logout ${isActive ? 'active' : ''}`}
      >
        Log Out
      </NavLink>
    </div>
  );
};

export default Sidebar;
