import React, { useContext, useState } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { BsHeartFill, BsHeart } from "react-icons/bs";

const CategoryProducts = () => {
  const { sellerProducts } = useContext(DataStoreContext);
  const toast = useToast();
  const [liked, setLiked] = useState(false);

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
  const handleReportedItem = (id) => {
    const item = sellerProducts.find((prod) => prod?._id === id);
    item.reported = true;
    toast({
      title: `Reported successfully done!`,
      position: "top",
      isClosable: true,
      status: "success",
    });
  };

  return (
    <Box maxW={"container.lg"} mx={"auto"}>
      <Grid
        templateColumns={["repeat(1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
      >
        {sellerProducts?.map((product, i) => (
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
                  <Text fontSize={"md"} fontWeight={"semibold"}>
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
                    {!product?.reported && (
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverHeader>Are you sure?</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Text>You want to report this seller!!</Text>
                          </PopoverBody>
                          <PopoverFooter textAlign={"right"}>
                            <Button
                              size={"sm"}
                              colorScheme="teal"
                              onClick={() => handleReportedItem(product?._id)}
                            >
                              Reported
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Portal>
                    )}
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
    </Box>
  );
};

export default CategoryProducts;
