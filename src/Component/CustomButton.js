import { Button } from "@chakra-ui/react";
import React from "react";

const CustomButton = ({ action, size, rounded, text, ...rest }) => {
  return (
    <>
      <Button
        variant="solid"
        size={size}
        bg="primary"
        color={"gray.300"}
        rounded={rounded}
        _hover={{ bg: "secondary" }}
        transition={"all .3s"}
        onClick={action}
        {...rest}
      >
        {text}
      </Button>
    </>
  );
};

export default CustomButton;
