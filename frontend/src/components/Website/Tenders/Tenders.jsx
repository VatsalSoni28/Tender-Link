import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tenders.css';

const Tenders = () => {
  const [tenders, setTenders] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [sector, setSector] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const tendersPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenders = async () => {
      setLoading(true);
      const mockData = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        title: `Tender Title ${index + 1}`,
        description: `Detailed description of tender ${index + 1}. This tender involves tasks related to ${
          index % 2 === 0 ? 'construction' : 'publishing'
        }.`,
        state: `State${(index % 3) + 1}`,
        district: `District${(index % 3) + 1}`,
        sector: `Sector${(index % 3) + 1}`,
        deadline: `Deadline ${(index % 30) + 1} Dec 2024`,
        value: `${(Math.random() * 10).toFixed(2)} Million`,
        refNo: `Ref${100000000 + index}`,
        organization: `Organization ${(index % 5) + 1}`,
      }));
      setTenders(mockData);
      setFilteredTenders(mockData);
      setLoading(false);
    };
    fetchTenders();
  }, []);

  useEffect(() => {
    let filtered = tenders;

    if (searchQuery) {
      filtered = filtered.filter((tender) =>
        tender.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (state) filtered = filtered.filter((tender) => tender.state === state);
    if (district) filtered = filtered.filter((tender) => tender.district === district);
    if (sector) filtered = filtered.filter((tender) => tender.sector === sector);

    setFilteredTenders(filtered);
    setCurrentPage(1);
  }, [searchQuery, state, district, sector, tenders]);

  const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);
  const displayedTenders = filteredTenders.slice(
    (currentPage - 1) * tendersPerPage,
    currentPage * tendersPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTenderClick = (tenderId) => {
    navigate(`/tender-details/${tenderId}`);
  };

  return (
    <div className="tenders-page">
      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter Keywords to search Tender"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="filters-container">
          <div className="filter-header">Filter Your Search</div>
          <div className="filters">
            <select onChange={(e) => setState(e.target.value)} value={state}>
              <option value="">State</option>
              <option value="State1">State1</option>
              <option value="State2">State2</option>
              <option value="State3">State3</option>
            </select>
            <select onChange={(e) => setDistrict(e.target.value)} value={district}>
              <option value="">District</option>
              <option value="District1">District1</option>
              <option value="District2">District2</option>
              <option value="District3">District3</option>
            </select>
            <select onChange={(e) => setSector(e.target.value)} value={sector}>
              <option value="">Sector</option>
              <option value="Sector1">Sector1</option>
              <option value="Sector2">Sector2</option>
              <option value="Sector3">Sector3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tenders List */}
      <div className="tenders-list">
        {loading ? (
          <p>Loading tenders...</p>
        ) : displayedTenders.length > 0 ? (
          displayedTenders.map((tender) => (
            <div
              key={tender.id}
              className="tender-card"
              onClick={() => handleTenderClick(tender.id)}
            >
              <h3>{tender.title}</h3>
              <p>
                <strong>Sector:</strong> {tender.sector}
              </p>
              <p>
                <strong>Value:</strong> INR {tender.value}
              </p>
              <p>
                <strong>Ref No:</strong> {tender.refNo}
              </p>
              <p>
                <strong>Deadline:</strong> {tender.deadline}
              </p>
            </div>
          ))
        ) : (
          <p>No tenders found matching your criteria.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tenders;
