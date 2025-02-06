import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PaginatedCountries from "./pages/PaginatedCountries.tsx";
import ChatAssistant from "./components/ChatAssistant.tsx";
import Authentication from "./pages/Authentication.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface UserProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignIn = (
    email: string,
    displayName: string | null,
    photoURL: string | null
  ) => {
    const userProfile = { email, displayName, photoURL };
    setUser(userProfile);
    localStorage.setItem("user", JSON.stringify(userProfile));
    setShowModal(true); 
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <header className="p-4 bg-indigo-600 text-white flex justify-between items-center">
              <h1 className="text-xl font-bold">Country Portal</h1>
              <button
                onClick={handleSignOut}
                className="px-4 py-2  text-white rounded-lg hover:bg-indigo-900"
              >
                Sign Out
              </button>
            </header>

            <main className="p-4">
              <Routes>
                <Route path="/" element={<PaginatedCountries />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>

            <ChatAssistant />

            <AnimatePresence>
              {showModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
                  >
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                    <div className="text-center">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/100"}
                        alt="User Profile"
                        className="w-20 h-20 rounded-full shadow-md border mx-auto"
                      />
                      <h2 className="text-2xl font-bold text-gray-800 mt-4">
                        {user.displayName || "User"}
                      </h2>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Authentication onSignIn={handleSignIn} />
        )}
      </div>
    </Router>
  );
}

export default App;
