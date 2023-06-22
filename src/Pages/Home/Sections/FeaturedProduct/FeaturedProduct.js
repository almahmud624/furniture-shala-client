import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataStoreContext } from "../../../../Context/DataProvider";
import calculatePercentage from "../../../../Utilities/calculatePercentage";
import ProductCoupon from "../ProductCoupon/ProductCoupon";
import FormModal from "../../../../Component/FormModal";
import OrderForm from "../../../../Component/OrderForm";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = () => {
  const { products } = useContext(DataStoreContext);
  const [randomProducts, setRandomProducts] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [coupon, setCoupon] = useState(null);
  const navigate = useNavigate();

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

  const { productName, newPrice, oldPrice, productImg } =
    randomProducts?.[0] || {};

  useEffect(() => {
    selectRandomProducts();
  }, []);

  return (
    <Box mt={{ base: 8, md: 16 }}>
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
      <Flex
        flexDir={{ base: "column", md: "column", lg: "row" }}
        gap={10}
        mt={10}
      >
        <Box
          key={Math.random()}
          bg={"gray.900"}
          w={{ base: "full", md: "50%" }}
          h={{ base: 40, md: 56, lg: 56, "2xl": 64 }}
          pos={"relative"}
        >
          <Flex justify={"space-between"} alignItems={"center"} gap={4}>
            <VStack align={"left"} pl={5} spacing={3} w={"full"}>
              <Heading
                size={{ base: "md", md: "lg" }}
                fontWeight={"semibold"}
                noOfLines={2}
                color="gray.200"
                title={productName}
              >
                {productName}
              </Heading>
              <HStack fontSize={{ base: "md", md: "lg" }}>
                <Text
                  display={"inline"}
                  textDecoration={"line-through"}
                  color={"red.500"}
                >
                  ${oldPrice}
                </Text>
                <Text display={"inline"} color="gray.300">
                  ${newPrice}
                </Text>
              </HStack>
              <Text
                display={"inline"}
                bg={"gray.900"}
                fontFamily={"cursive"}
                color={"primary"}
                fontSize={"lg"}
                w={"fit-content"}
                borderBottomWidth={1}
                borderBottomColor={"primary"}
                cursor={"pointer"}
                transition={"all"}
                transitionDuration={"0.5s"}
                _hover={{
                  color: "green.500",
                  borderBottomColor: "primary",
                }}
                onClick={() => {
                  setProductInfo(randomProducts?.[0]);
                  onOpen();
                  !user?.uid && navigate("/login");
                }}
              >
                Save {calculatePercentage(oldPrice, newPrice)}%
              </Text>
            </VStack>
            <Box
              h={{ base: 40, md: 56, lg: 56, "2xl": 64 }}
              w={"72"}
              flexGrow={1}
            >
              <Image
                src={productImg}
                height={"100%"}
                objectFit={"cover"}
                w={"full"}
              />
            </Box>
          </Flex>
        </Box>
        <ProductCoupon
          product={randomProducts?.[1]}
          onOpen={onOpen}
          setProductInfo={setProductInfo}
          setCoupon={setCoupon}
        />
      </Flex>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        coupon={coupon}
        setCoupon={setCoupon}
      >
        <OrderForm
          productInfo={productInfo}
          onClose={onClose}
          coupon={coupon}
          setCoupon={setCoupon}
        />
      </FormModal>
    </Box>
  );
};

export default FeaturedProduct;
