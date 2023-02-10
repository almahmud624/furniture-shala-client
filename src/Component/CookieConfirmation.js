import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const CookieConfirmation = () => {
  const [cookie, setCookie] = useState(false);
  const handleCookie = () => {
    localStorage.setItem("cookie", true);
    setCookie(true);
  };
  useEffect(() => {
    if (!cookie) {
      setCookie(localStorage.getItem("cookie"));
    }
  }, [cookie]);
  return (
    <>
      <Flex
        position="fixed"
        bottom={-5}
        left={0}
        w={["full", "full", "50%"]}
        zIndex={50}
        px={"10px"}
        display={`${cookie && "none"}`}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"md"}
          boxShadow={"lg"}
          p={[2, 3, 6]}
          my={10}
          backgroundImage={`url('https://img.freepik.com/free-vector/cookie-background-cafe-wallpaper-vector_53876-144624.jpg?w=740&t=st=1675962227~exp=1675962827~hmac=9adfdf233aaa209c5eb853899d7386d069f6fec7a3bd14ae2d2f49f260241519')`}
          backgroundSize="cover"
          filter="auto"
          brightness="80%"
        >
          <Center>
            <Box
              position={"absolute"}
              color={"#7B5647"}
              top={0}
              right={0}
              fontSize={22}
              fontWeight="bold"
              cursor={"pointer"}
            >
              <AiOutlineCloseCircle
                title="Close"
                onClick={() => setCookie(true)}
              />
            </Box>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "2xl", md: "3xl" }}
              color="gray.800"
            >
              Cookies!
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight={"semibold"}
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.600")}
            pb={2}
          >
            We use third party cookies to make your experience better.
          </Center>

          <HStack spacing={6}>
            <Button
              bg={"gray.700"}
              color={"white"}
              _hover={{
                bg: "gray.500",
              }}
              w={"full"}
              size={["sm", "md"]}
            >
              Privacy Policy
            </Button>
            <Button
              bg={"green.600"}
              color={"white"}
              _hover={{
                bg: "green.700",
              }}
              w={"full"}
              onClick={handleCookie}
              size={["sm", "md"]}
            >
              Accept
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </>
  );
};

export default CookieConfirmation;
