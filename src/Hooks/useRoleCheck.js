import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useRoleCheck = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(false);
  const [isRoleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const checkSeller = async () => {
      if (user?.email) {
        try {
          const { data } = await axios.get(
            `https://furniture-shala-server.vercel.app/user/role/${user?.email}`
          );
          setRole(data.role);
          setRoleLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkSeller();
  }, [user]);
  return [role, isRoleLoading];
};

export default useRoleCheck;
