import React from "react";
import { chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const CustomGradientBtn = ({
  children,
  link,
  customStyle,
  size = ["sm", "md", "lg"],
}) => {
  return (
    <>
      <chakra.button
        h={12}
        px={6}
        color="#gray.800"
        _dark={{ color: "#ffffff" }}
        size={size}
        fontWeight={"semibold"}
        bgGradient="linear(to-r, #38A169, #0D6D61)"
        rounded="sm"
        mb={{ base: 2, sm: 0 }}
        zIndex={5}
        lineHeight={1}
        transition="all 0.5s ease"
        _hover={{
          bgGradient: "linear(to-l, #38A169, #0D6D61)",
          transition: "all 0.5s",
        }}
        sx={customStyle}
      >
        <Link to={link}> {children} </Link>
      </chakra.button>
    </>
  );
};

export default CustomGradientBtn;
