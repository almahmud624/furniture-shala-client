import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAdminSellerCheck = () => {
  const { role } = useContext(AuthContext);
  const isAdminSeller = role === "admin" || role === "seller";
  return [isAdminSeller, role];
};

export default useAdminSellerCheck;
