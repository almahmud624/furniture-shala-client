import React from "react";
import { chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const CustomGradientBtn = ({
  children,
  link,
  customStyle,
  size = ["sm", "md", "lg"],
  action,
  ...rest
}) => {
  return (
    <>
      <chakra.button
        h={12}
        px={6}
        color="#fff"
        size={size}
        fontWeight={"semibold"}
        bgGradient="linear(to-r, #2C74B3, #144272)"
        rounded="sm"
        mb={{ base: 2, sm: 0 }}
        zIndex={5}
        lineHeight={1}
        transition="all 0.5s ease"
        _hover={{
          bgGradient: "linear(to-l, #2C74B3, #144272)",
          transition: "all 0.5s",
        }}
        sx={customStyle}
        onClick={action}
        {...rest}
      >
        {children}
      </chakra.button>
    </>
  );
};

export default CustomGradientBtn;
