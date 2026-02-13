import React, { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
<<<<<<< HEAD
        <nav className="px-4 py-4 md:px-6 flex items-center justify-between w-full relative">
=======
        <nav className="py-6 flex items-center justify-between w-11/12 mx-auto relative">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
            {/* Logo */}
            <h1 className="text-5xl font-bold text-[#012F2B]">GV.</h1>

            {/* Desktop Menu */}
            <div>
                <div className="hidden md:flex items-center">
<<<<<<< HEAD
                    <div className="hidden md:flex items-center bg-[#DEF29B]  px-20 py-3 rounded-full gap-10">
                        <a href="#" className="text-[#FF914D] text-xl ">
=======
                    <div className="hidden md:flex items-center bg-[#E2F89D] px-10 py-3 rounded-full gap-10">
                        <a href="#" className="text-[#FF914D] px-5 text-2xl">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                            Homepage
                        </a>
                        <a
                            href="#"
<<<<<<< HEAD
                            className="text-black hover:text-[#FF914D] text-xl"
=======
                            className="text-[#00332C] hover:text-[#FF914D] px-3 text-2xl"
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                        >
                            About
                        </a>
                        <a
                            href="#"
<<<<<<< HEAD
                            className="text-black hover:text-[#FF914D] text-xl"
=======
                            className="text-[#00332C] hover:text-[#FF914D] px-3 text-2xl"
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                        >
                            Services
                        </a>

                        <div className="relative group">
<<<<<<< HEAD
                            <button className="flex items-center gap-1 text-black hover:text-[#FF914D] text-xl">
=======
                            <button className="flex items-center gap-1 text-[#00332C] hover:text-[#FF914D] text-2xl px-3">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                                Portfolio <FiChevronDown />
                            </button>
                            <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-white shadow-md rounded-lg">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Work 1
                                </a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Work 2
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
<<<<<<< HEAD
                            <button className="flex items-center gap-1 text-black hover:text-[#FF914D] text-xl">
=======
                            <button className="flex items-center gap-1 text-[#00332C] hover:text-[#FF914D] text-2xl px-3">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                                Pages <FiChevronDown />
                            </button>
                            <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-white shadow-md rounded-lg">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Page 1
                                </a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                    Page 2
                                </a>
                            </div>
                        </div>

                        <a
                            href="#"
<<<<<<< HEAD
                            className="text-black hover:text-[#FF914D] text-xl"
=======
                            className="text-[#00332C] hover:text-[#FF914D] text-2xl px-3"
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
                        >
                            Contact
                        </a>
                    </div>
                    <div>
<<<<<<< HEAD
                        <button className="bg-[#012F2B] text-white px-16 py-3 rounded-full font-semibold hover:bg-[#022721] transition text-xl">
=======
                        <button className="bg-[#00332C] text-white px-15 py-3 rounded-full font-semibold hover:bg-[#022721] transition text-2xl">
>>>>>>> 3e6011e563fdbd86c6be30d0623d43f6ae7a86e1
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
                        <motion.div className="block px-6 py-3 text-[#00332C] flex items-center gap-1">
                            Portfolio <FiChevronDown />
                        </motion.div>
                        <motion.div className="block px-6 py-3 text-[#00332C] flex items-center gap-1">
                            Pages <FiChevronDown />
                        </motion.div>
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
