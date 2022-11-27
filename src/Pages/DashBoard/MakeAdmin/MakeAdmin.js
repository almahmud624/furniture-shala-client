import {
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../../Component/Loader";

const MakeAdmin = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user");
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
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user, i) => (
                <Tr key={Math.random()}>
                  <Td>{user?.name}</Td>
                  <Td>{user?.email}</Td>
                  <Td color="green.600" style={{ textTransform: "capitalize" }}>
                    {user?.role}
                  </Td>

                  <Td>
                    <Button
                      bg="teal.600"
                      size="sm"
                      // onClick={() => handleAdvertisement(product)}
                    >
                      {user.isAdmin ? "Remove Admin Role" : "Make Admin"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MakeAdmin;
