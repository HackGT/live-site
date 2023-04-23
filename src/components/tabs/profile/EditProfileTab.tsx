import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  Input,
  Button,
  NumberInputField,
  Container,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorScreen, LoadingScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import axios from "axios";
import { Profile } from "../../../types/Profile";

const phoneNumberFormat = (val: any) => {
  if (!val || val.length === 0) {
    return "";
  }
  if (val.length <= 3) {
    return `(${val.slice(0, val.length)}`;
  }
  if (val.length <= 6) {
    return `(${val.slice(0, 3)}) ${val.slice(3, val.length)}`;
  }
  if (val.length <= 10) {
    return `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(
      6,
      val.length
    )}`;
  } 
  return val;
};

const EditProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>();
  const navigate = useNavigate();
  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useMemo(() => {
    const getProfile = async () => {
      if (user?.uid) {
        const response = await axios.get(apiUrl(Service.USERS, `/users/${user?.uid}`));
        setProfile({ ...response.data });
      }
    };
    getProfile();
  }, [user]);
  /**
   * Generates initial default user profile based on current user profile.
   */
  const defaultUserProfile = useMemo(() => {
    // console.log("PROFILE");
    // console.log(profile);
    // console.log("USER");
    // console.log(user);
    if (!profile || Object.keys(profile).length === 0) {
      const name = user?.displayName?.split(" ");
      let lastName = "";
      if (name) {
        lastName = (name.length === 3 ? name[2] : name[1]);
      }
      return {
        name: {
          first: name ? name[0] : "",
          middle: name && name.length === 3 ? name[1] : "",
          last: name ? lastName : "",
        },
        phoneNumber: "",
      };
    }
    const updatedProfile = {
      name: profile.name,
      phoneNumber: phoneNumberFormat(profile.phoneNumber),
    };
    return updatedProfile;

  }, [user, profile]);
  // console.log("DEFAULT");
  // console.log(defaultUserProfile);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    // console.log(values);
    const phoneNumber = getValues("phoneNumber")?.replace(/[- )(]/g, "");
    try {
      !profile || Object.keys(profile).length === 0
        ? await axios.post(`https://users.api.hexlabs.org/users`, {
            ...values,
            user: user?.uid,
            phoneNumber,
          })
        : await axios.put(`https://users.api.hexlabs.org/users/${user?.uid}`, {
            ...values,
            phoneNumber,
          });
      // await refetchProfile();
      navigate(`/${location.search}`);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <Container mt="8">
      <VStack justify="center" mb="20">
        <Heading>Your Code</Heading>
        <Text pb="5">Use this QR code to check into the event.</Text>
        <QRCodeSVG
          value={JSON.stringify({
            uid: user?.uid,
            name: {
              first: profile?.name?.first,
              last: profile?.name?.last,
            },
            email: user?.email,
          })}
          size={Math.min(screenWidth * 0.7, 250)}
          style={{ alignSelf: "center" }}
        />
      </VStack>
      <Flex justifyContent="center">
        <Button onClick={onOpen}>{user ? "Edit Profile" : "Create Profile"}</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <Flex justifyContent="center">
          <ModalHeader fontWeight="bold" fontSize="2xl" minW="fit-content">{user ? "Edit Profile" : "Create Profile"}</ModalHeader>
          <ModalCloseButton />
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Alert status="error" mb="10">
              <AlertIcon />
              <AlertTitle>Delete Profile</AlertTitle>
              <AlertDescription>
                If you wish to delete your profile, please email us at hello@hexlabs.org with your name.
              </AlertDescription>
            </Alert>
            <Flex justifyContent="center">
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input id="firstName" type="text" 
                  defaultValue={defaultUserProfile.name.first}
                  {...register("name.first")} 
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    id="name.middle"
                    type="text"
                    defaultValue={defaultUserProfile.name.middle}
                    {...register("name.middle")}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input id="name.last" type="text" 
                    defaultValue={defaultUserProfile.name.last}
                    {...register("name.last")} 
                  />
                </FormControl>
                <FormControl isInvalid={Boolean(errors.phoneNumber)} isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <NumberInput
                    format={phoneNumberFormat}
                    parse={(e) => e.replace(/[- )(]/g, "")}
                    pattern="^([(]\d+[)]\s\d+[-])?\d+$"
                    inputMode="tel"
                    clampValueOnBlur={false}
                    defaultValue={defaultUserProfile.phoneNumber.replace(/[- )(]/g, "")}
                  >
                    <NumberInputField
                      id="phoneNumber"
                      {...register("phoneNumber", {
                        minLength: {
                          value: 14,
                          message: "Please enter a valid phone number",
                        },
                        maxLength: {
                          value: 14,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                  </NumberInput>
                  {/* <FormErrorMessage>
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage> */}
                </FormControl>
              </Stack>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Button
            hidden={!user}
            type="reset"
            onClick={onClose}
            mr="10"
          >
            Cancel
          </Button>
          <Button type="submit">
            Save
          </Button>
          </ModalFooter>
        </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EditProfileTab;