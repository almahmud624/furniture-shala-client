import React, { useState } from "react";
import {
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
import CustomButton from "../../../Component/CustomButton";

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
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/user/buyers`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const toast = useToast();

  const handleBuyersDelete = (id) => {
    axios
      .delete(`https://furniture-shala-server.vercel.app/user/buyers/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast({
            title: `Buyer Successfully Removed`,
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

                <Td color="primary" style={{ textTransform: "capitalize" }}>
                  {buyer?.role === "user" && "Buyer"}
                </Td>

                <Td>
                  <CustomButton
                    size={"sm"}
                    text={"Remove Buyer"}
                    action={() => {
                      onOpen();
                      setBuyerInfo(buyer);
                    }}
                    disabled={"user@gmail.com" === buyer?.email}
                    bg="red.600"
                    _hover={{ bg: "red.700" }}
                  />
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
