import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHireMe = () => {
    navigate("/contact");
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? " backdrop-blur-xl  border-blue-500/20 shadow-2xl shadow-blue-500/10"
          : "bg-transparent"
      }`}
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-10 w-40 h-40 bg-blue-600/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-10 w-40 h-40 bg-blue-400/20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6  flex items-center justify-between relative">
        {/* Logo */}
        <NavLink to="/" className="">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className=""
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 md:w-18 md:h-18 lg:h-22 lg:w-22 object-contain rounded-xl "
            />
          </motion.div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 ">
          {/* Nav Links Container */}
          <div className="relative  flex items-center gap-2 bg-white/5 border border-gray-500/30 backdrop-blur-xl p-1 rounded-full ">

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-5 py-2 rounded-full text-[17px] font-medium capitalize transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.6,
                        }}
                      />
                    )}

                    {/* Hover Glow */}
                    <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300"></span>

                    <span className="relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Hire Me Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(37,99,235,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHireMe}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hire Me
              <FiArrowRight className="group-hover:translate-x-1 transition duration-300" />
            </span>

            {/* Shine Animation */}
            <span className="absolute top-0 left-[-120%] w-full h-full bg-white/20 skew-x-12 group-hover:left-[120%] transition-all duration-1000"></span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-2xl shadow-lg"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-lg"></div>

            <span className="relative z-10">
              {menuOpen ? <FiX /> : <FiMenu />}
            </span>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="absolute top-24 left-4 right-4 bg-transparent backdrop-blur-xl border border-blue-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.25)] md:hidden"
            >
              {/* Top Glow */}
              <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-blue-700/10 blur-2xl"></div>

              <div className="relative flex flex-col p-5 gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-5 py-4 rounded-2xl capitalize text-lg font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "hover:bg-gradient-to-r from-blue-500 to-blue-600 text-gray-800"
                        }`
                      }
                    >
                      {item.name}
                      <FiArrowRight />
                    </NavLink>
                  </motion.div>
                ))}

                {/* Mobile Hire Me */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHireMe}
                  className="mt-3 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;