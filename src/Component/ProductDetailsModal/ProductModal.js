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

const ProductModal = ({
  onClose,
  isOpen,
  product = {},
  discount,
  setSelectedProduct,
}) => {
  const [scrollBehavior] = useState("inside");
  const [isOrder, setIsOrder] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={isOrder ? { base: "sm", md: "md" } : { base: "sm", md: "3xl" }}
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
                onClick={() => {
                  setIsOrder(false);
                }}
              />
            </Box>
          ) : (
            <ModalCloseButton onClick={() => setSelectedProduct(null)} />
          )}
          <ModalBody>
            {isOrder ? (
              <OrderForm
                user={user}
                productInfo={product}
                onClose={onClose}
                setIsOrder={setIsOrder}
                discount={discount}
              />
            ) : (
              <ProductDetails
                product={product}
                setIsOrder={setIsOrder}
                discount={discount}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
