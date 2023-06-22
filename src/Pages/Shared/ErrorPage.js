import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Component/CustomButton";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size={"4xl"}
          bgGradient="linear(to-t, secondary, primary)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2} fontWeight={"semibold"}>
          Something Happend
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>
        <CustomButton text={"Go To Home"} action={() => navigate("/")} />
      </Box>
    </Flex>
  );
};

export default ErrorPage;
