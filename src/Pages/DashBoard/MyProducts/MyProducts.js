import React, { useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Image,
  Text,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import Loader from "../../../Component/Loader";

const MyProducts = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const toast = useToast();

  const {
    data: sellerProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products/${user?.email}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleAdvertisement = (product) => {
    axios
      .patch(
        `https://furniture-shala-server.vercel.app/products/${product?._id}`,
        product.advertisement
          ? {
              advertisement: false,
              updateSet: "advertisement",
            }
          : {
              advertisement: true,
              updateSet: "advertisement",
            },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("furniture-token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        if (res.data.modifiedCount > 0) {
          if (!product.advertisement) {
            toast({
              title: `Advertisement added`,
              position: "top",
              isClosable: true,
              status: "success",
            });
          } else {
            toast({
              title: `Advertisement removed`,
              position: "top",
              isClosable: true,
              status: "success",
            });
          }
          refetch();
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          return userSignOut();
        }
      });
  };
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
        My Product
      </Heading>
      <TableContainer>
        <Table variant="simple" bg={"gray.300"} _dark={{ bg: "gray.800" }}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sellerProducts?.map((product, i) => (
              <Tr key={Math.random()}>
                <Box w="12" h="12">
                  <Image
                    src={product?.productImg}
                    w="full"
                    h="full"
                    objectFit={"cover"}
                    p={"1"}
                    rounded={"2xl"}
                  />
                </Box>
                <Td>{product?.productName}</Td>
                <Td>{product?.categories}</Td>
                <Td isNumeric color="green.600">
                  <Text as="del" fontSize={"xs"} color="red.600" pr={1}>
                    ${product?.oldPrice}
                  </Text>
                  ${product?.newPrice}
                </Td>
                <Td color="green.600" style={{ textTransform: "capitalize" }}>
                  {product?.inStock}
                </Td>
                <Td>
                  <Button
                    bg="teal.600"
                    size="sm"
                    onClick={() => handleAdvertisement(product)}
                  >
                    {product.advertisement ? "Remove Advertise" : "Advertise"}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyProducts;
