import React, { useContext } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { FiCompass } from "react-icons/fi";
import NavItem from "./NavItem ";
import { AuthContext } from "../../../Context/AuthProvider";
import useRoleCheck from "../../../Hooks/useRoleCheck";
import useAdminCheck from "../../../Hooks/useAdminCheck";

const SidebarContent = ({ onClose, ...rest }) => {
  const { user } = useContext(AuthContext);
  const [role] = useRoleCheck(user?.email);
  const [admin] = useAdminCheck(user?.email);

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
            Dashboard
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {admin && (
          <>
            <NavItem
              key={Math.random()}
              path="/dashboard/all-sellers"
              onClose={onClose}
            >
              All Sellers
            </NavItem>
            <NavItem
              key={Math.random()}
              path="/dashboard/all-buyers"
              onClose={onClose}
            >
              All Buyers
            </NavItem>
            <NavItem
              key={Math.random()}
              path="/dashboard/make-admin"
              onClose={onClose}
            >
              Make Admin
            </NavItem>
          </>
        )}
        {role === "seller" && (
          <>
            <NavItem
              key={Math.random()}
              path="/dashboard/my-products"
              onClose={onClose}
            >
              My Products
            </NavItem>
            <NavItem
              key={Math.random()}
              path="/dashboard/add-product"
              onClose={onClose}
            >
              Add Product
            </NavItem>
          </>
        )}

        {role === "user" && (
          <>
            <NavItem
              key={Math.random()}
              path="/dashboard/my-orders"
              onClose={onClose}
            >
              My Orders
            </NavItem>
            <NavItem
              key={Math.random()}
              path="/dashboard/my-wishlist"
              onClose={onClose}
            >
              My WishList
            </NavItem>
          </>
        )}
      </Box>
    </div>
  );
};

export default SidebarContent;
