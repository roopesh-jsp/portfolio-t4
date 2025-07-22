import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/Features";
import ServicesSection from "../components/Services";

function Home() {
  return (
    <div>
     <Hero /> 
      <FeatureSection />
      <ServicesSection />
    </div>
  );
}

export default Home;
