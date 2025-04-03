import React from "react";

const FeaturesAndServices = () => {
  return (
    <div style={{ backgroundColor: "#615EFD", padding: "20px", textAlign: "center" }}>
      <h2>Features & Services</h2>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "20px" }}>
        <ul style={{ listStyleType: "none" }}>
          <li>• Daily Tender Alert Services</li>
          <li>• Tender Analytics</li>
          <li>• Data in Excel Format</li>
          <li>• Contract Awards</li>
        </ul>
        <ul style={{ listStyleType: "none" }}>
          <li>• Project Information</li>
          <li>• Bid Consultancy</li>
          <li>• Knowledge Center</li>
          <li>• Dispute & Complaint Redressal</li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturesAndServices;
