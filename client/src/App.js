// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home";
import BecomeGuide from "./pages/BecomeGuide";
import FindGuide from "./pages/FindGuide";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GuideLogin from "./pages/GuideLogin";
import GuideSignup from "./pages/GuideSignup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/become-guide" element={<BecomeGuide />} />
          <Route path="/find-guide" element={<FindGuide />} />
          
          {/* Tourist routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Guide routes */}
          <Route path="/guide-login" element={<GuideLogin />} />
          <Route path="/guide-signup" element={<GuideSignup />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}