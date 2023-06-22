import axios from "axios";
import { useState, useEffect } from "react";

const useRoleCheck = (email) => {
  const [role, setRole] = useState(false);
  const [isRoleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const checkSeller = async () => {
      if (email) {
        try {
          const { data } = await axios.get(
            `https://furniture-shala-server.vercel.app/user/role/${email}`
          );
          setRole(data.role);
          setRoleLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkSeller();
  }, [email]);
  return [role, isRoleLoading];
};

export default useRoleCheck;
