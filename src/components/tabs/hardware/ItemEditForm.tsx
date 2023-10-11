import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiUrl, LoadingScreen, Service } from "@hex-labs/core";
import { Location, Category } from "./types/Hardware";

export type FormItem = {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  totalAvailable: number;
  maxRequestQty: number;
  price: number;
  hidden: boolean;
  returnRequired: boolean;
  approvalRequired: boolean;
  location: string;
  qtyUnreserved: number;
  qtyInStock: number;
  qtyAvailableForApproval: number;
};

const ItemEditForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormItem>();

  const navigate = useNavigate();

  const locationQuery = useQuery(["locations"], () =>
    axios.get(apiUrl(Service.HARDWARE, "/locations"))
  );

  const categoryQuery = useQuery(["categories"], () =>
    axios.get(apiUrl(Service.HARDWARE, "/categories"))
  );

  if (locationQuery.isLoading || categoryQuery.isLoading) {
    return <LoadingScreen />;
  }

  async function onSubmit(values: any) {
    await axios.post(apiUrl(Service.HARDWARE, "/items"), values);
    navigate("/");
  }

  return (
    <Flex as="form" gap={4} flexDir="column" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="itemName">
          Item name <chakra.span color="red.400">*</chakra.span>
        </FormLabel>
        <Input
          id="name"
          placeholder="Ray Gun"
          {...register("name", { required: "Please provide an item name!" })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.description)}>
        <FormLabel htmlFor="description">
          Description <chakra.span color="red.400">*</chakra.span>
        </FormLabel>
        <Textarea
          id="description"
          placeholder="Intended for bugs. Be sure not to point at other people."
          {...register("description", { required: "Please provide a description!" })}
        />
        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.category)}>
        <FormLabel htmlFor="category">
          Category <chakra.span color="red.400">*</chakra.span>
        </FormLabel>
        <Select
          id="category"
          placeholder="Select a category"
          {...register("category", { required: "Please provide a category!" })}
        >
          {categoryQuery.data?.data?.map((category: Category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
      </FormControl>
      <Flex gap="4">
        <FormControl isInvalid={Boolean(errors.price)}>
          <FormLabel>
            Item value <chakra.span color="red.400">*</chakra.span>
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
              $
            </InputLeftElement>
            <Input
              placeholder="Enter amount"
              type="number"
              min={0}
              {...register("price", { required: "Please provide an item value!" })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <FormControl isInvalid={Boolean(errors.location)}>
        <FormLabel htmlFor="location">
          Location <chakra.span color="red.400">*</chakra.span>
        </FormLabel>
        <Select
          id="location"
          placeholder="Select a location"
          {...register("location", { required: "Please provide a location!" })}
        >
          {locationQuery.data?.data?.map((location: Location) => (
            <option value={location.id}>{location.name}</option>
          ))}
        </Select>
        <FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
      </FormControl>
      <Flex flexDir="row" gap="4">
        <FormControl isInvalid={Boolean(errors.totalAvailable)}>
          <FormLabel>
            Quantity in stock <chakra.span color="red.400">*</chakra.span>
          </FormLabel>
          <NumberInput max={99} min={1}>
            <NumberInputField
              placeholder="Enter amount"
              {...register("totalAvailable", {
                required: "Please provide a quantity for the stock!",
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.totalAvailable && errors.totalAvailable.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.maxRequestQty)}>
          <FormLabel>
            Quantity allowed per request <chakra.span color="red.400">*</chakra.span>
          </FormLabel>
          <NumberInput max={99} min={1}>
            <NumberInputField
              placeholder="Enter amount"
              {...register("maxRequestQty", {
                required: "Please provide a quantity allowed!",
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>
            {errors.maxRequestQty && errors.maxRequestQty.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      {/* <Heading as="h3" size="md">
        Calculated Quantities
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Unreserved</StatLabel>
          <StatNumber>24</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>In Stock</StatLabel>
          <StatNumber>10</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Available for Approval</StatLabel>
          <StatNumber>24</StatNumber>
        </Stat>
      </StatGroup>
      <Heading as="h3" size="md">
        Checkout Controls
      </Heading> */}
      <CheckboxGroup colorScheme="twitter">
        <Stack spacing={5} direction="row">
          <Checkbox defaultChecked {...register("returnRequired")}>
            Return required
          </Checkbox>
          <Checkbox defaultChecked {...register("approvalRequired")}>
            Approval required
          </Checkbox>
          <Checkbox {...register("hidden")}>Hidden</Checkbox>
        </Stack>
      </CheckboxGroup>
      <Button colorScheme="twitter" type="submit" isLoading={isSubmitting}>
        Create item
      </Button>
    </Flex>
  );
};

export default ItemEditForm;
