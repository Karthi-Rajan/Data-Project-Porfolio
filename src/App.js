import React, { Suspense } from "react";
import "./styles/App.css";
import "./styles/Skills.css";
import "./styles/ContactSection.css";
import "./styles/AboutMe.css";
import './styles/Header.css';
import './styles/PortfolioSection.css';
import "./styles/Header.css";
import "./styles/Hero.css";
import Header from "./components/Header";


// Lazy-load components
const Hero = React.lazy(() => import("./components/Hero"));
const AboutMe = React.lazy(() => import("./components/AboutMe"));
const Skills = React.lazy(() => import("./components/Skills"));
const ContactSection = React.lazy(() => import("./components/ContactSection"));
const PortfolioSection = React.lazy(() => import("./components/PortfolioSection"));

// Use React.memo for components that don't need to re-render
const MemoizedContactSection = React.memo(ContactSection);

const App = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
      <div className="background-glow"></div> {/* ✨ Add glow effect here */}
      <Header />
        {/* Hero Section */}
        <section className="hero" id="hero">
  <Suspense fallback={<div>Loading hero...</div>}>
    <Hero />
  </Suspense>
</section>


        <section id="about-me" data-title="About Me">
            <Suspense fallback={<div>Loading About Me...</div>}>
                <AboutMe />
            </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills" data-title="Skills">
          <Suspense fallback={<div>Loading skills...</div>}>
            <Skills />
          </Suspense>
        </section>

        <section id="portfolio" data-title="Portfolio">
        <Suspense fallback={<div>Loading portfolio...</div>}>
            <PortfolioSection />
        </Suspense>
        </section>



        {/* Contact Section */}
        <section id="contact" data-title="Contact Me">
          <MemoizedContactSection />
        </section>
      </div>
    </Suspense>
  );
};

export default App;
