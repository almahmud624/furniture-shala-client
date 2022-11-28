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
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";
import NavItem from "../DashBoard/NavItem ";

const MyOrders = () => {
  const { products } = useContext(DataStoreContext);
  const { user, userSignOut } = useContext(AuthContext);

  // get orders by email
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/orders/${user?.email}`,
          // sent token by headers for authorization
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "furniture-token"
              )}`,
            },
          }
        );
        return data;
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          return userSignOut();
        }
      }
    },
  });

  const filterOrdersProducts = products.map((product) => {
    const matchdProducts = orders.filter(
      (order) => order.productId === product._id
    );
    let matchProduct;
    if (
      matchdProducts[0]?.productName &&
      matchdProducts[0]?.productPrice &&
      matchdProducts[0]?.orderdAt &&
      matchdProducts[0]?._id &&
      product?.productImg
    ) {
      matchProduct = {
        _id: matchdProducts[0]?._id,
        title: matchdProducts[0]?.productName,
        price: matchdProducts[0]?.productPrice,
        date: matchdProducts[0]?.orderdAt,
        paid: matchdProducts[0]?.paid,
        img: product?.productImg,
        productId: matchdProducts[0]?.productId,
      };
    }
    return matchProduct;
  });
  // filter undefined products
  const orderProducts = filterOrdersProducts.filter(
    (orderProduct) => orderProduct !== undefined
  );
  console.log(orders);
  console.log(orderProducts);

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
                <Td color="green.600">{product?.paid ? "Paid" : "unpaid"}</Td>
                {product?.paid ? (
                  <>
                    <Td color="green.600">Order Placed</Td>
                  </>
                ) : (
                  <Td>
                    <NavItem
                      path={`/dashboard/payments/${product?._id}`}
                      display={"inline-block"}
                      py={1}
                      bg="teal.400"
                      color="gray.900"
                      fontWeight={"semibold"}
                      disabled={product?.paid}
                    >
                      Pay
                    </NavItem>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyOrders;
