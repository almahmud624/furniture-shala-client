import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import AllSellers from "../AllSellers/AllSellers";
import MyProducts from "../MyProducts/MyProducts";
import MyOrders from "../MyOrders/MyOrders";

const DashBoardIndex = () => {
  const { role } = useContext(AuthContext);

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
