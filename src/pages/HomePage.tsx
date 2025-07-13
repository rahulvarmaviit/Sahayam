import React from 'react';
import HeroSection from '../components/HeroSection';
import CausesSection from '../components/CausesSection';
import EmergencySection from '../components/EmergencySection';
import DonationSection from '../components/DonationSection';
import ImpactSection from '../components/ImpactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CausesSection />
      <EmergencySection />
      <DonationSection />
      <ImpactSection />
    </>
  );
};

export default HomePage;
