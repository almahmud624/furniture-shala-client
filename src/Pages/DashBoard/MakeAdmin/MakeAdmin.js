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
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../../Component/Loader";

const MakeAdmin = () => {
  const toast = useToast();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://furniture-shala-server.vercel.app/user"
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  // make admin
  const handleMakeAdmin = (user) => {
    axios
      .patch(
        `https://furniture-shala-server.vercel.app/user/role/${user?._id}`,
        user.role === "admin"
          ? { role: user?.previousRole, previousRole: null }
          : { role: "admin", previousRole: user?.role }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          if (user?.role !== "admin") {
            toast({
              title: `Admin Role successfully Set on ${user?.name}`,
              position: "top",
              isClosable: true,
              status: "success",
            });
          } else {
            toast({
              title: `Admin Role successfully Remove from ${user?.name}`,
              position: "top",
              isClosable: true,
              status: "success",
            });
          }
          refetch();
        }
      });
  };
  console.log(users);

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
                    {user?.role === "admin" ? "Admin" : user?.role}
                  </Td>

                  <Td>
                    <Button
                      bg="teal.600"
                      size="sm"
                      onClick={() => handleMakeAdmin(user)}
                      disabled={[
                        "furnitureshala@gmail.com",
                        "seller@gmail.com",
                        "user@gmail.com",
                      ].find((each) => each === user?.email)}
                    >
                      {user.role === "admin"
                        ? "Remove Admin Role"
                        : "Make Admin"}
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
