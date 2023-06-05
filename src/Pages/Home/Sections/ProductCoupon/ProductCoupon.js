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
import calculatePercentage from "../../../../Utilities/calculatePercentage";
import { Countdown } from "../../../../Component/Countdown";

const ProductCoupon = ({ product }) => {
  const { _id, productName, productImg, newPrice, oldPrice } = product || {};
  const [couponStatus, setCouponStatus] = useState({ _id, status: true });
  return (
    <>
      <Flex gap={5} justify={"space-between"}>
        <Box w={"xl"} h={56} bg={"gray.900"} pos={"relative"}>
          <Flex h={"full"}>
            <Box w={"65%"}>
              <Flex color={"gray.200"} h={"full"} align={"center"}>
                <Box h={"full"} w={72} pr={3}>
                  <Image
                    w={"full"}
                    h={"full"}
                    objectFit={"cover"}
                    src={productImg}
                  />
                </Box>
                <Box pr={3} py={3}>
                  <VStack align={"left"}>
                    <Heading size={"md"} fontWeight={"semibold"}>
                      {productName}
                    </Heading>
                    <Text fontSize={"lg"} color={"green.500"}>
                      {calculatePercentage(oldPrice, newPrice)}% Off
                    </Text>
                  </VStack>
                  <Countdown
                    setCouponStatus={setCouponStatus}
                    couponDuration={60}
                    productId={_id}
                    couponStatus={couponStatus}
                  />
                </Box>
              </Flex>
            </Box>
            <Box
              w={"35%"}
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
                mx={3}
                h={"full"}
                spacing={5}
              >
                <Text fontWeight={""} fontSize={"lg"}>
                  Coupon{" "}
                  <Text
                    as={"span"}
                    color={couponStatus?.status ? "green.500" : "red.500"}
                  >
                    {couponStatus?.status ? "Active" : "Close"}
                  </Text>
                  <Icon as={BsInfoCircle} ml={1} />
                </Text>
                <Text
                  p={3}
                  borderStyle={"dashed"}
                  borderWidth={2}
                  borderColor={"teal.500"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                >
                  Coupen11
                </Text>
                <Button variant={"outline"}>Order Now</Button>
              </VStack>
              <Box
                pos={"absolute"}
                top={"-10%"}
                left={"-8%"}
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
                left={"-8%"}
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
