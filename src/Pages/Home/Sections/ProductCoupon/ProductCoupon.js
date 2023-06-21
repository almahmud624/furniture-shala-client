import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Countdown } from "../../../../Component/Countdown";
import { useLocation } from "react-router-dom";

const ProductCoupon = ({ product, onOpen, setProductInfo, setCoupon }) => {
  const { pathname } = useLocation();
  const { _id, productName, productImg, newPrice } = product || {};
  const [couponStatus, setCouponStatus] = useState({ _id, status: true });
  const couponText = pathname === "/coupon" ? "Winter06" : "Coupen11";
  const couponPercentage = pathname === "/coupon" ? "11" : "20";
  return (
    <>
      <Flex gap={5} justify={"space-between"}>
        <Box w={"xl"} h={{ base: 40, md: 56 }} bg={"gray.900"} pos={"relative"}>
          <Flex h={"full"}>
            <Box w={{ base: "60%", md: "65%" }}>
              <Flex color={"gray.200"} h={"full"} align={"center"}>
                <Box
                  h={"full"}
                  w={72}
                  pr={3}
                  display={{ base: "none", md: "inline-block" }}
                >
                  <Image
                    w={"full"}
                    h={"full"}
                    objectFit={"cover"}
                    src={productImg}
                  />
                </Box>
                <Box pr={2} py={3} pl={{ base: 4, md: 0 }}>
                  <VStack align={"left"}>
                    <Heading size={"md"} fontWeight={"semibold"}>
                      {productName}
                    </Heading>
                    <Text
                      fontSize={"lg"}
                      display={{ base: "none", md: "block" }}
                    >
                      ${newPrice}
                    </Text>
                    <Text fontSize={"lg"} color={"green.500"}>
                      Get {couponPercentage}% Off
                    </Text>
                  </VStack>
                  <Countdown
                    setCouponStatus={setCouponStatus}
                    couponDuration={24 * 60 * 60}
                    productId={_id}
                    couponStatus={couponStatus}
                  />
                </Box>
              </Flex>
            </Box>
            <Box
              w={{ base: "40% ", md: "35%" }}
              position={"relative"}
              borderLeftWidth={2}
              borderLeftColor={"gray.500"}
              borderStyle={"dashed"}
              color={"gray.200"}
            >
              <VStack
                justify={"center"}
                align={"left"}
                p={3}
                pr={{ base: 2, md: 3 }}
                mr={{ base: 2, md: 3 }}
                ml={3}
                h={"full"}
                spacing={{ base: 3, md: 5 }}
              >
                <Text fontWeight={""} fontSize={"lg"}>
                  <Text
                    as={"span"}
                    display={{ base: "none", md: "inline-block" }}
                  >
                    Coupon
                  </Text>
                  <Text
                    as={"span"}
                    ml={{ base: 0, md: 2 }}
                    color={couponStatus?.status ? "green.500" : "red.500"}
                  >
                    {couponStatus?.status ? "Active" : "Close"}
                  </Text>
                </Text>
                <Text
                  p={{ base: 1, md: 3 }}
                  borderStyle={"dashed"}
                  borderWidth={2}
                  borderColor={"primary"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  {couponText}
                </Text>
                <Button
                  variant={"outline"}
                  size={{ base: "sm", md: "md" }}
                  borderRadius={"sm"}
                  _hover={{ borderColor: "primary" }}
                  transition={"all .3s"}
                  onClick={() => {
                    setProductInfo(product);
                    setCoupon({ couponText, couponPercentage });
                    onOpen();
                  }}
                >
                  Order Now
                </Button>
              </VStack>
              <Box
                pos={"absolute"}
                top={"-10%"}
                left={{ base: "-11%", md: "-8%" }}
                scale={2}
                w={"8"}
                h={"8"}
                mx={"auto"}
                rounded={"full"}
                bg={"gray.800"}
              ></Box>
              <Box
                pos={"absolute"}
                bottom={"-10%"}
                left={{ base: "-11%", md: "-8%" }}
                scale={2}
                w={"8"}
                h={"8"}
                mx={"auto"}
                rounded={"full"}
                bg={"gray.800"}
              ></Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default ProductCoupon;
