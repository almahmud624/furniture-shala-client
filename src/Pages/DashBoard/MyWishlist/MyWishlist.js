import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Image,
  Stack,
  Text,
  Button,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DataStoreContext } from "../../../Context/DataProvider";

const MyWishlist = () => {
  const { products } = useContext(DataStoreContext);
  const wishList = products.filter((product) => product?.wishListed === true);

  const handleRemoveWishItem = (product) => {
    product.wishListed = false;
  };

  return (
    <div>
      <Heading
        as="h3"
        size={["lg", "xl", "2xl"]}
        marginBottom={"5"}
        noOfLines={1}
      >
        My WishList
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} gap={"5"}>
        {wishList?.map((product, i) => (
          <Card
            direction={{ base: "row" }}
            overflow="hidden"
            display={"flex"}
            justifyContent={"space-between"}
            variant="outline"
            maxH={"20"}
            key={Math.random()}
          >
            <Flex>
              <Box maxW={{ base: "100%", sm: "200px" }}>
                <Image
                  objectFit="cover"
                  w="full"
                  h="full"
                  src={product?.productImg}
                  alt="Caffe Latte"
                />
              </Box>

              <Stack spacing={"0"}>
                <CardBody p={1} ml={1}>
                  <Heading size="sm" fontWeight={"normal"}>
                    {product?.productName}
                  </Heading>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    size={"xs"}
                    mt={"2.5"}
                    borderRadius={3}
                    px={3}
                  >
                    Buy
                  </Button>
                </CardBody>
              </Stack>
            </Flex>
            <Box alignItems={"center"}>
              <Text>
                <CloseIcon
                  fontSize={"xs"}
                  mr={"2"}
                  color={"gray.500"}
                  onClick={() => handleRemoveWishItem(product)}
                  cursor={"pointer"}
                />
              </Text>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MyWishlist;
