import React from "react";
import {
  Text,
  SimpleGrid,
  Box,
  Image,
  Flex,
  Stack,
  chakra,
} from "@chakra-ui/react";
const statData = [
  {
    id: 1,
    label: "Buyer",
    score: "550",
  },
  {
    id: 2,
    label: "Seller",
    score: "421",
  },
  {
    id: 3,
    label: "Revenue",
    score: "$5M",
  },
];

const SiteOverview = () => {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      py={"24"}
      maxW={"7xl"}
      mx={"auto"}
      px={4}
    >
      <Flex flex={1}>
        <Box w={"xl"} mx={"auto"}>
          <Image
            alt="Cover image"
            objectFit="cover"
            src="https://bit.ly/2k1H1t6"
          />
        </Box>
      </Flex>
      <Flex p={1} flex={1} align="center" justify="center">
        <Flex direction="column">
          <Box>
            <chakra.h2
              mb={4}
              fontSize={{
                base: "2xl",
                md: "4xl",
              }}
              fontWeight="semibold"
              letterSpacing="tight"
              textAlign={{
                base: "center",
                md: "left",
              }}
              color="gray.900"
              _dark={{
                color: "gray.400",
              }}
              lineHeight={{
                md: "shorter",
              }}
              textShadow="2px 0 currentcolor"
            >
              Trusted by Our Clients
            </chakra.h2>
            <chakra.p
              mb={5}
              textAlign={{
                base: "center",
                sm: "left",
              }}
              color="gray.600"
              _dark={{
                color: "gray.400",
              }}
              fontSize={{
                md: "lg",
              }}
            >
              Here our site total overview
            </chakra.p>
          </Box>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 3 }}
            spacing={1}
            mt={12}
            mb={4}
          >
            {statData.map((data) => (
              <Box key={data.id} p={{ base: 2, sm: 5 }} textAlign="center">
                <Text fontWeight="extrabold" fontSize="xx-large">
                  {data.score}
                </Text>
                <Text fontSize="sm">{data.label}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default SiteOverview;
