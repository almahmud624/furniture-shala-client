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
import WishlistButton from "../WishlistButton/WishlistButton";
import { useNavigate } from "react-router-dom";

const GridItemCard = ({ product }) => {
  const { productName, productImg, newPrice, categories } = product || {};
  const navigate = useNavigate();
  const handleProduct = () => {
    navigate(`/product-details/${product?._id}`);
  };

  return (
    <>
      <GridItem
        key={Math.random()}
        overflow={"hidden"}
        borderBottomWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        border={"1px solid #2D3748"}
        boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
        p={2}
      >
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box w={"full"}>
            <Box w={"full"} h={"250px"} pos={"relative"}>
              <Image
                src={productImg}
                w={"full"}
                h={"full"}
                objectFit={"cover"}
              />
              <WishlistButton product={product} />
              <Box
                w={"full"}
                h={"full"}
                pos={"absolute"}
                top={0}
                bgGradient={"linear(to-b,rgba(0,0,0,0.45),transparent)"}
              ></Box>
            </Box>
          </Box>
          <VStack
            gap={1}
            align={"left"}
            py={3}
            px={3}
            w={"full"}
            minH={"52"}
            justify={"space-between"}
          >
            <Flex flexDir={"column"} gap={2}>
              <Text
                textTransform={"capitalize"}
                fontWeight={"semibold"}
                color={"red.500"}
                display={"inline"}
                w={"fit-content"}
              >
                {categories}
              </Text>
              <Heading size={"lg"} fontSize={"xl"} fontWeight={"semibold"}>
                {productName}
              </Heading>
              <Text fontWeight={"thin"} fontSize={"xl"}>
                ${newPrice}
              </Text>
            </Flex>
            <CustomGradientBtn customStyle={{ h: "10" }} action={handleProduct}>
              Discover Now
            </CustomGradientBtn>
          </VStack>
        </Flex>
      </GridItem>
    </>
  );
};

export default GridItemCard;
