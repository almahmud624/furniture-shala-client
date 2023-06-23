import { Button, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import useAdminSellerCheck from "../../Hooks/useAdminSellerCheck";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdminSeller, role] = useAdminSellerCheck();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <VStack
        pos={"fixed"}
        bottom={"40px"}
        zIndex={3}
        opacity={0.7}
        right={2}
        w={"fit-content"}
        h={"fit-content"}
        align={"center"}
        display={isVisible ? "block" : "none"}
      >
        {isAdminSeller && (
          <Text
            pos={"absolute"}
            transform={"rotate(90deg)"}
            bottom={20}
            right={{ base: "-77px", md: "-68px" }}
            w={52}
            h={"full"}
            textTransform={"capitalize"}
          >
            {role} Mode Activated
          </Text>
        )}
        <Button
          size={{ base: "sm", md: "md" }}
          rounded={"md"}
          borderWidth={1}
          borderColor={"gray.400"}
          className="btn-scrollTop"
          variant={"solid"}
          onClick={goTop}
        >
          <FaArrowCircleUp />
        </Button>
      </VStack>
    </>
  );
};

export default ScrollToTop;
