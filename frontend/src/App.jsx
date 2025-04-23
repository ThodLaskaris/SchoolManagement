// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Χρησιμοποιούμε Routes και Route
import { ToastContainer } from "react-toastify"; // Εισαγωγή του ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Εισαγωγή του CSS για το Toast
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ThemeToggle from './components/ThemeToggle';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import StudentsTable from './components/Students';
import Teachers from './components/Teachers';
import Classes from './components/Classes';
import Subjects from './components/Subjects';
import AdminDashboard from './components/AdminDashboard';
import TeachersTable from './components/Teachers';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Διαχείριση του login status

  // Λειτουργία για Logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Κλείνει τη συνεδρία
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {/* ToastContainer */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          limit={1} 
        />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-8 text-center space-y-1">
          <h1 className="text-4xl  mb-9">Welcome to Students User Management System v1</h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage your students efficiently with our platform.
            {!isLoggedIn && (
              <span className='ml-2 text-lg text-gray-600'>
                Log in to access the full features.
              </span>
            )}
          </p>
          <div className="bg-white p-0 w-42 rounded-2xl shadow-md">
            <p className="text-gray-700">This is a Demo version.</p>
          </div>

          {/* Δρομολόγηση */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/teachers" element={isLoggedIn ? <TeachersTable /> : <Navigate to="/login" />} />
            <Route path="/classes" element={isLoggedIn ? <Classes /> : <Navigate to="/login" />} />
            <Route path="/subjects" element={isLoggedIn ? <Subjects /> : <Navigate to="/login" />} />
            <Route path="/students" element={isLoggedIn ? <StudentsTable /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer>
          <ThemeToggle />
        </Footer>
      </div>
    </Router>
  );
}