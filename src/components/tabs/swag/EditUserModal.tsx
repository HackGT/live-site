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
  Text,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";
import { HEXATHON_ID } from "../../../App";

interface Props {
  userId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<Props> = (props) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userAdditionalPoints, setUserAdditionalPoints] = useState(0);

  useEffect(() => {
    const getUserDetailInfo = async () => {
      if (!props.userId) {
        return;
      }

      setLoadingUser(true);
      try {
        const response = await axios.request({
          method: "GET",
          url: apiUrl(
            Service.HEXATHONS,
            `/hexathon-users/${HEXATHON_ID}/users/${props.userId}`
          ),
          params: {
            hexathon: HEXATHON_ID,
          },
        });
        setUser(response.data);
        setLoadingUser(false);
        setUserAdditionalPoints(response.data.points.numAdditional);

        reset({
          numSpent: response.data.points.numSpent,
          numAdditional: 0,
        });
      } catch (error: any) {
        handleAxiosError(error);
      }
    };

    getUserDetailInfo();
  }, [props.userId]);

  if (loadingUser) {
    return (
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <Spinner />
      </Modal>
    );
  }

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.post(
        apiUrl(
          Service.HEXATHONS,
          `/hexathon-users/${HEXATHON_ID}/users/${props.userId}/actions/update-points`
        ),
        {
          numSpent: values.numSpent,
          numAdditional: parseInt(values.numAdditional) + userAdditionalPoints,
        }
      );
      toast({
        title: "Success!",
        description: "User points updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.onClose();
    } catch (e: any) {
      handleAxiosError(e);
    }
  };

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User Points</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Alert status="warning" mb="5">
            <AlertIcon />
            <Box>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Only use this to manually update points if really needed.
                Usually, you can reconcile people's points by scanning their
                badge for an event they said they went to. 
              </AlertDescription>
            </Box>
          </Alert>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} alignItems="normal">
              <Text>User: {user?.name}</Text>
              <Text>Current # of Points: {user?.points?.currentTotal}</Text>
              <FormControl isRequired>
                <FormLabel>Points Spent</FormLabel>
                <Input {...register("numSpent")} type="number" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Add/Remove Points</FormLabel>
                <Input {...register("numAdditional")} type="number" />
              </FormControl>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting}
                type="submit"
              >
                Checkout
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default EditUserModal;
