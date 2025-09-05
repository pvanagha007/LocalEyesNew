// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // If user is not logged in, redirect to login page
  return currentUser ? children : <Navigate to="/login" />;
}