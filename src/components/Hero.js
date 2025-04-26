// src/components/Hero.js
import React from "react";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";


const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content upgraded-hero-content">
        <h1 className="first-line fade-in">
          <SplitText text="DIVE INTO" animation="fadeIn" delay={50} />
        </h1>
        <h2 className="second-line fade-in" style={{ animationDelay: "0.3s" }}>
          <SplitText text="THE DATAVERSE!" animation="fadeIn" delay={50} />
        </h2>

        <p className="hero-subtext fade-in" style={{ animationDelay: "0.6s" }}>
        Exploring meaningful insights from {" "}
          <span className="highlight-text">structured chaos</span>
        </p>

        <div className="cta-buttons fade-in" style={{ animationDelay: "1s" }}>
          <a href="#portfolio" className="hero-btn primary">
            View Work
          </a>
          <a href="#contact" className="hero-btn secondary">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
