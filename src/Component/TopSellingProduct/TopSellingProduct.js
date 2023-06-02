import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import CustomGradientBtn from "../CustomGradientBtn";
import { DataStoreContext } from "../../Context/DataProvider";

const TopSellingProduct = () => {
  const { orders } = useContext(DataStoreContext);
  console.log(orders);

  return (
    <Box mt={20}>
      <Heading
        mb={4}
        fontSize={{
          base: "2xl",
          md: "5xl",
        }}
        fontWeight="bold"
        textAlign={"left"}
        lineHeight={{
          md: "shorter",
        }}
      >
        Top Selling Products
      </Heading>
      <Grid templateColumns={"repeat(2,1fr)"} gap={7} mt={10}>
        {[1, 2, 3, 4]?.map((i) => (
          <GridItem borderWidth={2} p={5}>
            <Flex gap={7}>
              <Box w={"250px"}>
                <Image
                  src={
                    "https://i.ibb.co/CBzJTGf/dcb15084-a196-4bc5-96db-f9afc19354d8-1-a69c3054a6d253269deb1e0abfecc365.jpg"
                  }
                  w={"full"}
                  h={"full"}
                  objectFit={"cover"}
                />
              </Box>
              <VStack gap={3} align={"left"}>
                <Heading size={"lg"} fontWeight={"semibold"}>
                  Title 01
                </Heading>
                <Text>Price</Text>
                <CustomGradientBtn>Order Now</CustomGradientBtn>
              </VStack>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default TopSellingProduct;
