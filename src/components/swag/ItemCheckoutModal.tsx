// @ts-nocheck
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
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";
import { HEXATHON_ID } from "../../App";
import { Select } from "chakra-react-select";

interface Props {
  userId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  swagItems: any;
}

const ItemCheckoutModal: React.FC<Props> = (props) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control,
  } = useForm();

  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);

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
      } catch (error: any) {
        handleAxiosError(error);
      }
    };

    getUserDetailInfo();
    reset();
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
          `/hexathon-users/${HEXATHON_ID}/users/${props.userId}/actions/purchase-swag-item`
        ),
        {
          swagItemId: values.swagItem.value,
          quantity: values.quantity,
        }
      );
      toast({
        title: "Success!",
        description: "Item purchased",
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
        <ModalHeader>Swag Item Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} alignItems="normal">
              <Text>User: {user?.name}</Text>
              <Text>Points: {user?.points?.currentTotal}</Text>
              <Controller
                control={control}
                name="swagItem"
                rules={{ required: "Please select a swag item" }}
                render={({
                  field: { value, ref, ...field },
                  fieldState: { error: fieldError },
                }) => (
                  <FormControl isInvalid={!!fieldError} isRequired>
                    <FormLabel>Swag Item</FormLabel>
                    <Select
                      {...field}
                      ref={ref}
                      value={value}
                      options={props.swagItems.map((swagItem: any) => ({
                        label: `${swagItem.name} [${swagItem.points} points]`,
                        value: swagItem.id,
                      }))}
                    />
                    <FormErrorMessage>
                      {fieldError && fieldError.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />
              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input {...register("quantity")} type="number" />
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
export default ItemCheckoutModal;
