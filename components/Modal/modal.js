import styles from "./styles/modal.module.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const modal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default modal;
