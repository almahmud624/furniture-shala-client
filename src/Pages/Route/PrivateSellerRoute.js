import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Component/Loader";
import { AuthContext } from "../../Context/AuthProvider";

const PrivateSellerRoute = ({ children }) => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (user?.uid && (role === "seller" || role === "user")) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateSellerRoute;
