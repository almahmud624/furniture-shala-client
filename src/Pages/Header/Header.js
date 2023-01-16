import React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  Image,
  Skeleton,
  Box,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <div>
      <Container
        maxW="7xl"
        px={{ base: 6, md: 3 }}
        mt={[10, 15, 20]}
        mb={[72, 96, 36]}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            maxW="8xl"
          >
            <chakra.h1
              fontSize={["3xl", "5xl"]}
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Resale your furniture with <br />
              <chakra.span color="green.600">Best Price</chakra.span>
            </chakra.h1>
            <Text
              fontSize="1.2rem"
              textAlign="left"
              lineHeight="1.375"
              fontWeight="400"
              color="gray.500"
            >
              From today resale your furniture and buy best quality of
              furnitures with extra Special offer!!
            </Text>
            <HStack
              spacing={{ base: 0, sm: 2 }}
              mb={{ base: "3rem !important", sm: 0 }}
              flexWrap="wrap"
            >
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="white"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                lineHeight={1}
                bg={"green.600"}
                _hover={{
                  bg: "green.700",
                }}
              >
                <chakra.span> Join as a Seller </chakra.span>
              </chakra.button>
            </HStack>
          </Stack>
          <Box ml={{ base: 0, md: 5 }} pos="relative">
            <Box
              position="absolute"
              left="-45px"
              top="-30px"
              height="full"
              maxW="700px"
              zIndex={-1}
            ></Box>
            <Image
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80`}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Header;
