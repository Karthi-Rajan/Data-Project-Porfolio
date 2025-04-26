import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const SlideDownText = ({ text, top = "0px", left = "0px" }) => {
  const ref = useRef(null); // Create a reference for the text element
  const isInView = useInView(ref, { once: true, margin: "-100px 0px 0px 0px" }); 

  return (
    <div
      ref={ref} // Attach the ref to track visibility
      style={{
        overflow: "hidden",
        display: "inline-block",
        position: "relative",
        top: top,
        left: left,
      }}
    >
      <motion.div
        initial={{ y: "-100%" }} // Starts off-screen
        animate={isInView ? { y: "0%" } : { y: "-100%" }} // Animates only when visible
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "relative",
          top: 0,
          left: 0,
          display: "inline-block",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default SlideDownText;
