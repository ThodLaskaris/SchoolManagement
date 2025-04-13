import React from "react";
import { useNavigate } from "react-router-dom"; // Εισαγωγή του useNavigate για ανακατεύθυνση

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto text-center mt-20">
      {/* Κύριο περιεχόμενο */}
      <p className="text-lg text-gray-600 mb-8">

      </p>

      {/* Block με το μήνυμα και το κουμπί για login */}
      <div className="mt-6 p-8 bg-white rounded-xl shadow-lg w-96 mx-auto">
        <p className="text-lg mb-4">Please log in to access the dashboard.</p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/login')} // Μεταβαίνουμε στη σελίδα login
        >
          Log In
        </button>
      </div>
    </div>
  );
}
