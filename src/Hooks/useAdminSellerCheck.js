import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useRoleCheck from "./useRoleCheck";

const useAdminSellerCheck = () => {
  const { user } = useContext(AuthContext);
  const [role, isRoleLoading] = useRoleCheck(user?.email);
  const isShown = role === "admin" || role === "seller";
  return [isShown, role];
};

export default useAdminSellerCheck;
