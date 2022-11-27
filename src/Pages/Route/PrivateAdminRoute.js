import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Component/Loader";
import { AuthContext } from "../../Context/AuthProvider";
import useAdminCheck from "../../Hooks/useAdminCheck";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [admin, isAdminLoading] = useAdminCheck(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user?.uid && admin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateAdminRoute;
