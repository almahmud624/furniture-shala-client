import React from "react";

import { Flex, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, children, path, onClose, ...rest }) => {
  return (
    <div>
      <Link
        to={path}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        onClick={onClose}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.700",
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
      </Link>
    </div>
  );
};

export default NavItem;
