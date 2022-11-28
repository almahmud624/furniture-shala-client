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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider";
import Loader from "../../../Component/Loader";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);

  const {
    data: wishList = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", "wishlist", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products/wishlist/${user?.email}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }
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
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MyWishlist;
