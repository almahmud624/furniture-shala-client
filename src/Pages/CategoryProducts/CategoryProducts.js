import React, { useContext, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import FormModal from "../../Component/FormModal";
import { AuthContext } from "../../Context/AuthProvider";
import OrderForm from "../../Component/OrderForm";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

const CategoryProducts = () => {
  const products = useLoaderData();

  const { sellerProducts, setReportedItems, reportedItems } =
    useContext(DataStoreContext);
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

  const handleWishList = (id) => {
    const item = sellerProducts.find((prod) => prod?._id === id);

    if (!liked) {
      item.wishListed = true;
      toast({
        title: `Product Add on WishList`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    } else {
      item.wishListed = false;
      toast({
        title: `Product remove from WishList`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    }
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

  return (
    <Box maxW={"container.lg"} mx={"auto"}>
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
              // boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
              boxShadow={"6px 6px 0 black"}
              _dark={{ boxShadow: "6px 6px 0 cyan" }}
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
                    {product?.categories}
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                  {product?.productName}
                </Heading>
                <Text color={"gray.500"} noOfLines={2}>
                  {product?.description}
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
                    handleWishList(product?._id);
                    setLiked(!liked);
                  }}
                >
                  {product?.wishListed ? (
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
