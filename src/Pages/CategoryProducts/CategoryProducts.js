import React, { useContext, useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { DataStoreContext } from "../../Context/DataProvider";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  Grid,
  useToast,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
  Stack,
  VisuallyHidden,
  Input,
  chakra,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import FormModal from "../../Component/FormModal";
import { AuthContext } from "../../Context/AuthProvider";
import OrderForm from "../../Component/OrderForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Component/Loader";

const CategoryProducts = () => {
  const { category } = useParams();
  const { setReportedItems, reportedItems } = useContext(DataStoreContext);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [liked, setLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productInfo, setProductInfo] = useState();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  // get all category base data
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products?category=${category}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // send wishlisted product
  const handleWishList = (product) => {
    const wishListItem = {
      productId: product._id,
      productName: product.productName,
      userEmail: user.email,
      productImg: product?.productImg,
    };
    axios
      .post(
        `https://furniture-shala-server.vercel.app/products/wishlist`,
        wishListItem
      )
      .then((res) => {
        if (res.data.acknowledged) {
          toast({
            title: `Product Added on My Wishlist!`,
            position: "top",
            isClosable: true,
            status: "success",
          });
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box maxW={"container.lg"} mx={"auto"} px={4} py={24}>
      <Box>
        <chakra.h2
          fontSize={{
            base: "2xl",
            md: "4xl",
          }}
          fontWeight="medium"
          // letterSpacing="tight"
          textAlign={{
            base: "center",
            md: "left",
          }}
          color="gray.900"
          _dark={{
            color: "gray.400",
          }}
          lineHeight={{
            md: "shorter",
          }}
        >
          Best{" "}
          <Text
            display={"inline-block"}
            textTransform={"capitalize"}
            textColor={"#276749"}
          >
            {category}
          </Text>{" "}
          furniture For You
        </chakra.h2>
      </Box>
      <Grid
        templateColumns={["repeat(1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      >
        {products?.map((product) => (
          <Center py={6} key={Math.random()}>
            <Box
              w="full"
              rounded={"sm"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
              bg="white"
              border={"1px"}
              borderColor="black"
              boxShadow={"6px 6px 0 black"}
              _dark={{ boxShadow: "6px 6px 0 green" }}
            >
              <Box h={"200px"} borderBottom={"1px"} borderColor="black">
                <Img
                  src={product?.productImg}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="full"
                  w="full"
                  alt={"product Image"}
                />
              </Box>
              <Box p={4}>
                <Box
                  bg="black"
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
                      ${product?.oldPrice}
                    </Text>
                    ${product?.newPrice}
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                  {product?.productName}
                </Heading>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Seller:{" "}
                  </Text>{" "}
                  {product?.sellerName}
                  {product?.sellerVerify && (
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
                  {product?.yearsOfUse} year
                </Text>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Location:{" "}
                  </Text>{" "}
                  {product?.location}
                </Text>
                <Text color={"gray.500"} noOfLines={2}>
                  <Text display={"inline-block"} fontWeight={"medium"}>
                    Posted On:{" "}
                  </Text>{" "}
                  {product?.createdAt}
                </Text>
              </Box>
              <HStack borderTop={"1px"} color="black">
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor={"pointer"}
                  w="full"
                >
                  <Text
                    fontSize={"md"}
                    fontWeight={"semibold"}
                    onClick={() => {
                      setProductInfo(product);
                      onOpen();
                    }}
                  >
                    Purchase Now
                  </Text>
                </Flex>
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  borderLeft={"1px"}
                  cursor="pointer"
                  onClick={() => {
                    handleWishList(product);
                    // setLiked(!liked);
                  }}
                >
                  <BsHeart fontSize={"24px"} />
                </Flex>
              </HStack>
            </Box>
          </Center>
        ))}
      </Grid>
      <FormModal isOpen={isOpen} onClose={onClose} modalTitle={"demo"}>
        <OrderForm user={user} productInfo={productInfo} onClose={onClose} />
      </FormModal>
    </Box>
  );
};

export default CategoryProducts;
