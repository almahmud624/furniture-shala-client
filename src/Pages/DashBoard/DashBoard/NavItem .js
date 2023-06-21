import React from "react";

import { Flex, Icon } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({ icon, children, path, onClose, ...rest }) => {
  return (
    <div>
      <NavLink
        to={path}
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "500" : "",
            color: isActive ? "#2C74B3" : "white",
          };
        }}
        _focus={{ boxShadow: "none" }}
        onClick={onClose}
      >
        <Flex
          align="center"
          p="4"
          py={2}
          my={2}
          mx="4"
          borderRadius="md"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "primary",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </NavLink>
    </div>
  );
};

export default NavItem;
