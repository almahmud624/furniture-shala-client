import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Component/Loader";
import { AuthContext } from "../../Context/AuthProvider";
import useRoleCheck from "../../Hooks/useRoleCheck";

const PrivateSellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRoleCheck(user?.email);
  const location = useLocation();
  if (loading || isRoleLoading) {
    return <Loader />;
  }

  if (user?.uid && (role === "seller" || role === "user")) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateSellerRoute;
