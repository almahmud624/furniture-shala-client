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
          `http://localhost:4000/products?category=${category}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // get wishlist item
  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["products", "wishlist", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/wishlist/${user?.email}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  let list = {};
  wishlist.map((i) => {
    return (list.id = i.productId);
  });

  // send wishlisted product
  const handleWishList = (product) => {
    const findListedItem = wishlist.find(
      (item) => item.productId === product?._id
    );
    if (findListedItem) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    const wishListItem = {
      productId: product._id,
      productName: product.productName,
      userEmail: user.email,
    };
    axios
      .post(`http://localhost:4000/products/wishlist`, wishListItem)
      .then((res) => {
        console.log(res.data);
        refetch();
      });

    // if (!liked) {
    //   item.wishListed = true;
    //   toast({
    //     title: `Product Add on WishList`,
    //     position: "top",
    //     isClosable: true,
    //     status: "success",
    //   });
    // } else {
    //   item.wishListed = false;
    //   toast({
    //     title: `Product remove from WishList`,
    //     position: "top",
    //     isClosable: true,
    //     status: "success",
    //   });
    // }
  };

  function handleReportedItem(reportItem) {
    const reportedItem = {
      productId: reportItem.productId,
      productName: reportItem.productName,
      reason1: reportItem.reason1 ? "Spammer" : null,
      reason2: reportItem.reason2 ? "Fraud" : null,
      reporterEmail: user.email,
    };
    setReportedItems([reportedItem, ...reportedItems]);
    toast({
      title: `Report successfully done!`,
      position: "top",
      isClosable: true,
      status: "success",
    });
  }
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
          fontWeight="semibold"
          letterSpacing="tight"
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
          textShadow="2px 0 currentcolor"
        >
          Best Products For You
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
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        bg={"red.300"}
                        size={"xs"}
                        _hover={{
                          bg: "red.400",
                        }}
                        disabled={product?.reported}
                      >
                        {product?.reported ? "Reported" : "Report"}
                      </Button>
                    </PopoverTrigger>

                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <form onSubmit={handleSubmit(handleReportedItem)}>
                          <PopoverBody>
                            <Text mb={4} fontWeight={"semibold"}>
                              Why you want to report this seller?
                            </Text>
                            <VisuallyHidden>
                              <Input
                                type="tel"
                                focusBorderColor="teal.400"
                                rounded="md"
                                {...register("productId")}
                                defaultValue={product?._id}
                                readOnly
                              />
                            </VisuallyHidden>
                            <VisuallyHidden>
                              <Input
                                type="text"
                                focusBorderColor="teal.400"
                                rounded="md"
                                {...register("productName")}
                                defaultValue={product?.productName}
                                readOnly
                              />
                            </VisuallyHidden>
                            <CheckboxGroup colorScheme="green">
                              <Stack spacing={[1, 5]} direction={["column"]}>
                                <Checkbox {...register("reason1")}>
                                  Spammer
                                </Checkbox>
                                <Checkbox {...register("reason2")}>
                                  Fraud
                                </Checkbox>
                              </Stack>
                            </CheckboxGroup>
                          </PopoverBody>
                          <PopoverFooter textAlign={"right"}>
                            <Button
                              size={"sm"}
                              colorScheme="teal"
                              type="submit"
                              isLoading={isSubmitting}
                              // onClick={() => handleReportedItem(product?._id)}
                            >
                              Reported
                            </Button>
                          </PopoverFooter>
                        </form>
                      </PopoverContent>
                    </Portal>
                  </Popover>
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
                  {list.id === product?._id ? (
                    <BsHeartFill fill="red" fontSize={"24px"} />
                  ) : (
                    <BsHeart fontSize={"24px"} />
                  )}
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
