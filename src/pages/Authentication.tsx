import React, { useState } from "react";
import { auth, provider } from "../auth/Config.js";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { BiErrorCircle } from "react-icons/bi";

interface AuthenticationProps {
  onSignIn: (email: string) => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onSignIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    setError("");
    try {
      const data: UserCredential = await signInWithPopup(auth, provider);
      const user = data.user;
  
      if (user) {
        onSignIn(user.email || "", user.displayName, user.photoURL);
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
      console.error("Error during sign-in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transition-all">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <BiErrorCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 border-gray-200 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <ImSpinner8 className="h-5 w-5 animate-spin text-indigo-600" />
            ) : (
              <>
                <FcGoogle className="h-5 w-5 mr-2" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Need help?
              </a>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Authentication;
