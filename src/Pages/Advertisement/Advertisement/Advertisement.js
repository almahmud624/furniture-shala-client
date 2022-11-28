import { Box, Button, Flex, SimpleGrid, chakra } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataStoreContext } from "../../../Context/DataProvider";
import AdvertismentCarousel from "../AdvertismentCarousel/AdvertismentCarousel";

const Advertisement = () => {
  const { products } = useContext(DataStoreContext);
  const advertiseItems = products?.filter(
    (product) => product?.advertisement === true
  );

  return (
    <div>
      {advertiseItems.length > 0 && (
        <Flex
          bg="#edf3f8"
          _dark={{
            bg: "#3e3e3e",
          }}
          // p={20}
          w="full"
        >
          <Box
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            px={8}
            py={20}
            mx="auto"
          >
            <SimpleGrid
              alignItems="start"
              columns={{
                base: 1,
                md: 2,
              }}
              mb={24}
              spacingY={{
                base: 10,
                md: 32,
              }}
              spacingX={{
                base: 10,
                md: 24,
              }}
            >
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
                  Here some exciting offer for your
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
                  Super Sale is Live @ 50 % off, Keep Moving... and Buy things.
                  Massive Savings! Less Spending. Exclusive Sale For special
                  Season
                </chakra.p>
                <Button
                  w={{
                    base: "full",
                    sm: "auto",
                  }}
                  size="lg"
                  bg="green.600"
                  _dark={{
                    bg: "green.700",
                  }}
                  _hover={{
                    bg: "green.800",
                    _dark: {
                      bg: "green.600",
                    },
                  }}
                  color="gray.100"
                  as="a"
                >
                  Explore More
                </Button>
              </Box>
              <Box
                w="full"
                h="100px"
                // py={48}
                bg="gray.200"
                _dark={{
                  bg: "gray.700",
                }}
              >
                <AdvertismentCarousel advertiseItems={advertiseItems} />
              </Box>
            </SimpleGrid>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default Advertisement;
