import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";

import { Item } from "./Item";
import { HEXATHON_ID } from "../../../App";

interface UpdateSwagModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const UpdateSwagModal: React.FC<UpdateSwagModalProps> = props => {
  const toast = useToast();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [formData, setFormData] = useState({
    name: props.item.name,
    hexathon: HEXATHON_ID,
    points: props.item.points,
    capacity: props.item.capacity,
    description: props.item.description,
    image_url: props.item.image_url,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.put(
        apiUrl(Service.HEXATHONS, `/swag-items/${props.item.id}`), 
        formData
      );
      toast({
        title: "Success!",
        description: "Swag item updated",
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
        <ModalHeader>Update Swag Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} alignItems="normal">
              <FormControl>
                <FormLabel>Swag Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Points Required</FormLabel>
                <Input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Capacity</FormLabel>
                <Input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image (URL)</FormLabel>
                <Input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSwagModal;