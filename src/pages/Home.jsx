import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/Features";
import ServicesSection from "../components/Services";
import TechStackSection from "../components/TechStackSection";

function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <FeatureSection />
      <ServicesSection />
      <TechStackSection />
    </div>
  );
}

export default Home;
