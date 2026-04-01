import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import PortfolioDetail from "../pages/PortfolioDetail";
import ScrollToTop from "../components/Shared/ScrollToTop";
import Portfolio from "../pages/Portfolio";


export const router = createBrowserRouter([
  {
    path: "/",
    element:(
      <>
        <Main />
        <ScrollToTop />
      </>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/portfolio',
        Component: Portfolio
      },
      {
        path: "portfolio/:slug",
        Component: PortfolioDetail,
      },
    ],
  },
]);