// src/pages/GuideSignup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function GuideSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      
      console.log("Attempting signup with:", { email, passwordLength: password.length });
      
      // Create account with Firebase
      await signup(email, password);
      
      console.log("Signup successful!");
      
      // Show success message
      setSuccess(true);
      
      // Redirect to guide login page after 2 seconds
      setTimeout(() => {
        navigate("/guide-login");
      }, 2000);
      
    } catch (error) {
      console.error("Full signup error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      // Handle Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please login instead.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        // Show the actual Firebase error for debugging
        setError(`Failed to create account. Error: ${error.message} (Code: ${error.code})`);
      }
    }
    
    setLoading(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-olive/20 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern - Sage Green with Gold Outlines */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {[...Array(64)].map((_, i) => (
            <div 
              key={i} 
              className="border border-softyellow/30 bg-olive/5 rounded-lg m-1"
            ></div>
          ))}
        </div>
      </div>

      {/* Signup Container */}
      <motion.div 
        className="relative bg-sand shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4 border-2 border-softyellow/20"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl font-bold text-brand">LocalEyes</span>
          </Link>
          <h2 className="text-2xl font-bold text-brand mb-2">Become a Guide</h2>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Account created successfully! Redirecting to login page...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand placeholder-brand/50"
              required
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-olive/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-softyellow focus:border-softyellow bg-white text-brand placeholder-brand/50 pr-12"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand/60 hover:text-brand transition"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-brand/70">
            Already have a guide account?{" "}
            <Link 
              to="/guide-login" 
              className="text-softyellow hover:underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link 
            to="/" 
            className="text-sm text-brand/60 hover:text-brand hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}