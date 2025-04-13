// // src/components/NavBar.jsx
// import React from "react";
// import ThemeToggle from './ThemeToggle'; // Εισαγωγή του ThemeToggle

// export default function NavBar() {
//   return (
//     <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-xl font-bold text-blue-600">SUMS</div>
//         <ul className="flex space-x-6 text-gray-700 font-medium">
//           <li className="hover:text-blue-500 cursor-pointer">Home</li>
//           <li className="hover:text-blue-500 cursor-pointer">LinkedIn</li>
//           <li className="hover:text-blue-500 cursor-pointer">GitHub</li>
//         </ul>

//         {/* Προσθήκη του ThemeToggle στο Navbar */}
//         <div className="ml-4">
//           <ThemeToggle /> {/* Τοποθέτηση του κουμπιού ThemeToggle */}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import ThemeToggle from './ThemeToggle'; // Εισαγωγή του ThemeToggle
import { useNavigate } from "react-router-dom"; // Εισαγωγή του useNavigate για ανακατεύθυνση

export default function NavBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  // const handleLogout = () => {
  //   // Λογική αποσύνδεσης (θα το διαχειριστείς αργότερα με τον backend)
  //   // Μπορείς να προσθέσεις εδώ τον κώδικα για την αποσύνδεση
  //   navigate("/");
  // };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
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

        {/* Μενού Desktop */}
        <ul className={`hidden lg:flex space-x-6 text-gray-700 font-medium ${isLoggedIn ? 'ml-auto' : ''}`}>
          {isLoggedIn ? (
            <>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/teachers")}>Teachers</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/classes")}>Classes</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/subjects")}>Courses</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/students")}>Students</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => {
                handleLogout();
                navigate("/"); // Προαιρετικό redirect
              }}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</li>
            </>
          )}
        </ul>

        {/* Theme Toggle Button */}
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md p-4">
          <ul className="space-y-4 text-gray-700 font-medium">
            {isLoggedIn ? (
              <>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/teachers")}>Teachers</li>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/classes")}>Classes</li>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/subjects")}>Subjects</li>
                <li className="hover:text-blue-500 cursor-pointer" onClick={handleLogout}>Logout</li>
              </>
            ) : (
              <>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Home</li>
                <li className="hover:text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
