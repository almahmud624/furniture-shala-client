import {
  Box,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ProductDetails from "./ProductDetails";
import { AuthContext } from "../../Context/AuthProvider";
import OrderForm from "../OrderForm";
import { CloseIcon } from "@chakra-ui/icons";

const ProductModal = ({ onClose, isOpen, product }) => {
  const [scrollBehavior] = useState("inside");
  const [isOrder, setIsOrder] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isOrder ? "md" : "3xl"}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent pos={"relative"}>
          {isOrder && <ModalHeader>Order Form</ModalHeader>}
          {isOrder ? (
            <Box pos={"absolute"} right={3} top={4}>
              <Icon
                as={CloseIcon}
                cursor={"pointer"}
                h={3}
                w={3}
                onClick={() => setIsOrder(false)}
              />
            </Box>
          ) : (
            <ModalCloseButton />
          )}
          <ModalBody>
            {isOrder ? (
              <OrderForm
                user={user}
                productInfo={product}
                onClose={onClose}
                setIsOrder={setIsOrder}
              />
            ) : (
              <ProductDetails product={product} setIsOrder={setIsOrder} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
