import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import NavItem from "./NavItem ";

const LinkItems = [
  { name: "All Buyers", icon: FiHome, path: "/dashboard/all-buyers" },
  { name: "All Sellers", icon: FiTrendingUp, path: "/dashboard/all-sellers" },
  { name: "Add Product", icon: FiCompass, path: "/dashboard/add-product" },
  { name: "My Products", icon: FiCompass, path: "/dashboard/my-products" },
  { name: "My Buyers", icon: FiCompass, path: "/dashboard/my-buyers" },
  { name: "My Orders", icon: FiCompass, path: "/dashboard/my-orders" },
  { name: "My WishList", icon: FiCompass, path: "/dashboard/my-wishlist" },
  {
    name: "Make Admin",
    icon: FiCompass,
    path: "/dashboard/make-admin",
  },
  {
    name: "Reported Items",
    icon: FiCompass,
    path: "/dashboard/reported-items",
  },
];
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <div>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            key={Math.random()}
            icon={link.icon}
            path={link?.path}
            onClose={onClose}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </div>
  );
};

export default SidebarContent;
