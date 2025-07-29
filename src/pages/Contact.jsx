import React, { useEffect } from "react";
import DevelopersCarousel from "../components/Developers";
import ContactHero from "../components/ContactHero";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <ContactHero />
      <DevelopersCarousel />
    </div>
  );
}

export default Contact;
