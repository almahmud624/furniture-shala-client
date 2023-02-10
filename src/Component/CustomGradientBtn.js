import React from "react";
import { chakra } from "@chakra-ui/react";
const CustomGradientBtn = ({ children }) => {
  return (
    <>
      <chakra.button
        w={{ base: "100%", sm: "auto" }}
        h={12}
        px={6}
        color="#gray.800"
        _dark={{ color: "#ffffff" }}
        size={["sm", "md", "lg"]}
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
      >
        <chakra.span> {children} </chakra.span>
      </chakra.button>
    </>
  );
};

export default CustomGradientBtn;
