import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "services", path: "/services" },
    { name: "experience", path: "/experience" },
    { name: "portfolio", path: "/portfolio" },
    { name: "contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHireMe = () => {
    navigate("/contact");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-4 md:px-6 flex items-center justify-between w-full relative transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <NavLink to="/" className="text-4xl font-bold text-[#00332C]">
        GV.
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center bg-[#DEF29B] px-8 py-3 rounded-full gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-xl capitalize ${
                  isActive ? "text-[#FF914D]" : "text-black hover:text-[#FF914D]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <button
          onClick={handleHireMe}
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
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-6 py-3 font-medium capitalize ${
                    isActive
                      ? "bg-[#FF7C3E] text-white"
                      : "text-[#00332C] hover:bg-[#FF7C3E] hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;