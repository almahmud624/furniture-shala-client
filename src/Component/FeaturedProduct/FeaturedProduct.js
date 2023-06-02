import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import CustomGradientBtn from "../CustomGradientBtn";

const FeaturedProduct = () => {
  const { products } = useContext(DataStoreContext);
  const [randomProducts, setRandomProducts] = useState([]);

  const selectRandomProducts = () => {
    const currentTime = new Date().getTime();
    const lastSelectionTime = localStorage.getItem(
      "furniture_shala_featured_time"
    );
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (
      !lastSelectionTime ||
      currentTime - lastSelectionTime > twentyFourHours
    ) {
      const randomIndexes = [];
      while (randomIndexes.length < 2) {
        const randomIndex = Math.floor(Math.random() * products.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      const selectedProducts = randomIndexes.map((index) => products[index]);
      setRandomProducts(selectedProducts);
      localStorage.setItem(
        "furniture_shala_featured_product",
        JSON.stringify(selectedProducts)
      );
      localStorage.setItem("furniture_shala_featured_time", currentTime);
    } else {
      const storedProducts = JSON.parse(
        localStorage.getItem("furniture_shala_featured_product")
      );
      setRandomProducts(storedProducts);
    }
  };

  useEffect(() => {
    selectRandomProducts();
  }, []);
  console.log(randomProducts);

  return (
    <Box mt={16}>
      <Box>
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
          Today's Featured
        </Heading>
      </Box>
      <Stack direction={{ md: "column", lg: "row" }} spacing={10} mt={10}>
        {randomProducts?.map(
          ({ productName, newPrice, oldPrice, productImg }) => (
            <Box key={Math.random()} bg={"gray.900"} w={"50%"} h={"64"}>
              <Flex justify={"space-between"} alignItems={"center"}>
                <VStack align={"left"} pl={5} spacing={3} w={"full"}>
                  <Heading size={"lg"} fontWeight={"semibold"}>
                    {productName}
                  </Heading>
                  <HStack fontSize={"lg"}>
                    <Text
                      display={"inline"}
                      textDecoration={"line-through"}
                      color={"red.500"}
                    >
                      ${oldPrice}
                    </Text>
                    <Text display={"inline"}>${newPrice}</Text>
                  </HStack>
                  <CustomGradientBtn
                    customStyle={{ width: "fit-content !important" }}
                  >
                    Buy Now
                  </CustomGradientBtn>
                </VStack>
                <Box h={"64"} w={"72"} flexGrow={1}>
                  <Image
                    src={productImg}
                    w={"full"}
                    h={"full"}
                    objectFit={"cover"}
                  />
                </Box>
              </Flex>
            </Box>
          )
        )}
      </Stack>
    </Box>
  );
};

export default FeaturedProduct;
