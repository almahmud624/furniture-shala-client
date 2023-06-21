import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./FormModal.css";
const FormModal = ({ children, isOpen, onClose, coupon, setCoupon }) => {
  const [scrollBehavior] = useState("inside");
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={scrollBehavior}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Form</ModalHeader>
          <ModalCloseButton onClick={() => coupon && setCoupon(null)} />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormModal;
