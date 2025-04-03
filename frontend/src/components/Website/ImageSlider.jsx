import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { url: 'Image1.jpg', text: 'LET US HELP YOU MAKE A WINNING BID', subtext: 'Get tender submission and Bidding support from experts' },
    { url: 'Image4.jpg', text: 'CREATE WINNING BIDS AND ACHIEVE WINNING GOALS', subtext: 'Reduce cost, save time and improve effiecncy with Bid Management System' },
    { url: 'Image2.jpg', text: 'STAY AHEAD WITH COMPETITORS ANALYTICS REPORTS', subtext: 'Get detailed insights into your competitors bidding behaviour' },
    { url: 'Image5.jpg', text: 'SEARCH FROM 80 LACS+ TENDERS', subtext: 'Access global data bank of tenders and results' },
    { url: 'Image3.jpg', text: 'BID, PROCURE, EXCEL', subtext: 'Discover right business opportunity and partners for growth' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const executeSearch = () => {
    console.log('Search executed for:', searchQuery);
    // Implement actual search logic here
  };

  return (
    <div>
      <div className="carousel-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 1,
          display: 'flex', alignItems: 'center', backgroundColor: 'black', borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <input
            type="text"
            placeholder="Enter keywords to search Tenders..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              width: '250px',
              padding: '8px 12px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '5px 0 0 5px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={executeSearch}
            style={{
              padding: '8px 20px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '0 5px 5px 0',
              backgroundColor: '#007BFF',
              color: '#fff',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          >
            Search
          </button>
        </div>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <img
            src={images[currentImageIndex].url}
            alt={`Slide ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '100px',
            transform: 'translateY(-50%)',
            color: 'white',
            textAlign: 'left',
            maxWidth: '50%',
          }}>
            <h2 style={{ margin: '10px 0 0 0', fontWeight: 'bold', fontSize:'50px', textTransform: 'uppercase' }}>
              {images[currentImageIndex].text}
            </h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '25px' }}>
              {images[currentImageIndex].subtext}
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', position: 'absolute', bottom: '10px', width: '100%' }}>
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                cursor: 'pointer',
                padding: '5px',
                fontSize: '18px',
                color: index === currentImageIndex ? 'white' : 'gray',
              }}
            >
              {index === currentImageIndex ? '●' : '○'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
