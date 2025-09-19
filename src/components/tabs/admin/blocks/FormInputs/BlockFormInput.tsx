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
  Stack,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { blockResolver } from "../Resolvers";
import { BlockFormValues, DisplayType } from "../FormValues";
import styles from "../../../../common/markdown_styles.module.css";

interface Props {
  id?: string;
  onClose?: () => void;
}

const BlockFormInput: React.FC<Props> = ({ id, onClose }) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [errors, setErrors] = useState<{ [field: string]: any }>({});
  const { register, reset, watch, getValues, setValue } = useForm<BlockFormValues>({
    resolver: blockResolver,
  });
  const toast = useToast();

  const editBoxHeight = "420px";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/blocks"));
        const data = res.data.filter((entry: any) => entry.id === id)[0];

        if (data) {
          reset({ ...data });
        }
      } catch (e: any) {
        setError(e);
      }
    };
    getData();
  }, [id, reset]);

  const title = watch("title");
  const content = watch("content");
  const slug = watch("slug");
  const display = watch("display");

  const findMissingField = (data: any) => {
    const missingRequiredFieldError = {
      title:
        !data.title || data.title.trim().length === 0
          ? {
              type: "required",
              message: "Block title is required.",
            }
          : undefined,
      slug:
        !data.slug || data.slug.length === 0
          ? {
              type: "required",
              message: "Slug cannot be empty.",
            }
          : undefined,
      content:
        !data.content || data.content.length === 0
          ? {
              type: "required",
              message: "Content cannot be empty.",
            }
          : undefined,
      display:
        !data.display || data.display.length === 0
          ? {
              type: "required",
              message: "Display cannot be empty.",
            }
          : undefined,
    };

    const missingRequired =
      !data.title ||
      data.title.trim().length === 0 ||
      !data.slug ||
      data.slug.length === 0 ||
      !data.content ||
      data.content.length === 0 ||
      !data.display ||
      data.display.length === 0;

    if (missingRequired) {
      setErrors({ ...missingRequiredFieldError });
      return 0;
    }
    return 1;
  };

  const submit = async (data: any) => {
    const payload: { [name: string]: any } = {
      hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      title: data.title.trim(),
      slug: data.slug.trim(),
      content: data.content,
      display: data.display,
    };

    let res = null;
    try {
      if (id) {
        res = await axios.patch(apiUrl(Service.HEXATHONS, `/blocks/${id}`), payload);
      } else {
        res = await axios.post(apiUrl(Service.HEXATHONS, "/blocks"), payload);
      }

      if (res.status >= 200) {
        if (onClose) {
          onClose();
        } else navigate(-1);
        toast({
          title: "Success",
          description: "Event saved successfully!",
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
    else navigate("/admin/blocks");
  };

  const del = async () => {
    const res = await axios.delete(apiUrl(Service.HEXATHONS, `/blocks/${id}`));
    if (res.status >= 200) {
      if (onClose) onClose();
      else navigate(-1);
    }
    toast({
      title: "Success",
      description: "Block deleted successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (error) {
    return <ErrorScreen error={error} />;
  }

  const isJSON = content && (content.charAt(0) === "{" || content.charAt(0) === "[");
  let validJson = true;
  if (isJSON) {
    try {
      JSON.parse(content || "{}");
      validJson = true;
    } catch (e) {
      validJson = false;
    }
  }

  return (
    <form>
      <Stack width={{ base: "100%", md: "100%" }}>
        <Box>
          <FormControl isInvalid={errors.title} marginBottom={errors.title ? "4px" : "8px"}>
            <FormLabel>Title</FormLabel>
            <Input
              id="title"
              placeholder="Block Title"
              {...register("title")}
              onChange={e => {
                if (e.target.value.length <= 50 || e.target.value.length <= title.length)
                  setValue("title", e.target.value);
              }}
              value={title}
            />
            <Box width="98%" textAlign="right" fontSize="12px" position="absolute" color="#B3B3B3">
              {title?.length}/50 character limit
            </Box>
            <Box marginTop="2px" color="red">
              {errors.title ? errors.title.message : null}
            </Box>
          </FormControl>
          <FormControl isInvalid={errors.slug} marginBottom={errors.slug ? "4px" : "12px"}>
            <FormLabel>Slug</FormLabel>
            <Input
              id="slug"
              placeholder="Write slug for the block"
              {...register("slug")}
              onChange={e => {
                if (e.target.value.length <= 200 || e.target.value.length <= slug.length)
                  setValue("slug", e.target.value);
              }}
              value={slug}
            />
            <Box width="98%" textAlign="right" fontSize="12px" position="absolute" color="#B3B3B3">
              {slug?.length}/50 character limit
            </Box>
            <Box marginTop="2px" color="red">
              {errors.slug && errors.slug.message}
            </Box>
          </FormControl>
          <FormControl isInvalid={errors.display} marginBottom={errors.display ? "4px" : "12px"}>
            <FormLabel>Display</FormLabel>
            <Select
              id="display"
              placeholder="Select an option"
              {...register("display")}
              onChange={(e: any) => {
                if (e.target.value.length <= 200 || e.target.value.length <= display.length)
                  setValue("display", e.target.value);
              }}
              value={display}
            >
              {(Object.keys(DisplayType) as Array<DisplayType>).map(displayType => (
                <option key={displayType} value={displayType}>
                  {displayType}
                </option>
              ))}
            </Select>
            <Box marginTop="2px" color="red">
              {errors.display && errors.display.message}
            </Box>
          </FormControl>
        </Box>
        // Main container stack
        <VStack width="full" spacing={2} align="stretch">
          {/* Row for Labels */}
          <Stack direction="row" width="full">
            <Box width="full">
              <FormLabel>Content</FormLabel>
            </Box>
            <Box width="full">
              <FormLabel>Preview</FormLabel>
            </Box>
          </Stack>

          {/* Row for Textarea and Preview Box */}
          <Stack direction="row" width="full">
            <FormControl isInvalid={errors.content} width="full">
              <Textarea
                id="content"
                placeholder="Write content for the block..."
                {...register("content")}
                onChange={e => {
                  setValue("content", e.target.value);
                }}
                value={content}
                height={editBoxHeight}
              />
            </FormControl>

            <Box
              width="full"
              height={editBoxHeight}
              overflow="scroll"
              backgroundColor="#f5f5f5"
              borderWidth="1px"
              borderRadius="md"
            >
              {isJSON && !validJson && (
                <Box color="red" padding="8px">
                  Invalid JSON
                </Box>
              )}
              {isJSON && validJson && (
                <pre>{JSON.stringify(JSON.parse(content || "{}"), null, 2)}</pre>
              )}
              {!isJSON && (
                <ReactMarkdown className={styles.reactMarkDown} remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              )}
            </Box>
          </Stack>

          {/* Row for Error Messages */}
          <Stack direction="row" width="full">
            <Box width="full" color="red" minHeight="24px">
              {errors.content && errors.content.message}
            </Box>
            {/* Optional: Add a placeholder in the right column to balance the height if needed */}
            <Box width="full" minHeight="24px" />
          </Stack>

          {/* Centered Request Error Message */}
          <Box height="48px" paddingY="12px" color="red" textAlign="center">
            {errors.request && errors.request.message}
          </Box>
        </VStack>
      </Stack>
      <HStack width="100%" bg="white">
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

export default BlockFormInput;
