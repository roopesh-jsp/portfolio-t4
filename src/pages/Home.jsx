import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/Features";
import ServicesSection from "../components/Services";
import TechStackSection from "../components/TechStackSection";
import MiniHotServices from "../components/HotServicesMIni";

function Home() {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <MiniHotServices />
      <ServicesSection />
      <TechStackSection />
    </div>
  );
}

export default Home;
