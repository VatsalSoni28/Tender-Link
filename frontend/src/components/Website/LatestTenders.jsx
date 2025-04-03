import React, { useState, useEffect } from "react";

// Sample fetch data function, replace with actual data source in production
const fetchTendersData = async () => {
  // In a real app, this would be an API call
  return [
    { id: 1, title: "Construction of New Bridge", date: "2024-11-20", amount: "$1,000,000", description: "A project to build a new bridge across the river.", state: "Maharashtra" },
    { id: 2, title: "Supply of IT Equipment", date: "2024-11-21", amount: "$500,000", description: "Procurement of laptops, servers, and peripherals.", state: "Gujarat" },
    { id: 3, title: "Road Maintenance Contract", date: "2024-11-22", amount: "$300,000", description: "Maintenance of city roads for the next fiscal year.", state: "Maharashtra" },
    { id: 4, title: "Building Renovation Project", date: "2024-11-23", amount: "$700,000", description: "Renovation of government office buildings.", state: "Madhya Pradesh" },
    { id: 5, title: "New Solar Plant Installation", date: "2024-11-24", amount: "$2,000,000", description: "Installation of a solar plant in the industrial area.", state: "Gujarat" },
    { id: 6, title: "Airport Expansion Project", date: "2024-11-25", amount: "$5,000,000", description: "Expansion of the main terminal and runways at the airport.", state: "Maharashtra" },
    { id: 7, title: "Water Supply System Upgrade", date: "2024-11-26", amount: "$1,200,000", description: "Upgrade of water supply systems for rural areas.", state: "Uttar Pradesh" },
    { id: 8, title: "City Park Development", date: "2024-11-27", amount: "$900,000", description: "Development of a public park with modern amenities.", state: "Madhya Pradesh" },
  ];
};

const LatestTenders = () => {
  const [tenders, setTenders] = useState([]);
  //const [selectedTender, setSelectedTender] = useState(null);

  // Fetch tenders on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTendersData();
      setTenders(data);
    };
    fetchData();
  }, []);

  // Get today's date in 'YYYY-MM-DD' format
  const today = new Date().toISOString().split("T")[0];

  // Count tenders open today
  const tendersOpenToday = tenders.filter(tender => tender.date === today).length;

  // Count total tenders
  const totalTenders = tenders.length;

  // Count tenders open in each state
  const tendersByState = tenders.reduce((acc, tender) => {
    acc[tender.state] = (acc[tender.state] || 0) + 1;
    return acc;
  }, {});

  // Format numbers to show "100+" if tenders exceed 100
  const formatTenderCount = (count) => {
    return count > 100 ? `${Math.floor(count / 100) * 100}+` : count;
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#fff" }}>Government Tenders Details</h2>

      {/* Cards at the top */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ color: "#fff" }}>Tenders Open Today</h3>
          <p style={{ color: "#fff", fontSize: "24px" }}>{formatTenderCount(tendersOpenToday)}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={{ color: "#fff" }}>Total Tenders</h3>
          <p style={{ color: "#fff", fontSize: "24px" }}>{formatTenderCount(totalTenders)}</p>
        </div>
      </div>

      {/* Tenders Open in Each State */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {Object.keys(tendersByState).map((state) => (
          <div key={state} style={cardStyle}>
            <h3 style={{ color: "#fff" }}>Tenders in {state}</h3>
            <p style={{ color: "#fff", fontSize: "24px" }}>{formatTenderCount(tendersByState[state])}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Container Style (Dark Background)
const containerStyle = {
  padding: "20px",
  backgroundColor: "#333", // Dark background
  color: "#fff", // White text color for contrast
  minHeight: "100vh", // Full screen height for better layout
};

// Card Style (Custom Purple Color Background)
const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#615EFD", // Card color updated to #615EFD
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "30%",
  marginBottom: "20px",
};

export default LatestTenders;
