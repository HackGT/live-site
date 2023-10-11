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
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";

import { HEXATHON_ID } from "../../../App";

interface CreateSwagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSwagModal: React.FC<CreateSwagModalProps> = props => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.post(
        apiUrl(Service.HEXATHONS, `/swag-items/`), 
        {
          name: values.name,
          hexathon: HEXATHON_ID,
          points: values.points,
          capacity: values.capacity,
          description: values.description,
          image_url: values.image_url,
        }
      );
      toast({
        title: "Success!",
        description: "Swag item created",
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
        <ModalHeader>Create Swag Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} alignItems="normal">
              <FormControl isRequired>
                <FormLabel>Swag Name</FormLabel>
                <Input {...register("name")}
                  type="text"
                  name="name"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Points Required</FormLabel>
                <Input {...register("points")}
                  type="number"
                  name="points"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Capacity</FormLabel>
                <Input {...register("capacity")}
                  type="text"
                  name="capacity"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input {...register("description")}
                  type="text"
                  name="description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image (Link)</FormLabel>
                <Input {...register("image_url")}
                  type="text"
                  name="image_url"
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

export default CreateSwagModal;