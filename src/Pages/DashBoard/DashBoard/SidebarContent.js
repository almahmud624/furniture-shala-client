import React, { useContext } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import NavItem from "./NavItem ";
import { AuthContext } from "../../../Context/AuthProvider";
import useRoleCheck from "../../../Hooks/useRoleCheck";
import useAdminCheck from "../../../Hooks/useAdminCheck";

const SidebarContent = ({ onClose, ...rest }) => {
  const { user } = useContext(AuthContext);
  const [role] = useRoleCheck(user?.email);
  const [admin] = useAdminCheck(user?.email);
  console.log(role);

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
        {admin && (
          <>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/all-sellers"
              onClose={onClose}
            >
              All Selleres
            </NavItem>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/all-buyers"
              onClose={onClose}
            >
              All Buyers
            </NavItem>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/make-admin"
              onClose={onClose}
            >
              Make Admin
            </NavItem>

            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/reported-items"
              onClose={onClose}
            >
              Reported Items
            </NavItem>
          </>
        )}
        {role === "seller" && (
          <>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/add-product"
              onClose={onClose}
            >
              Add Product
            </NavItem>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/my-products"
              onClose={onClose}
            >
              My Products
            </NavItem>

            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/my-buyers"
              onClose={onClose}
            >
              My Buyers
            </NavItem>
          </>
        )}

        {role === "user" && (
          <>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
              path="/dashboard/my-orders"
              onClose={onClose}
            >
              My Orders
            </NavItem>
            <NavItem
              key={Math.random()}
              icon={FiCompass}
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
