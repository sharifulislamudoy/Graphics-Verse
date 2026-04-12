// src/components/admin/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router";

const sections = [
    { label: "Hero", path: "hero" },      // relative to /admin
    { label: "About", path: "about" },
    { label: "Services", path: "services" },
    { label: "Experience", path: "experience" },
    { label: "Portfolio", path: "portfolio" },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        navigate("/admin/login");
    };

    return (
        <div className="h-full bg-[#022F2B] text-white flex flex-col py-8 px-4">
            <div className="mb-10 px-2">
                <h2 className="text-xl font-bold text-[#FF7536]">GraphicVerse</h2>
                <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
                {sections.map((section) => (
                    <NavLink
                        key={section.path}
                        to={section.path}
                        className={({ isActive }) =>
                            `px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                ? "bg-[#FF7536] text-white"
                                : "text-gray-300 hover:bg-white/10"
                            }`
                        }
                    >
                        {section.label}
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className="mt-auto px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-xl text-left transition-all"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;