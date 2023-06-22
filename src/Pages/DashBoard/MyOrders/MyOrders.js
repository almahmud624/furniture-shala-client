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
  Box,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../../../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";
import NotFound from "../../../Component/NotFound/NotFound";
import CustomButton from "../../../Component/CustomButton";
import { useNavigate } from "react-router-dom";
import { sortLatestItem } from "../../../Utilities/sortLatestItem";

const MyOrders = () => {
  const { products } = useContext(DataStoreContext);
  const { user, userSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const filterOrdersProducts = orders?.map((order) => {
    const product = products?.find(
      (product) => product?._id === order?.productId
    );
    return {
      _id: order?._id,
      title: order?.productName,
      price: order?.productPrice,
      createdAt: order?.orderdAt,
      paid: order?.paid,
      img: product?.productImg,
      productId: order?.productId,
    };
  });

  // filter undefined products
  const orderProducts = filterOrdersProducts.filter(
    (orderProduct) => orderProduct !== undefined
  );

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
      {orderProducts?.length > 0 ? (
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
              {sortLatestItem(orderProducts)?.map((product) => (
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

                  <Td isNumeric>${product?.price}</Td>
                  {}
                  <Td>{product?.createdAt}</Td>
                  <Td textTransform={"capitalize"}>
                    {product?.paid ? (
                      <Text color={"green.600"}>Paid</Text>
                    ) : (
                      <Text color={"red.600"}>Unpaid</Text>
                    )}
                  </Td>
                  {product?.paid ? (
                    <>
                      <Td color={"green.600"}>Order Placed</Td>
                    </>
                  ) : (
                    <Td>
                      <CustomButton
                        size={"sm"}
                        text={"Pay"}
                        action={() =>
                          navigate(`/dashboard/payments/${product?._id}`)
                        }
                        disabled={product?.paid}
                      />
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <NotFound message={"Orders"} buttonText={"Go To Shop"} link={"/shop"} />
      )}
    </div>
  );
};

export default MyOrders;
