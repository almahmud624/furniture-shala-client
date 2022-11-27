import { Grid, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../Component/Loader";
import { AuthContext } from "../../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }

  if (user?.uid) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
