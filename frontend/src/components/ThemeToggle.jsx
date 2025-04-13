// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Έλεγχος για αποθηκευμένο theme κατά την αρχική φόρτωση
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark'); // Εφαρμόζουμε το dark mode στο body
    } else {
      document.body.classList.remove('dark'); // Εάν δεν είναι dark, αφαιρούμε την κλάση
    }
  }, []);

  // Toggle για την αλλαγή του theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Ενημέρωση του localStorage και του document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 p-0.5 rounded-full border-2 border-gray-400 dark:bg-gray-800 dark:border-gray-600 text-sm"
    >
      {isDarkMode ? (
        <span className="text-white text-sm">🌙</span> // Dark mode icon
      ) : (
        <span className="text-gray-800 text-sm">☀️</span> // Light mode icon
      )}
    </button>
  );
}
