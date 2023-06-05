import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataStoreContext } from "../../../../Context/DataProvider";
import CustomGradientBtn from "../../../../Component/CustomGradientBtn";
import calculatePercentage from "../../../../Utilities/calculatePercentage";
import ProductModal from "../../../../Component/ProductDetailsModal/ProductModal";

const ProductsGrid = () => {
  return (
    <>
      <Box my={20}>
        <Grid
          h="fit-content"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={2}>
            <ProductGridItem
              prodcutIndex={8}
              imageHeight={"md"}
              contentPosition={"auto"}
              bgGradientDir={"to-r"}
              priceText={true}
            />
          </GridItem>
          <GridItem rowSpan={2} colSpan={2}>
            <ProductGridItem
              prodcutIndex={9}
              imageHeight={"md"}
              contentPosition={"0"}
              bgGradientDir={"to-t"}
              priceText={true}
            />
          </GridItem>
          <GridItem colSpan={2} h={""}>
            <ProductGridItem
              prodcutIndex={11}
              imageHeight={"52"}
              contentPosition={"auto"}
              bgGradientDir={"to-r"}
              pricePercentage={true}
            />
          </GridItem>
          <GridItem colSpan={2} h={""}>
            <ProductGridItem
              prodcutIndex={12}
              imageHeight={"52"}
              contentPosition={"0"}
              bgGradientDir={"to-t"}
              pricePercentage={"true"}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

const ProductGridItem = ({
  prodcutIndex,
  imageHeight,
  contentPosition,
  bgGradientDir,
  priceText,
  pricePercentage,
}) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products } = useContext(DataStoreContext);
  // get featured product from local db
  const featuredProduct = JSON.parse(
    localStorage.getItem("furniture_shala_featured_product")
  );
  // remove featured product from main products list
  const restProducts = products?.filter(
    ({ _id }) => !featuredProduct?.some((item) => item?._id === _id)
  );
  const { productName, productImg, newPrice, oldPrice } =
    restProducts?.[prodcutIndex] || {};

  const handleProduct = () => {
    setSelectedProduct(restProducts?.[prodcutIndex] || {});
    onOpen();
  };
  return (
    <>
      <Box pos={"relative"} overflow={"hidden"} h={"full"}>
        <Box
          w={"full"}
          h={"full"}
          pos={"absolute"}
          top={0}
          left={0}
          objectFit={"cover"}
          bgGradient={`linear(${bgGradientDir},gray.800,transparent)`}
        ></Box>
        <HStack>
          <Box h={imageHeight} w={"full"}>
            <Image src={productImg} objectFit={"cover"} w={"full"} h={"full"} />
          </Box>

          <VStack
            alignItems={"left"}
            pos={"absolute"}
            bottom={contentPosition}
            left={0}
            p={2}
          >
            <Heading size={"md"} fontSize={28} fontWeight={"semibold"}>
              {productName}
            </Heading>
            {priceText && (
              <Text fontSize={20} fontWeight={"thin"}>
                from ${newPrice}
              </Text>
            )}
            {pricePercentage && (
              <Text fontSize={20} fontWeight={"thin"}>
                up to {calculatePercentage(oldPrice, newPrice)}% off
              </Text>
            )}
            <CustomGradientBtn
              action={handleProduct}
              size={"md"}
              customStyle={{
                h: 10,
                fontSize: "sm",
                w: "fit-content",
              }}
            >
              Discover Now
            </CustomGradientBtn>
          </VStack>
        </HStack>
      </Box>
      <ProductModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductsGrid;
