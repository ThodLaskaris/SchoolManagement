import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from './ThemeToggle';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white shadow-md p-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => handleNavigate('/')}>
          SUMS
        </div>

        {/* Toggle για κινητά */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Μενού */}
        <ul className={`hidden lg:flex space-x-6 text-gray-700 font-medium ${isLoggedIn ? 'ml-auto' : ''}`}>
          {isLoggedIn ? (
            <>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/dashboard")}>Dashboard</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/teachers")}>Teachers</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/classes")}>Classes</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/subjects")}>Courses</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/students")}>Students</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => {
                handleLogout();
                handleNavigate("/");
              }}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/")}>Home</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/login")}>Login</li>
            </>
          )}
        </ul>

        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>


      {isOpen && (
  <motion.ul
    initial={{ opacity: 0, y: -20 }}  
    animate={{ opacity: 1, y: 0 }}    
    exit={{ opacity: 0, y: 20 }}     
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="lg:hidden space-y-4 text-gray-700 font-medium shadow-lg bg-white p-4"
  >
    {isLoggedIn ? (
      <>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/dashboard")}>Dashboard</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/teachers")}>Teachers</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/classes")}>Classes</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/subjects")}>Courses</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/students")}>Students</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => {
          handleLogout();
          handleNavigate("/");
        }}>Logout</li>
      </>
    ) : (
      <>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/")}>Home</li>
        <li className="hover:text-blue-500 cursor-pointer" onClick={() => handleNavigate("/login")}>Login</li>
      </>
    )}
  </motion.ul>
)}
    </motion.nav>
  );
}
 