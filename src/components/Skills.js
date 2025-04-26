import React, { useRef, useState, useEffect } from "react";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard"; // Import TiltedCard component

const SkillsSection = () => {
  const skills = [
    { imageSrc: "./assets/PBI.png", captionText: "Power BI", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/SQL.png", captionText: "SQL", progressBarValue: 60, leveltext: "Expertise" },
    { imageSrc: "./assets/PYTHON.png", captionText: "Python", progressBarValue: 50, leveltext: "Expertise" },
    { imageSrc: "./assets/EXCEL.png", captionText: "Excel", progressBarValue: 80, leveltext: "Expertise" },
    { imageSrc: "./assets/BIG QUERY.png", captionText: "Big QUERY", progressBarValue: 40, leveltext: "Expertise" },
    { imageSrc: "./assets/DATABRICKS.png", captionText: "DataBricks", progressBarValue: 40, leveltext: "Expertise" },
    
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("IntersectionObserver Triggered: ", entry.isIntersecting); // Debug log
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible state to true
        }
      },
      { threshold: 0.2 } // Trigger animation when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Clean up observer
      }
    };
  }, []);

  return (
    <section
      className={`skills-section ${isVisible ? "animate" : ""}`}
      ref={sectionRef}
    >
      <div className="skills-container-wrapper">
        <div className="skills-container">
          {skills.map((skill, index) => (
            <TiltedCard
              key={index}
              imageSrc={skill.imageSrc}
              captionText={skill.captionText}
              progressBarValue={skill.progressBarValue}
              containerHeight="200px"
              containerWidth="200px"
              scaleOnHover={1.1}
              rotateAmplitude={14}
              displayOverlayContent={true}
              overlayContent={<div>{skill.leveltext}</div>}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
