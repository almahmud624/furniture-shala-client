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
} from "@chakra-ui/react";
import { DataStoreContext } from "../../../Context/DataProvider";

const MyProducts = () => {
  const { sellerProducts } = useContext(DataStoreContext);

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
            {sellerProducts?.map((product) => (
              <Tr key={Math.random()}>
                <Image
                  src={product?.productImg}
                  w="12"
                  p={"1"}
                  rounded={"2xl"}
                />
                <Td>{product?.productName}</Td>
                <Td>{product?.categories}</Td>
                <Td isNumeric color="green.600">
                  <Text as="del" fontSize={"xs"} color="red.600" pr={1}>
                    ${product?.oldPrice}
                  </Text>
                  ${product?.newPrice}
                </Td>
                <Td color="green.600">Available</Td>
                <Td>
                  <Button bg="teal.600" size="sm">
                    Advertise
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
