import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  let location = useLocation();

  if (auth.isAuthenticated && location.pathname == "/") {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
