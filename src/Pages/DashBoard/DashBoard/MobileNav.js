import React from "react";
import { IconButton, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { BsArrowBarRight } from "react-icons/bs";

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <div>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 24 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("transparent", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent="flex-start"
        {...rest}
      >
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<BsArrowBarRight />}
        />

        {/* <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
      </Flex>
    </div>
  );
};

export default MobileNav;
