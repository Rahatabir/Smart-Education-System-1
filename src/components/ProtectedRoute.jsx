import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("studentUser");
  return user ? children : <Navigate to="/student-login" />;
}
