import React, { useContext, useState } from "react";
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";
import ConfirmationModal from "../../../Component/ConfirmationModal";

const AllBuyers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buyerInfo, setBuyerInfo] = useState(null);
  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["user", "buyers"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/user/buyers`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const toast = useToast();

  const handleBuyersDelete = (id) => {
    console.log(id);

    axios.delete(`http://localhost:4000/user/buyers/${id}`).then((res) => {
      console.log(res.data);

      if (res.data.deletedCount > 0) {
        toast({
          title: `Buyer Succfully Removed`,
          position: "top",
          isClosable: true,
          status: "success",
        });
        refetch();
        onClose();
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
        All Buyers
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
            {buyers?.map((buyer) => (
              <Tr key={Math.random()}>
                <Td>{buyer?.name}</Td>
                <Td>{buyer?.email}</Td>

                <Td color="green.600" style={{ textTransform: "capitalize" }}>
                  {buyer?.role === "user" && "Buyer"}
                </Td>

                <Td>
                  <Button
                    onClick={() => {
                      onOpen();
                      setBuyerInfo(buyer);
                    }}
                    bg="teal.600"
                    size={"sm"}
                  >
                    Delete Buyer
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <ConfirmationModal
          isOpen={isOpen}
          onClose={onClose}
          handleAction={handleBuyersDelete}
          targetedId={buyerInfo?._id}
          modalBody={`Are you want to remove ${buyerInfo?.name} from ${buyerInfo?.role} role? Before take any action, You have to know that remove item cann't be undone.`}
        />
      </TableContainer>
    </div>
  );
};

export default AllBuyers;
