import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Το email δεν το χρειάζεσαι, μπορείς να το αφαιρέσεις αν δεν το χρησιμοποιείς
    const [error, setError] = useState(""); // Για να εμφανίσουμε σφάλματα αν χρειάζεται
    const [loading, setLoading] = useState(false); // Για να δείξουμε την κατάσταση φόρτωσης
    const [formValid, setFormValid] = useState(true); // Έλεγχος αν η φόρμα είναι έγκυρη
    const navigate = useNavigate(); // Ορισμός του navigate για ανακατεύθυνση

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Έλεγχος αν τα πεδία είναι κενά
        if (!username || !password) {
            setError("All fields are required!");
            setFormValid(false);
            return;
        }

        setLoading(true);

        // Προσομοίωση καθυστέρησης (π.χ. API call)
        setTimeout(() => {
            setLoading(false);
            setError(""); // Καθαρισμός σφάλματος
            setFormValid(true);

            // Εικονικά δεδομένα χρήστη
            const validUsername = "admin";
            const validPassword = "121203";

            // Έλεγχος αν τα δεδομένα που πληκτρολογήθηκαν είναι σωστά
            if (username === validUsername && password === validPassword) {
                // Αποθήκευση του "login state" στο localStorage ή sessionStorage
                localStorage.setItem("isLoggedIn", "true");

                // Ανακατεύθυνση στο Admin Dashboard
                navigate("/admin-dashboard");
            } else {
                setError("Invalid username or password!");
                setFormValid(false);
            }
        }, 2000); // Προσομοίωση 2 δευτερολέπτων
    };

    return (
        <div className="flex justify-center items-center h-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-6 rounded-2xl shadow-md w-96 mb-4 mt-20"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!formValid ? 'border-red-500' : ''}`}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!formValid ? 'border-red-500' : ''}`}
                    />
                </div>

                {loading && (
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full animate-pulse w-full"></div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white rounded-lg hover:bg-blue-700 focus:outline-none ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
        </div>
    );
}
