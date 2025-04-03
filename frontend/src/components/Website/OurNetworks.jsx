import React from "react";

const OurNetworks = () => {
  return (
    <div style={{ backgroundColor: "#D3D3D3", padding: "20px", textAlign: "center" }}>
      <h2>Our Networks</h2>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div>
          <h3>Important Links</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>About Us</li>
            <li>Why Us</li>
            <li>Solution for Buyers</li>
            <li>Solution for Suppliers</li>
          </ul>
        </div>
        <div>
          <h3>Contact Us</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>Phone No</li>
            <li>Telephone No</li>
            <li>Email-ID Sales</li>
            <li>Email-ID Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OurNetworks;
