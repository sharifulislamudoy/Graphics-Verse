import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`sticky top-0 z-50 px-4 py-4 md:px-6 flex items-center justify-between w-full relative transition-all duration-300 ${
                scrolled ? "backdrop-blur-md " : "bg-transparent"
            }`}
        >
            {/* Logo */}
            <h1 className="text-4xl font-bold text-[#00332C]">GV.</h1>

            {/* Desktop Menu */}
            <div>
                <div className="hidden md:flex items-center">
                    <div className="hidden md:flex items-center bg-[#DEF29B] px-20 py-3 rounded-full gap-10">
                        <a href="#" className="text-[#FF914D] text-xl">
                            Homepage
                        </a>
                        <a
                            href="#"
                            className="text-black hover:text-[#FF914D] text-xl"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-black hover:text-[#FF914D] text-xl"
                        >
                            Services
                        </a>

                        {/* Experience - replaced Portfolio dropdown */}
                        <a
                            href="#"
                            className="text-black hover:text-[#FF914D] text-xl"
                        >
                            Experience
                        </a>

                        {/* Portfolio - replaced Pages dropdown */}
                        <a
                            href="#"
                            className="text-black hover:text-[#FF914D] text-xl"
                        >
                            Portfolio
                        </a>

                        <a
                            href="#"
                            className="text-black hover:text-[#FF914D] text-xl"
                        >
                            Contact
                        </a>
                    </div>
                    <div>
                        <button className="bg-[#012F2B] text-white px-16 py-3 rounded-full font-semibold hover:bg-[#022721] transition text-xl">
                            Hire Me!
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center bg-[#E2F89D] pr-4 py-1 rounded-full pl-40">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`text-white bg-[#FF7C3E] w-10 h-10 flex items-center justify-center rounded-full text-2xl`}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Animated Mobile Dropdown Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-20 left-0 w-full bg-white shadow-md rounded-md z-50 overflow-hidden"
                    >
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 font-medium text-[#00332C]"
                        >
                            Homepage
                        </motion.a>
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 text-[#00332C]"
                        >
                            About
                        </motion.a>
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 text-[#00332C]"
                        >
                            Services
                        </motion.a>
                        {/* Experience - replaced Portfolio with chevron */}
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 text-[#00332C]"
                        >
                            Experience
                        </motion.a>
                        {/* Portfolio - replaced Pages with chevron */}
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 text-[#00332C]"
                        >
                            Portfolio
                        </motion.a>
                        <motion.a
                            whileHover={{ backgroundColor: "#FF7C3E", color: "#fff" }}
                            href="#"
                            className="block px-6 py-3 text-[#00332C]"
                        >
                            Contact
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;