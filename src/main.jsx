import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'swiper/css/bundle';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/head/Home.jsx";
import Login from "./pages/Auth/login/Login.jsx";
import Signup from "./pages/Auth/signup/Signup.jsx";
import ForgotPassword from "./pages/Auth/forgot/Forgot.jsx";
import Account from "./pages/account/Account.jsx";
import Error from "./pages/error/Error.jsx";
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import Faq from "./pages/FAQ's/Faq.jsx";
import Terms from "./pages/terms/Terms.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy.jsx";
import Booking from "./pages/booking/Booking.jsx";
import BookingDetails from "./pages/booking/BookingDetails.jsx";
import Category from "./pages/category/Category.jsx";
import Cart from "./pages/cart/Cart.jsx";
import SearchResults from './pages/search/SearchResults';
import CheckOut from "./pages/checkout/CheckOut.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes without navbar */}
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Route>

      {/* Main routes with navbar */}
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/service/category" element={<Category />} />
        <Route path="/service/category/:id" element={<Category />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Error />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
