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
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorScreen, LoadingScreen, Service, apiUrl, useAuth } from "@hex-labs/core";
import axios from "axios";

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
  const [profile, setProfile] = useState<any>(null);
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
    // console.log("get");
    const getProfile = async () => {
      if (user?.uid) {
        const response = await axios.get(apiUrl(Service.USERS, `/users/${user?.uid}`));
        setProfile({ ...response.data });
      }
    };
    getProfile();
  }, [user?.uid]);
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

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultUserProfile,
  });

  const onSubmit = async (values: any) => {
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
      <VStack spacing="8" justify="center" marginY="24px">
        <Heading size="lg">
          {user ? "Edit Profile" : "Create Profile"}
        </Heading>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Delete Profile</AlertTitle>
          <AlertDescription>
            If you wish to delete your profile, please email us at hello@hexlabs.org with your name.
          </AlertDescription>
        </Alert>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input id="firstName" type="text" 
                {...register("name.first")} 
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  id="name.middle"
                  type="text"
                  {...register("name.middle")}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input id="name.last" type="text" 
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
            <HStack
              spacing={user ? "16" : "0"}
              justify="center"
              // type="cancel"
            >
              <Button
                hidden={!user}
                type="reset"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save
              </Button>
            </HStack>
          </Stack>
        </form>
      </VStack>
    </Container>
  );
};

export default EditProfileTab;