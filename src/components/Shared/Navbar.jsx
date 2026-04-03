import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-4 md:px-6 flex items-center justify-between w-full relative transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <h1 className="text-4xl font-bold text-[#00332C]">GV.</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center bg-[#DEF29B] px-8 py-3 rounded-full gap-8">
          {["home", "about", "services", "experience", "portfolio", "contact"].map(
            (item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-xl capitalize ${
                  item === "home" ? "text-[#FF914D]" : "text-black hover:text-[#FF914D]"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => scrollToSection("contact")}
          className="bg-[#012F2B] text-white px-10 py-3 rounded-full font-semibold hover:bg-[#022721] transition text-xl"
        >
          Hire Me!
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center bg-[#E2F89D] pr-4 py-1 rounded-full pl-40">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white bg-[#FF7C3E] w-10 h-10 flex items-center justify-center rounded-full text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-white shadow-md rounded-md z-50 overflow-hidden"
          >
            {["home", "about", "services", "experience", "portfolio", "contact"].map(
              (item) => (
                <motion.button
                  key={item}
                  whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-6 py-3 font-medium text-[#00332C] capitalize"
                >
                  {item}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;