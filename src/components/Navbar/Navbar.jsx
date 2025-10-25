import React, { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="px-4 py-3 md:px-10 flex items-center justify-between max-w-6xl mx-auto">
            {/* Logo */}
            <h1 className="text-4xl font-bold text-[#00332C]">GV.</h1>

            {/* Desktop Menu */}
            <div>
                <div className="hidden md:flex items-center">
                    <div className="hidden md:flex items-center bg-[#E2F89D] px-10 py-3 rounded-full gap-10">
                        <a href="#" className="text-[#FF914D] font-semibold">
                            Homepage
                        </a>
                        <a href="#" className="text-[#00332C] hover:text-[#FF914D] font-semibold">
                            About
                        </a>
                        <a href="#" className="text-[#00332C] hover:text-[#FF914D] font-semibold">
                            Services
                        </a>

                        <div className="relative group">
                            <button className="flex items-center gap-1 text-[#00332C] hover:text-[#FF914D] font-semibold">
                                Portfolio <FiChevronDown />
                            </button>
                            <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-white shadow-md rounded-md">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Work 1</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Work 2</a>
                            </div>
                        </div>

                        <div className="relative group">
                            <button className="flex items-center gap-1 text-[#00332C] hover:text-[#FF914D] font-semibold">
                                Pages <FiChevronDown />
                            </button>
                            <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-white shadow-md rounded-md">
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Page 1</a>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Page 2</a>
                            </div>
                        </div>

                        <a href="#" className="text-[#00332C] hover:text-[#FF914D] font-bold">
                            Contact
                        </a>
                    </div>
                    <div>
                        <button className="bg-[#00332C] text-white px-15 py-3 rounded-full font-semibold hover:bg-[#022721] transition">
                            Hire Me!
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center bg-[#E2F89D] pr-4 py-1 rounded-full pl-60">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`text-white bg-[#FF7C3E] w-10 h-10 flex items-center justify-center rounded-full text-2xl`}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white shadow-md rounded-md z-50">
                    <a
                        href="#"
                        className="block bg-[#FF7C3E] text-white px-6 py-3 rounded-t-md font-medium"
                    >
                        Homepage
                    </a>
                    <a href="#" className="block px-6 py-3 text-[#00332C]">
                        About
                    </a>
                    <a href="#" className="block px-6 py-3 text-[#00332C]">
                        Services
                    </a>
                    <div className="block px-6 py-3 text-[#00332C] flex items-center gap-1">
                        Portfolio <FiChevronDown />
                    </div>
                    <div className="block px-6 py-3 text-[#00332C] flex items-center gap-1">
                        Pages <FiChevronDown />
                    </div>
                    <a href="#" className="block px-6 py-3 text-[#00332C]">
                        Contact
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
