import { Box, Flex, SimpleGrid, chakra } from "@chakra-ui/react";
import React, { useContext } from "react";
import CustomGradientBtn from "../../../Component/CustomGradientBtn";
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
            // px={8}
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
                  fontWeight="bold"
                  textAlign={["center", "left"]}
                  lineHeight={{
                    md: "shorter",
                  }}
                >
                  Here some exciting offer for you
                </chakra.h2>
                <chakra.p
                  mb={5}
                  textAlign={["center", "left"]}
                  color="gray.600"
                  _dark={{
                    color: "gray.400",
                  }}
                  fontSize={"16px"}
                >
                  If you are in the market for new furniture, now is a great
                  time to take advantage of an ecommerce furniture site's
                  promotional offer of 20% off. With this offer, you can save
                  big on high-quality furniture pieces for your home. Whether
                  you're looking to furnish your living room, bedroom, dining
                  room, or any other area of your home, this promotion makes it
                  easy and affordable to find exactly what you need.
                </chakra.p>
                <CustomGradientBtn link={"/shop"}>
                  Explore more
                </CustomGradientBtn>
              </Box>
              <Box
                w="full"
                h="100px"
                // py={48}
                bg="gray.200"
                _dark={{
                  bg: "gray.700",
                }}
                mb={[10, 0, 0]}
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
