import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import CustomGradientBtn from "../CustomGradientBtn";

const GridItemCard = ({ product }) => {
  const { productName, productImg, newPrice, categories } = product || {};

  return (
    <>
      <GridItem
        key={Math.random()}
        overflow={"hidden"}
        borderBottomWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box w={"full"}>
            <Box w={"full"} h={"250px"}>
              <Image
                src={productImg}
                w={"full"}
                h={"full"}
                objectFit={"cover"}
              />
            </Box>
          </Box>
          <VStack gap={1} align={"left"} py={3} px={3}>
            <Text
              textTransform={"capitalize"}
              px={3}
              py={1}
              bg={"red.600"}
              display={"inline"}
              w={"fit-content"}
            >
              {categories}
            </Text>
            <Heading size={"lg"} fontSize={"xl"} fontWeight={"semibold"}>
              {productName}
            </Heading>
            <Text fontWeight={"thin"} fontSize={"xl"} fontFamily={"cursive"}>
              ${newPrice}
            </Text>
            <CustomGradientBtn customStyle={{ h: "10" }}>
              Order Now
            </CustomGradientBtn>
          </VStack>
        </Flex>
      </GridItem>
    </>
  );
};

export default GridItemCard;
