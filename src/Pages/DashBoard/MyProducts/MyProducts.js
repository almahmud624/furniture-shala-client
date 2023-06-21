import React, { useContext, useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";
import Loader from "../../../Component/Loader";
import ConfirmationModal from "../../../Component/ConfirmationModal";
import CustomButton from "../../../Component/CustomButton";

const MyProducts = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handeDeleteProduct = (id) => {
    axios
      .delete(`https://furniture-shala-server.vercel.app/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          onClose();
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
              <Th>Advertise</Th>
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
                <Td textTransform={"capitalize"}>{product?.categories}</Td>
                <Td isNumeric color={"green.600"}>
                  <Text as="del" fontSize={"xs"} color="red.600" pr={1}>
                    ${product?.oldPrice}
                  </Text>
                  ${product?.newPrice}
                </Td>
                <Td textTransform={"capitalize"} color={"green.600"}>
                  {product?.inStock}
                </Td>
                <Td>
                  <CustomButton
                    size={"sm"}
                    action={() => handleAdvertisement(product)}
                    text={
                      product.advertisement ? "Remove Advertise" : "Advertise"
                    }
                  />
                </Td>
                <Td>
                  <CustomButton
                    size={"sm"}
                    action={() => {
                      setSelectedProduct(product);
                      onOpen();
                    }}
                    text={"Remove"}
                    bg="red.600"
                    _hover={{ bg: "red.700" }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        handleAction={handeDeleteProduct}
        targetedId={selectedProduct?._id}
        modalBody={`Are you want to delete ${selectedProduct?.productName}? Before take any action, You have to know that delete item cann't be undone.`}
      />
    </>
  );
};

export default MyProducts;
