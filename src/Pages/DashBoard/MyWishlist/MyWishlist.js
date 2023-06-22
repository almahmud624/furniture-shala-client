import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Button,
  SimpleGrid,
  Box,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { DataStoreContext } from "../../../Context/DataProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider";
import Loader from "../../../Component/Loader";
import NotFound from "../../../Component/NotFound/NotFound";
import FormModal from "../../../Component/FormModal";
import OrderForm from "../../../Component/OrderForm";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const { products } = useContext(DataStoreContext);
  const [productInfo, setProductInfo] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
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

  // find wishlisted products
  const wishlistedProducts = products
    ?.filter((product) => {
      const matchedItem = wishList?.find(
        (item) => item.productId === product._id
      );
      return matchedItem !== undefined;
    })
    .map((product) => {
      const matchedItem = wishList?.find(
        (item) => item.productId === product._id
      );
      return { ...product, wishListedId: matchedItem._id };
    });

  // handle remove wistlist item
  const handleRemoveWishListItem = (id) => {
    axios
      .delete(
        `https://furniture-shala-server.vercel.app/products/wishlist/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Heading
        as="h3"
        size={["lg", "xl", "2xl"]}
        marginBottom={"5"}
        noOfLines={1}
      >
        My WishList
      </Heading>

      {wishlistedProducts?.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} gap={"5"}>
          {wishlistedProducts?.map((product, i) => (
            <Card
              key={product?._id}
              direction={{ base: "row" }}
              overflow="hidden"
              display={"flex"}
              variant="outline"
              maxH={"24"}
            >
              <Box maxW={{ base: "100%", sm: "100px" }}>
                <Image
                  objectFit="cover"
                  w="full"
                  h="full"
                  src={product?.productImg}
                  alt="Caffe Latte"
                />
              </Box>

              <CardBody p={1} ml={1} py={1.5}>
                <HStack align={"center"} justify={"space-between"} mr={2}>
                  <Heading
                    size="sm"
                    fontWeight={"normal"}
                    noOfLines={1}
                    title={product?.productName}
                  >
                    {product?.productName}
                  </Heading>
                  <CloseIcon
                    h={3}
                    w={3}
                    color={"red.500"}
                    cursor={"pointer"}
                    onClick={() =>
                      handleRemoveWishListItem(product?.wishListedId)
                    }
                  />
                </HStack>
                <Text my={1.5}>${product?.newPrice}</Text>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  size={"xs"}
                  borderRadius={3}
                  px={3}
                  onClick={() => {
                    setProductInfo(product);
                    onOpen();
                  }}
                >
                  Buy
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <NotFound
          message={"Wishlist"}
          buttonText={"Go To Shop"}
          link={"/shop"}
        />
      )}
      <FormModal isOpen={isOpen} onClose={onClose}>
        <OrderForm user={user} productInfo={productInfo} onClose={onClose} />
      </FormModal>
    </>
  );
};

export default MyWishlist;
