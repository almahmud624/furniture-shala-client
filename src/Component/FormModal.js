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
const FormModal = ({ children, isOpen, onClose, modalTitle }) => {
  const [scrollBehavior] = useState("inside");
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default FormModal;
