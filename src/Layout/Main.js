import { Outlet } from "react-router-dom";
import CookieConfirmation from "../Component/CookieConfirmation";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";
import PageScrollTop from "../Utilities/PageScrollTop.js";

const Main = () => {
  return (
    <PageScrollTop>
      <Navbar />
      <CookieConfirmation />
      <Outlet />
      <Footer />
    </PageScrollTop>
  );
};

export default Main;
