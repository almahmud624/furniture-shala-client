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
  PopoverAnchor,
  Button,
  Portal,
  Grid,
  Container,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

const CategoryProducts = () => {
  const { sellerProducts } = useContext(DataStoreContext);
  const [liked, setLiked] = useState(false);
  return (
    <Container maxW={"xl"} centerContent>
      <Grid templateColumns="repeat(3, 1fr)">
        {sellerProducts?.map((product) => (
          <Center py={6}>
            <Box
              w="xs"
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
                    textTransform={"capitalize"}
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
                      >
                        Report
                      </Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Are You Sure?</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Button size={"sm"} colorScheme="blue">
                            Confirm
                          </Button>
                        </PopoverBody>
                        <PopoverFooter>This is the footer</PopoverFooter>
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
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? (
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
    </Container>
  );
};

export default CategoryProducts;
