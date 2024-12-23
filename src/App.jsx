import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Define routes where navbar should not appear
  const routesWithoutNavbar = ['/login', '/signup', '/forgot-password'];
  const shouldShowNavbar = !routesWithoutNavbar.includes(location.pathname);

  // Define routes where footer should appear
  const routesWithFooter = ['/'];
  const shouldShowFooter = routesWithFooter.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <div>
        <ToastContainer />
        <Outlet />
        {shouldShowFooter && <Footer />}
      </div>
    </div>
  );
}

export default App;
