import axios from "axios";
import { useState, useEffect } from "react";

const useAdminCheck = (email) => {
  const [admin, setAdmin] = useState(false);
  const [isAdminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const checkSeller = async () => {
      if (email) {
        const { data } = await axios.get(
          `http://localhost:4000/user/admin/${email}`
        );
        setAdmin(data.isAdmin);
        setAdminLoading(false);
      }
    };
    checkSeller();
  }, [email]);
  return [admin, isAdminLoading];
};

export default useAdminCheck;
