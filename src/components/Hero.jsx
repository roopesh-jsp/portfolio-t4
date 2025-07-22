import React from "react";
import "../index.css";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { FaGithub } from "react-icons/fa";



function Hero() {
  return (
    <section className="hero-section">
      <video autoPlay loop muted className="hero-background-video">
        <source src="/animation2.mp4" type="video/mp4"/>
        {/* You can add more <source> tags for different video formats for broader browser support */}
        Your browser does not support the video tag.
      </video>

     <div className="hero-content">
      <div className="top-logo-container">
        {/* Replace the placeholder div with your img tag */}
        <img src="/t4.png" alt="T4 Solutions Logo" className="logo-image" />
      </div>

        <p className="subtitle">WELCOME TO T4-SOLUTIONS</p>
        <h1 className="title">
          Build Smarter <br></br><span className="highlight-grow">Grow Faster<br></br></span> With <span className="highlight-ai">AI</span>
        </h1>
        <p className="description">WEB SERVICES MADE SIMPLE AND CHEAP</p>
        <button className="book-call-button">
          Book A Free Call <span className="arrow-icon"></span><IoMdCall />

        </button>

        <div className="social-icons">
          {/* Replace with actual social media icons/links */}
          <a href="https://github.com/satishkumar0410" aria-label="X (Twitter)"><span className="icon"><FaGithub /></span></a>
          <a href="https://www.instagram.com/t4_element?utm_source=ig_web_button_share_sheet&igsh=MWEyNmV2cDhvMWtqMQ==" aria-label="Instagram"><span className="icon"><FaInstagram /></span></a>
          <a href="#" aria-label="Facebook"><span className="icon"><FaLinkedin /></span></a>
        </div>
      </div>
      {/* Footer-like elements, assuming they are part of the hero as per image */}
      <div className="bottom-right-fixed">
      </div>
    </section>
  );
}
export default Hero;


