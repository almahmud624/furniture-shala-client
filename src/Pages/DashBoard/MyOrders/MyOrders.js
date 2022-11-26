import React, { useContext } from "react";
import { DataStoreContext } from "../../../Context/DataProvider";
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
  Box,
} from "@chakra-ui/react";

const MyOrders = () => {
  const { orders, sellerProducts } = useContext(DataStoreContext);
  const filterOrdersProducts = sellerProducts.map((product) => {
    const matchdProducts = orders.filter(
      (order) => order.productId === product._id
    );
    let matchProduct;
    if (
      matchdProducts[0]?.productName &&
      matchdProducts[0]?.productPrice &&
      matchdProducts[0]?.orderdAt &&
      product?.productImg
    ) {
      matchProduct = {
        title: matchdProducts[0]?.productName,
        price: matchdProducts[0]?.productPrice,
        date: matchdProducts[0]?.orderdAt,
        img: product?.productImg,
      };
    }
    return matchProduct;
  });
  // filter undefined products
  const orderProducts = filterOrdersProducts.filter(
    (orderProduct) => orderProduct !== undefined
  );
  console.log("seller products", sellerProducts);
  console.log("orders products", orders);
  console.log("filters products", orderProducts);

  return (
    <div>
      <Heading
        as="h3"
        size={["lg", "xl", "2xl"]}
        marginBottom={"5"}
        noOfLines={1}
      >
        My Orders
      </Heading>
      <TableContainer>
        <Table variant="simple" bg={"gray.300"} _dark={{ bg: "gray.800" }}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Title</Th>
              <Th isNumeric>Price</Th>
              <Th>Order Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderProducts?.map((product) => (
              <Tr key={Math.random()}>
                <Box w="12" h="12">
                  <Image
                    src={product?.img}
                    w="full"
                    h="full"
                    p={"1"}
                    rounded={"2xl"}
                    objectFit="cover"
                  />
                </Box>
                <Td>{product?.title}</Td>

                <Td isNumeric color="green.600">
                  ${product?.price}
                </Td>
                {}
                <Td color="green.600">{product?.date}</Td>
                <Td color="green.600">unpaid</Td>
                <Td>
                  <Button bg="teal.600" size="sm">
                    Pay
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

export default MyOrders;
