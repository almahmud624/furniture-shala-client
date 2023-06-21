import React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  Image,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import CustomGradientBtn from "../../Component/CustomGradientBtn";
import sofa1 from "../../Assets/sofa1.png";
const Header = () => {
  return (
    <>
      <Container
        maxW="7xl"
        px={{ base: 2, md: 3 }}
        mt={[5, 10, 16]}
        mb={[0, 0, 36]}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          spacing={36}
        >
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            maxW="8xl"
          >
            <chakra.h1
              fontSize={["2xl", "3xl", "5xl"]}
              lineHeight={1.3}
              fontWeight="bold"
              textAlign="left"
            >
              <chakra.span color="primary">Resale your furniture </chakra.span>
              with <br />
              <chakra.span color="primary">Best Price</chakra.span>
            </chakra.h1>
            <Text
              fontSize={["1em", "1em", "1.1em"]}
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
              <CustomGradientBtn
                link={"/login?role=seller"}
                customStyle={{ zIndex: "40" }}
              >
                Join as a Seller
              </CustomGradientBtn>
            </HStack>
          </Stack>
          <Box ml={{ base: 0, md: 5 }} pos="relative">
            <Box
              height={"500px"}
              // width={"90%"}
              width={"400px"}
              display={["none", "none", "block"]}
              border={"1px solid #2D3748"}
              borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <Image
                w="100%"
                h="100%"
                // minW={{ base: "auto", md: "30rem" }}
                objectFit="cover"
                src={sofa1}
                rounded="md"
                borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
                fallback={<Skeleton />}
                loading="lazy"
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Header;
