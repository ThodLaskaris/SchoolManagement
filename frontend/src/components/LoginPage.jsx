import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Εισαγωγή του React Spinner

export default function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Παρακολουθεί αν πέτυχε το login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);

    // Προσομοίωση καθυστέρησης (π.χ. ελέγχουμε αν το username και password είναι σωστά)
    setTimeout(() => {
      setLoading(false);
      setError("");
      
      // Εικονικά δεδομένα χρήστη για login (hardcoded)
      const validUsername = "admin";
      const validPassword = "121203";

      if (username === validUsername && password === validPassword) {
        setIsLoggedIn(true);
        setLoginSuccess(true); // Εμφανίζουμε ότι έγινε login επιτυχώς
      } else {
        setError("Invalid username or password!");
      }
    }, 2000); // Προσομοίωση καθυστέρησης 2 δευτερολέπτων
  };

  // Ανακατεύθυνση μόλις γίνει login
  useEffect(() => {
    if (loginSuccess) {
      navigate("/dashboard");
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="container mx-auto text-center mt-20">
      <div className="mt-12">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded-2xl shadow-md w-96 mx-auto"
        >
          <h1 className="text-4xl mb-4">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Username"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Password"
          />

          {loading && (
            <div className="flex justify-center mb-4">
              <ClipLoader color="#2563EB" loading={loading} size={35} />
            </div>
          )}

<button
  type="submit"
  disabled={loading}  // Αν η φόρτωση είναι ενεργή, το κουμπί είναι απενεργοποιημένο
  className={`w-full py-4 text-lg text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none'}`}
>
  {loading ? "Logging In..." : "Log In"}
</button>

        </form>
      </div>
    </div>
  );
}
