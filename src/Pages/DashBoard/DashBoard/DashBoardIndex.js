import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import useAdminSellerCheck from "../../../Hooks/useAdminSellerCheck";
import AllSellers from "../AllSellers/AllSellers";
import MyProducts from "../MyProducts/MyProducts";
import MyOrders from "../MyOrders/MyOrders";

const DashBoardIndex = () => {
  const { user } = useContext(AuthContext);
  const [isShown, role] = useAdminSellerCheck(user?.email);

  switch (role) {
    case "admin":
      return <AllSellers />;
    case "seller":
      return <MyProducts />;
    default:
      return <MyOrders />;
  }
};

export default DashBoardIndex;
