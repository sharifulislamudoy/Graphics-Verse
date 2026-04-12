// src/components/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - fixed on desktop, slide-in on mobile */}
      <div
        className={`fixed top-0 left-0 z-30 h-full w-64 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content - offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Mobile topbar */}
        <div className="lg:hidden bg-[#022F2B] px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl leading-none"
          >
            ☰
          </button>
          <span className="text-white font-bold text-lg">Admin Panel</span>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;