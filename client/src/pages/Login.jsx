// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      
      // Attempt to login with Firebase
      await login(email, password);
      
      // Redirect to dashboard on success
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle Firebase auth errors with your specified messages
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
        // Keep email, clear password as requested
        setPassword("");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/invalid-credential") {
        // Firebase v9+ uses this for both wrong email/password
        setError("Invalid email or password. Please check your credentials.");
        setPassword("");
      } else {
        setError("Login failed. Please try again.");
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

      {/* Login Container */}
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
          <h2 className="text-2xl font-bold text-brand mb-2">Log In</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
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
                placeholder="Enter your password"
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

          {/* Login Button */}
          <motion.button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-brand/70">
            Not a user?{" "}
            <Link 
              to="/signup" 
              className="text-softyellow hover:underline font-semibold"
            >
              Sign up
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