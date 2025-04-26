import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

const SlideUpText = ({ text, bottom = "0px", left = "0px", fontSize = "2rem" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
        position: "relative",
        bottom: bottom,
        left: left,
        cursor: "pointer",
        fontSize: fontSize, // Controls text size
        height: `1.2em`, // Adjusts height based on text size
        width: "auto", // Ensures container adapts to text
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Current text that slides up */}
      <motion.div
        initial={{ y: "100%" }}
        animate={hovered ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          display: "inline-block",
          whiteSpace: "nowrap", // Prevents line breaks
        }}
      >
        {text}
      </motion.div>

      {/* New text that slides in from bottom */}
      <motion.div
        initial={{ y: "100%" }}
        animate={hovered ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default SlideUpText;
