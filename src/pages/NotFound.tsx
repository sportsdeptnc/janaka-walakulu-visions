
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="gradient-text text-6xl md:text-7xl font-bold mb-4">404</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Oops! This page doesn't exist.
          </p>
          <p className="text-gray-500 mb-8">
            The page you're looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          <Link 
            to="/" 
            className="glow-effect inline-block"
          >
            <span className="relative px-6 py-3 bg-white rounded-lg text-primary font-medium">
              Back to Home
            </span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
