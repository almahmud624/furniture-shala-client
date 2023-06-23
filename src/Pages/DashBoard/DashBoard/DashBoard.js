import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import SidebarContent from "./SidebarContent";
import MobileNav from "./MobileNav";
import useDynamicTitle from "../../../Hooks/useDynamicTitle";

const DashBoard = ({ children }) => {
  useDynamicTitle("Dashboard");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />

        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />

        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>

        {/* mobilenav */}
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4" zIndex={50}>
          {/* here all dashboard content */}
          {children} <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default DashBoard;
