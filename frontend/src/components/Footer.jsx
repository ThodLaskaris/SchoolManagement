// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Αν χρησιμοποιείς react-icons

export default function Footer() {
  return (
    <footer className="bg-white shadow-md p-4 flex justify-between items-center">
      <p>&copy; 2025 thodLas. All rights reserved.</p>
      
      {/* Social Links */}
      <div className="space-x-4 flex items-center">
        {/* GitHub Icon */}
        <a href="https://github.com/thodLaskaris" target='blank' className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaGithub className="mr-2" /> GitHub
        </a>

        {/* LinkedIn Icon */}
        <a href="https://linkedin.com/in/thodLaskaris" target='_blank' className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaLinkedin className="mr-2" /> LinkedIn
        </a>
      </div>
    </footer>
  );
}
