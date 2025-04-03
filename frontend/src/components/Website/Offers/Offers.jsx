import React, { useState, useEffect } from "react";

const Offers = () => {
  // State to hold offers data
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Fetch offers data (Replace this with your API call)
  useEffect(() => {
    const fetchOffers = async () => {
      const data = [
        {
          id: 1,
          title: "Winter Special Discount",
          description: "Get 20% off on all products this winter season.",
          validity: "Valid till 31st December 2024",
        },
        {
          id: 2,
          title: "New User Offer",
          description: "Sign up and get $10 off on your first purchase.",
          validity: "No expiry date",
        },
        {
          id: 3,
          title: "Referral Bonus",
          description: "Refer a friend and earn $15 for every successful referral.",
          validity: "Valid till 30th November 2024",
        },
        {
          id: 4,
          title: "Flash Sale",
          description: "Up to 50% off on selected items for the next 24 hours!",
          validity: "Valid till 21st November 2024",
        },
        {
          id: 5,
          title: "Loyalty Reward Program",
          description: "Earn double loyalty points on all purchases this month.",
          validity: "Valid till 30th November 2024",
        },
      ];
      setOffers(data);
    };

    fetchOffers();
  }, []);

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px", marginTop: "50px" }}>
  Our Offers
</h2>


      {/* Featured Offer Section */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#615EFD",
          color: "#fff",
          borderRadius: "10px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        <h3>Special Offer: {offers[0]?.title || "Check out our latest deals!"}</h3>
        <p>{offers[0]?.description || "Explore our amazing offers designed just for you."}</p>
        <p style={{ fontStyle: "italic" }}>{offers[0]?.validity || "Limited time only!"}</p>
      </div>

      {/* Offers List */}
      {!selectedOffer ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {offers.map((offer) => (
            <div
              key={offer.id}
              style={{
                width: "300px",
                padding: "20px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
              onClick={() => setSelectedOffer(offer)}
            >
              <h4 style={{ marginBottom: "10px", color: "#333" }}>{offer.title}</h4>
              <p style={{ color: "#555" }}>{offer.description.substring(0, 60)}...</p>
              <p style={{ fontSize: "12px", color: "#999" }}>{offer.validity}</p>
            </div>
          ))}
        </div>
      ) : (
        // Offer Details View
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3 style={{ color: "#333" }}>{selectedOffer.title}</h3>
          <p style={{ color: "#555" }}>{selectedOffer.description}</p>
          <p style={{ fontStyle: "italic", color: "#999" }}>{selectedOffer.validity}</p>
          <button
            onClick={() => setSelectedOffer(null)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#615EFD",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Offers
          </button>
        </div>
      )}
    </div>
  );
};

export default Offers;
