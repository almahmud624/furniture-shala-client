import React, { useContext } from "react";
import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";

const AllSellers = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", "seller"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/user/seller`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const toast = useToast();

  const handleSellerDelete = (id) => {
    axios.delete(`http://localhost:4000/user/seller/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast({
          title: `Seller Succfully Removed`,
          position: "top",
          isClosable: true,
          status: "success",
        });
        refetch();
      }
    });
  };

  const handleVerifySeller = (email) => {
    axios.patch(`http://localhost:4000/user/seller/${email}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast({
          title: `Seller Succfully Verifed`,
          position: "top",
          isClosable: true,
          status: "success",
        });
        refetch();
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
        Make Admin
      </Heading>
      <TableContainer>
        <Table variant="simple" bg={"gray.300"} _dark={{ bg: "gray.800" }}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Verify</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((seller) => (
              <Tr key={Math.random()}>
                <Td>{seller?.name}</Td>
                <Td>{seller?.email}</Td>
                {seller?.verfiedSeller ? (
                  <>
                    <Td
                      color="green.600"
                      style={{ textTransform: "capitalize" }}
                    >
                      Verified
                    </Td>
                  </>
                ) : (
                  <Td style={{ textTransform: "capitalize" }}>
                    <Button
                      bg="teal.600"
                      size="sm"
                      onClick={() => {
                        handleVerifySeller(seller?.email);
                      }}
                    >
                      Verfiy Seller
                    </Button>
                  </Td>
                )}

                <Td>
                  <Button
                    bg="teal.600"
                    size="sm"
                    onClick={() => handleSellerDelete(seller?._id)}
                  >
                    {/* {user.role === "admin" ? "Remove Admin Role" : "Make Admin"} */}
                    Delete Seller
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

export default AllSellers;
