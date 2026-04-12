// src/router.jsx
import { createBrowserRouter, Navigate } from "react-router";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import PortfolioDetail from "../pages/PortfolioDetail";
import ScrollToTop from "../components/Shared/ScrollToTop";
import Portfolio from "../pages/Portfolio";
import AdminLogin from "../components/admin/AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";
import HeroEditor from "../components/admin/HeroEditor";
import AboutEditor from "../components/admin/AboutEditor";
import ServiceDetail from "../pages/ServiceDetail";
import ServicesEditor from "../components/admin/ServicesEditor";
import ExperienceEditor from "../components/admin/ExperienceEditor";
import PortfolioEditor from "../components/admin/PortfolioEditor";

// New page imports
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ExperiencePage from "../pages/ExperiencePage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
  // Public routes (with Navbar/Footer)
  {
    path: "/",
    element: (
      <>
        <Main />
        <ScrollToTop />
      </>
    ),
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "services/:slug", Component: ServiceDetail },
      { path: "experience", Component: ExperiencePage },
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/:slug", Component: PortfolioDetail },
      { path: "contact", Component: ContactPage },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/hero" replace /> },
      { path: "hero", Component: HeroEditor },
      { path: "about", Component: AboutEditor },
      { path: "services", Component: ServicesEditor },
      { path: "experience", Component: ExperienceEditor },
      { path: "portfolio", Component: PortfolioEditor },
    ],
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
]);