import React from 'react';
import FeaturesAndServices from './FeaturesAndServices';
import ImageSlider from './ImageSlider';
import LatestTenders from './LatestTenders';
import OurNetworks from './OurNetworks';

const HomePage= () => {
  return (
    <div className="home">
      <ImageSlider />
      <LatestTenders />
      <FeaturesAndServices />
      <OurNetworks />
    </div>
  );
};

export default HomePage;
