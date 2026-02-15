import { useEffect } from "react";
import ContactHero from "../components/ContactHero";

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <ContactHero />
    </div>
  );
}

export default Contact;
