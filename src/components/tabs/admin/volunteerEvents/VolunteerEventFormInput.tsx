import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";
import axios from "axios";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";

import { volunteerEventResolver } from "../events/Resolvers";
import { VolunteerEventFormValues } from "../events/FormValues";
import { fetchAllUsers, getUserLabel } from "./users";

interface Props {
  id?: string;
  onClose?: () => void;
}

const VolunteerEventFormInput: React.FC<Props> = ({ id, onClose }) => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [usersError, setUsersError] = useState<string>();
  const [error, setError] = useState();
  const [errors, setErrors] = useState<{ [field: string]: any }>({});
  const { register, reset, watch, getValues, setValue } = useForm<VolunteerEventFormValues>({
    resolver: volunteerEventResolver,
  });
  const toast = useToast();

  useEffect(() => {
    const getLocations = async () => {
      try {
        const locationsRes = await axios.get(apiUrl(Service.HEXATHONS, "/locations"));
        setLocations(locationsRes.data);
      } catch (e: any) {
        setError(e);
      }
    };

    const getUsers = async () => {
      try {
        setUsers(await fetchAllUsers());
      } catch (e: any) {
        setUsersError("Unable to load users.");
      }
    };

    getLocations();
    getUsers();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      try {
        const { data } = await axios.get(apiUrl(Service.HEXATHONS, `/volunteer-shifts/${id}`));
        if (data) {
          const modifiedData = {
            ...data,
            startDate: dateFormat(data.startDate, "mm/dd/yyyy"),
            startTime: dateFormat(data.startDate, "hh:MM"),
            startTimeMarker: dateFormat(data.startDate, "TT"),
            endDate: dateFormat(data.endDate, "mm/dd/yyyy"),
            endTime: dateFormat(data.endDate, "hh:MM"),
            endTimeMarker: dateFormat(data.endDate, "TT"),
          };
          reset({ ...modifiedData });
        }
      } catch (e: any) {
        setError(e);
      }
    };

    getData();
  }, [id, reset]);

  const name = watch("name");
  const selectedLocations = watch("location");
  const selectedAssignees = watch("assignees");

  const findMissingField = (data: any) => {
    const missingRequiredFieldError = {
      name:
        !data.name || data.name.length === 0
          ? {
              type: "required",
              message: "Volunteer event name is required.",
            }
          : undefined,
      startDate:
        !data.startDate || data.startDate.length === 0
          ? {
              type: "required",
              message: "Start date is required.",
            }
          : undefined,
      startTime:
        !data.startTime || data.startTime.length === 0
          ? {
              type: "required",
              message: "Start time is required.",
            }
          : undefined,
      endDate:
        !data.endDate || data.endDate.length === 0
          ? {
              type: "required",
              message: "End date is required.",
            }
          : undefined,
      endTime:
        !data.endTime || data.endTime.length === 0
          ? {
              type: "required",
              message: "End time is required.",
            }
          : undefined,
    };

    const missingRequired = Object.values(missingRequiredFieldError).some(Boolean);

    if (missingRequired) {
      setErrors({ ...missingRequiredFieldError });
      return 0;
    }
    return 1;
  };

  const submit = async (data: any) => {
    const payload: { [name: string]: any } = {
      ...data,
      hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      location: (data.location ?? []).map((location: any) => location.id),
      assignees: data.assignees ?? [],
      startDate: new Date(data.startDate.concat(" ", data.startTime, " ", data.startTimeMarker)),
      endDate: new Date(data.endDate.concat(" ", data.endTime, " ", data.endTimeMarker)),
    };
    delete payload.startTime;
    delete payload.endTime;
    delete payload.startTimeMarker;
    delete payload.endTimeMarker;

    if (payload.startDate > payload.endDate) {
      if (payload.startDate.toDateString() === payload.endDate.toDateString()) {
        setErrors({
          endTime: {
            message: "End time of the event cannot come before the start time of the event",
          },
          startTime: {
            message: "Start time of the event cannot come after the end time of the event",
          },
        });
      } else {
        setErrors({
          startDate: {
            message: "Start date of the event cannot come after the end date of the event",
          },
          endDate: {
            message: "End date of the event cannot come before the start date of the event",
          },
        });
      }

      return;
    }

    let res = null;
    try {
      if (id) {
        res = await axios.patch(apiUrl(Service.HEXATHONS, `/volunteer-shifts/${id}`), payload);
      } else {
        res = await axios.post(apiUrl(Service.HEXATHONS, "/volunteer-shifts"), payload);
      }

      if (res.status >= 200) {
        if (onClose) {
          onClose();
        } else navigate(-1);
        toast({
          title: "Success",
          description: "Volunteer event saved successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (e: any) {
      setErrors({ request: JSON.parse(e.request.response) });
    }
  };

  const cancel = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  const del = async () => {
    try {
      const res = await axios.delete(apiUrl(Service.HEXATHONS, `/volunteer-shifts/${id}`));
      if (res.status >= 200) {
        if (onClose) onClose();
        else navigate(-1);
      }
      toast({
        title: "Success",
        description: "Volunteer event deleted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e: any) {
      setErrors({ request: { message: e.response?.data?.message ?? e.message } });
    }
  };

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <form>
      <FormControl isInvalid={errors.name} marginBottom={errors.name ? "12px" : "42px"}>
        <FormLabel>Name</FormLabel>
        <Input
          id="name"
          placeholder="Volunteer Event Name"
          {...register("name")}
          onChange={e => {
            if (e.target.value.length <= 50 || e.target.value.length <= name.length)
              setValue("name", e.target.value);
          }}
          value={name}
        />
        <Box width="98%" textAlign="right" fontSize="12px" position="absolute" color="#B3B3B3">
          {name?.length}/50 character limit
        </Box>
        <Box marginTop="6px" color="red">
          {errors.name ? errors.name.message : null}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.startDate} marginBottom={errors.startDate ? "12px" : "42px"}>
        <FormLabel>Start Date</FormLabel>
        <Input id="startDate" placeholder="MM/DD/YYYY" {...register("startDate")} />
        <Box marginTop="6px" color="red">
          {errors.startDate && errors.startDate.message}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.startTime} marginBottom={errors.startTime ? "12px" : "42px"}>
        <FormLabel>Start Time</FormLabel>
        <HStack>
          <Input id="startTime" width="80%" placeholder="HH:MM" {...register("startTime")} />
          <Select
            id="startTimeMarker"
            width={{
              base: "30%",
              md: "20%",
            }}
            defaultValue="AM"
            {...register("startTimeMarker")}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Select>
        </HStack>
        <Box marginTop="6px" color="red">
          {errors.startTime && errors.startTime.message}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.endDate} marginBottom={errors.endDate ? "12px" : "42px"}>
        <FormLabel>End Date</FormLabel>
        <Input id="endDate" placeholder="MM/DD/YYYY" {...register("endDate")} />
        <Box marginTop="6px" color="red">
          {errors.endDate && errors.endDate.message}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.endTime} marginBottom={errors.endTime ? "12px" : "42px"}>
        <FormLabel>End Time</FormLabel>
        <HStack>
          <Input id="endTime" width="80%" placeholder="HH:MM" {...register("endTime")} />
          <Select
            id="endTimeMarker"
            width={{
              base: "30%",
              md: "20%",
            }}
            defaultValue="AM"
            {...register("endTimeMarker")}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </Select>
        </HStack>
        <Box marginTop="6px" color="red">
          {errors.endTime && errors.endTime.message}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.location} marginBottom={errors.location ? "12px" : "42px"}>
        <FormLabel>Location (optional)</FormLabel>
        <ReactSelect
          isMulti
          closeMenuOnSelect={false}
          isDisabled={locations.length === 0}
          placeholder="Select Location..."
          options={locations.map((location: any) => ({ value: location.id, label: location.name }))}
          {...register("location")}
          onChange={e => {
            setValue(
              "location",
              locations.filter(
                (location: any) =>
                  e?.filter((option: any) => location.id === option.value).length !== 0
              )
            );
          }}
          value={selectedLocations?.map((location: any) => ({
            value: location.id,
            label: location.name,
          }))}
        />
        <Box marginTop="6px" color="red">
          {errors.location && errors.location.message}
        </Box>
      </FormControl>
      <FormControl isInvalid={errors.assignees} marginBottom={errors.assignees ? "12px" : "42px"}>
        <FormLabel>Users</FormLabel>
        <ReactSelect
          isMulti
          closeMenuOnSelect={false}
          isDisabled={users.length === 0}
          placeholder={users.length === 0 && !usersError ? "Loading users..." : "Select Users..."}
          options={users.map((user: any) => ({ value: user.userId, label: getUserLabel(user) }))}
          {...register("assignees")}
          onChange={e => {
            setValue(
              "assignees",
              (e ?? []).map((option: any) => option.value)
            );
          }}
          value={selectedAssignees?.map((userId: string) => {
            const user = users.find((u: any) => u.userId === userId);
            return { value: userId, label: user ? getUserLabel(user) : userId };
          })}
        />
        <Box marginTop="6px" color="red">
          {errors.assignees ? errors.assignees.message : usersError}
        </Box>
      </FormControl>

      <Box height="48px" paddingY="12px" color="red">
        {errors.request && errors.request.message}
      </Box>
      <HStack width="100%" bg="white" marginBottom="20px">
        <Button
          onClick={() => {
            if (findMissingField(getValues())) submit(getValues());
          }}
        >
          {id ? "Update" : "Submit"}
        </Button>
        <Button onClick={cancel}>Cancel</Button>
        <Spacer />
        {id ? (
          <Button bg="red.400" color="white" onClick={del}>
            Delete
          </Button>
        ) : null}
      </HStack>
    </form>
  );
};

export default VolunteerEventFormInput;
