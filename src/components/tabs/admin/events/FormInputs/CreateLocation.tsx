import React, { useEffect, useState } from 'react';
import { ErrorScreen, Service, apiUrl } from "@hex-labs/core";
import axios from 'axios';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  Heading,
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
  useDisclosure
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";

const CreateLocation: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [error, setError] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm();

  const columns = [
    {
      key: 0,
      header: "Name",
      accessor: (row: any) => row.name,
    }
  ];

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.post(
        apiUrl(Service.HEXATHONS, `/locations`),
        {
          name: values.name,
        }
      );
      toast({
        title: "Success!",
        description: "Location created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      onClose();
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const locationsRes = await axios.get(apiUrl(Service.HEXATHONS, "/locations"));
        const sortedLocations = locationsRes.data.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setLocations(sortedLocations);
      } catch (e: any) {
        setError(e);
      }
    };
    getData();
  }, []);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <>
      <Box p={14}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="lg">Locations</Heading>
          <Button onClick={onOpen}>Add Location</Button>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map(column => (
                <Th key={column.key}>{column.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {locations.map(location => (
              <Tr key={location.id}>
                <Td>{location.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} onOverlayClick={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <VStack spacing={4} alignItems="normal">
                <FormControl isRequired>
                  <FormLabel>Location Name</FormLabel>
                  <Input {...register("name")} type="text" name="name" />
                </FormControl>
                <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateLocation;