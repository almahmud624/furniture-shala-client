import React, { useContext } from "react";
import {
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
import { AuthContext } from "../../../Context/AuthProvider";
import CustomButton from "../../../Component/CustomButton";

const AllSellers = () => {
  const { userSignOut } = useContext(AuthContext);
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", "seller"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/user/seller`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const toast = useToast();

  const handleSellerDelete = (id) => {
    axios
      .delete(`https://furniture-shala-server.vercel.app/user/seller/${id}`)
      .then((res) => {
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
    fetch(`https://furniture-shala-server.vercel.app/user/seller/${email}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("furniture-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return userSignOut();
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
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
        All Sellers
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
                    <CustomButton
                      size="sm"
                      text={"Verfiy Seller"}
                      action={() => {
                        handleVerifySeller(seller?.email);
                      }}
                    />
                  </Td>
                )}

                <Td>
                  <CustomButton
                    size={"sm"}
                    text={"Remove Seller"}
                    action={() => handleSellerDelete(seller?._id)}
                    disabled={"seller@gmail.com" === seller?.email}
                    bg="red.600"
                    _hover={{ bg: "red.700" }}
                  />
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
