import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CookieConfirmation from "../Component/CookieConfirmation";
import Footer from "../Pages/Shared/Footer";
import Navbar from "../Pages/Shared/Navbar";
import useAdminSellerCheck from "../Hooks/useAdminSellerCheck";
import { useToast } from "@chakra-ui/react";
import useCheckOnlineStatus from "../Hooks/useCheckOnlineStatus";

const Main = () => {
  const [isShown, role] = useAdminSellerCheck();
  const isOnline = useCheckOnlineStatus();
  const toast = useToast();
  useEffect(() => {
    if (isShown) {
      toast({
        title: `You're Currently Joined as a ${role}`,
        description: "View only mode activated",
        position: "top",
        isClosable: true,
        status: "warning",
      });
    }
    if (!isOnline) {
      toast({
        title: `You're Currently Offline`,
        description: "Check your internet connection",
        position: "top",
        isClosable: true,
        status: "warning",
        duration: 9000,
      });
    }
  }, [isShown, role, toast, isOnline]);
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
