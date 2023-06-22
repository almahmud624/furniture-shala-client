import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Img,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TiTickOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { ImEnlarge } from "react-icons/im";
import ProductModal from "../ProductDetailsModal/ProductModal";
import { useState } from "react";
import WishlistButton from "../WishlistButton/WishlistButton";

const ProductCard = ({ product = {}, setProductInfo, onOpen }) => {
  const {
    productName,
    productImg,
    newPrice,
    oldPrice,
    sellerName,
    sellerVerify,
    location,
    yearsOfUse,
    createdAt,
  } = product;

  const { pathname } = useLocation();
  const isHomePage = pathname === "/home" || pathname === "/";
  const { onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProduct = (product) => {
    setSelectedProduct(product);
  };
  return (
    <>
      <Center pos={"relative"}>
        <Box
          w="full"
          rounded={"sm"}
          overflow={"hidden"}
          bg="white"
          border={"1px"}
          borderColor="gray.800"
          _hover={{ borderColor: "white" }}
          role="group"
          transition={"all .6s"}
        >
          <Flex
            h={"200px"}
            borderBottom={"1px"}
            borderColor="gray.800"
            _groupHover={{ borderColor: "white" }}
            transition={"all .6s"}
            pos={"relative"}
            justify={"center"}
            align={"center"}
          >
            <Img
              src={productImg}
              roundedTop={"sm"}
              objectFit="cover"
              h="full"
              w="full"
              alt={"product Image"}
            />
            {!isHomePage && <WishlistButton product={product} />}
            <Icon
              as={ImEnlarge}
              color={"white"}
              fontSize={"24px"}
              pos={"absolute"}
              cursor={"pointer"}
              transform={"scale(0)"}
              _groupHover={{ transform: "scale(1)" }}
              transition={"all .4s"}
              onClick={() => {
                handleProduct(product);
              }}
              zIndex={10}
            />
            <Box
              pos={"absolute"}
              top={0}
              left={0}
              w={"full"}
              h={"full"}
              bgGradient={"linear(to-b, rgba(0,0,0,0.35), transparent)"}
              _groupHover={{
                bg: "rgba(0,0,0,0.55)",
              }}
              transition={"all .3s"}
              zIndex={7}
            ></Box>
          </Flex>
          <Box p={4}>
            <Box
              bg="gray.800"
              display={"inline-block"}
              px={2}
              py={1}
              color="white"
              mb={2}
            >
              <Text
                fontSize={"xs"}
                fontWeight="medium"
                texttransform={"capitalize"}
              >
                <Text as="del" fontSize={"xs"} color="red.600" pr={1}>
                  ${oldPrice}
                </Text>
                ${newPrice}
              </Text>
            </Box>
            <Heading
              color={"gray.800"}
              fontSize={"xl"}
              noOfLines={isHomePage ? 2 : 1}
              title={productName}
            >
              {productName}
            </Heading>
            {!isHomePage && (
              <>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Seller:{" "}
                  </Text>{" "}
                  {sellerName}
                  {sellerVerify && (
                    <TiTickOutline
                      style={{
                        display: "inline",
                        color: "white",
                        background: "#26A9E2",
                        borderRadius: "50%",
                        marginLeft: "2px",
                      }}
                    />
                  )}
                </Text>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Year of use:{" "}
                  </Text>{" "}
                  {yearsOfUse} year
                </Text>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Location:{" "}
                  </Text>{" "}
                  {location}
                </Text>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Posted On:{" "}
                  </Text>{" "}
                  {createdAt}
                </Text>
              </>
            )}
          </Box>
          <HStack
            color="gray.800"
            _groupHover={{ color: "gray.200" }}
            transition={"color .5s"}
            pos={"relative"}
          >
            <Box
              w={"full"}
              h={"1px"}
              pos={"absolute"}
              top={0}
              left={0}
              bg={"gray.800"}
              _groupHover={{ h: "full" }}
              transition={"height .3s"}
              zIndex={3}
            ></Box>
            <Flex
              p={4}
              py={3}
              alignItems="center"
              justifyContent={"space-between"}
              roundedBottom={"sm"}
              cursor={"pointer"}
              w="full"
              zIndex={10}
              onClick={() => {
                setProductInfo(product);
                onOpen();
              }}
            >
              <Text fontSize={"md"} fontWeight={"semibold"}>
                Order Now
              </Text>
            </Flex>
          </HStack>
        </Box>
      </Center>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          isOpen={true}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default ProductCard;
