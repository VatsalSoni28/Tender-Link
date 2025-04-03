import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import TenderManagement from '../TenderManagement/TenderManagement';
import ContentManagement from '../ContentManagement/ContentManagement';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <Routes>
          <Route path="dashboard-home" element={<Home />} />
          <Route path="x" element={<TenderManagement />} />
          <Route path="content-management" element={<ContentManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
