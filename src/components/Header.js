import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // <-- New import for Email icon

const socialLinks = [
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/karthirajan07" },
  { icon: <FaGithub />, url: "https://github.com/Karthi-Rajan" },
  { icon: <MdEmail />, url: "https://mail.google.com/mail/?view=cm&to=karthirajan07@gmail.com" }, // <-- Email link (change your email here)
];

const logoVariants = {
  hidden: { rotate: -360, opacity: 0, y: -100 },
  visible: { rotate: 0, opacity: 1, y: 0 },
};

const logoTextVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const socialLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => (
  <header className="site-header">
    {/* Logo Animation */}
    <motion.div
      className="logo-container"
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.img
        src="./assets/logo.png"
        alt="logo"
        className="logo"
        whileHover={{
          rotate: 360,
          transition: { duration: 0.8, ease: "easeInOut" },
        }}
      />
    </motion.div>

    {/* Text Reveal from behind the Logo */}
    <motion.div
      className="logo-text-container"
      variants={logoTextVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, delay: 1 }}
    >
      <span className="logo-text">Karthi Rajan</span>
    </motion.div>

    {/* Social Icons */}
    <motion.nav
      className="social-icons"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 1.8, // Delay until after logo and text animation
          },
        },
      }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
          variants={socialLinkVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{
            scale: 1.3,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.nav>
  </header>
);

export default Header;
