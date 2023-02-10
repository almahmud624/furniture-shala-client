import React from "react";
import { Outlet } from "react-router-dom";
import CookieConfirmation from "../Component/CookieConfirmation";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar />
      <CookieConfirmation />
      <Outlet />

      <Footer />
    </div>
  );
};

export default Main;
