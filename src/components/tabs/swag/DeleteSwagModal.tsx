import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";

import { Item } from "./Item";

interface DeleteSwagModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const DeleteSwagModal: React.FC<DeleteSwagModalProps> = props => {
  console.log(props.item.id);
  const toast = useToast();
  const {
    formState: { isSubmitting },
  } = useForm();

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.delete(
        apiUrl(Service.HEXATHONS, `/swag-items/${props.item.id}`)
      );
      toast({
        title: "Success!",
        description: "Swag item deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.onClose();
      window.location.reload();
    } catch (e: any) {
      handleAxiosError(e);
    }
  };

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} onOverlayClick={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Flex justify="space-between">
            <Button colorScheme="pink" onClick={handleFormSubmit} mr={20}>
              Yes, Delete
            </Button>
            <Button variant="outline" onClick={props.onClose} ml={20}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSwagModal;