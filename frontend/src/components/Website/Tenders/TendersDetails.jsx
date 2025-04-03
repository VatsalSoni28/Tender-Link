import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Tenders.css';

const TenderDetails = () => {
  const { tenderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="tender-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>Tender Details - {tenderId}</h1>
      <p>
        This page will display detailed information about the selected tender, such as the
        title, description, organization, reference number, and so on.
      </p>
    </div>
  );
};

export default TenderDetails;
