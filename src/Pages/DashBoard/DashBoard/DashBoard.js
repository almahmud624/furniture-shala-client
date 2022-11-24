import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";

const DashBoard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div></div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
