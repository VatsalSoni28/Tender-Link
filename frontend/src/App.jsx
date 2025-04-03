import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import your components
import HomePage from './components/Website/HomePage.jsx';
import Blogs from './components/Website/Blogs/Blogs.jsx';
import Offers from './components/Website/Offers/Offers.jsx';
import Navbar from './components/dashboard/Navbar/Navbar.jsx';
import Tenders from './components/Website/Tenders/Tenders.jsx';
import Login from './components/Login/Login.jsx';
import TenderDetails from './components/Website/Tenders/TendersDetails.jsx';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/tender-details/:id" element={<TenderDetails />} />
          {/* Add a fallback route for 404 */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
