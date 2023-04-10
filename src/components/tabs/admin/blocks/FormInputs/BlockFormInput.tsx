import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Stack,
  Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";
import { apiUrl, ErrorScreen, Service } from "@hex-labs/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { blockResolver } from "../Resolvers";
import { BlockFormValues } from "../FormValues";
import styles from "../../../../common/markdown_styles.module.css";

interface Props {
  id?: string;
  onClose?: () => void;
}

const BlockFormInput: React.FC<Props> = ({id, onClose}) => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [errors, setErrors] = useState<{[field: string]: any}>({});
  const {
    register,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<BlockFormValues>({
    resolver: blockResolver,
  });
  const toast = useToast();

  const editBoxHeight = "420px";

  useEffect(() => {
    const getData = async() => {
      try {
       
        const res = await axios.get(apiUrl(Service.HEXATHONS, "/blocks"));
        const data = res.data.filter((entry: any) => entry.id === id)[0];

        if (data) {
            reset({...data})
        }
      } catch(e: any) {
        setError(e);
      }
    }
    getData();
  }, [id, reset]);
  
  const title = watch("title");
  const content = watch("content");
  const slug = watch("slug");
  
  const findMissingField = (data: any) => {
    const missingRequiredFieldError = {
      title: (!data.title || data.title.trim().length === 0) ? ({
        type: "required",
        message: "Block title is required."
      }) : undefined,
      slug: (!data.slug|| data.slug.length === 0) ? ({
        type: "required",
        message: "Slug cannot be empty."
      }) : undefined,
      content: (!data.content || data.content.length === 0) ? ({
        type: "required",
        message: "Content cannot be empty."
      }) : undefined,
    }

    const missingRequired = 
       (!data.title || data.title.trim().length === 0)
      || (!data.slug|| data.slug.length === 0)
      || (!data.content || data.content.length === 0)

    if (missingRequired) {
        
      setErrors({...missingRequiredFieldError});
      return 0;
    }
    return 1;
  }

  const submit = async (data: any) => {   
    const payload: {[name: string]: any} = {
      hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      title: data.title.trim(),
      slug: data.slug.trim(),
      content: data.content,
    }

    let res = null;
    try {
      if (id) {
        res = await axios.patch(apiUrl(Service.HEXATHONS, `/blocks/${id}`), payload)
      } else {
        res = await axios.post(apiUrl(Service.HEXATHONS, "/blocks"), payload);
      }
      
      if (res.status >= 200) {
        if (onClose) {
          onClose();
        }
        else navigate(-1);
        toast({
          title: "Success",
          description: "Event saved successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch(e: any) {
      
      setErrors({ request: JSON.parse(e.request.response) })
    }
  }

  const cancel = () => {
    if (onClose) onClose();
    else navigate(-1);
  }

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
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <form>
      <Stack
        width={{ base: "100%", md: "100%" }}
      >
        <Box>
          <FormControl
            isInvalid={errors.title}
            marginBottom={errors.title ? "4px" : "8px"}
          >
            <FormLabel>Title</FormLabel>
            <Input
              id='title'
              placeholder="Block Title"
              {...register("title")}
              onChange={(e) => {
                if (e.target.value.length <= 50 || e.target.value.length <= title.length)
                  setValue("title", e.target.value);
              }}
              value={title}
            />
            <Box
              width="98%"
              textAlign="right"
              fontSize="12px"
              position="absolute"
              color="#B3B3B3"
            >
              {title?.length}/50 character limit
            </Box>
            <Box marginTop="2px" color="red">
              {(errors.title ? errors.title.message : null)}
            </Box>
          </FormControl>
          <FormControl
            isInvalid={errors.slug}
            marginBottom={errors.slug ? "4px" : "12px"}
          >
            <FormLabel>Slug</FormLabel>
            <Input
              id='slug'
              placeholder="Write slug for the block"
              {...register("slug")}
              onChange={(e) => {
                if (e.target.value.length <= 200 || e.target.value.length <= slug.length)
                  setValue("slug", e.target.value);
              }}
              value={slug}
            />
            <Box
              width="98%"
              textAlign="right"
              fontSize="12px"
              position="absolute"
              color="#B3B3B3"
            >
              {slug?.length}/50 character limit
            </Box>
            <Box marginTop="2px" color="red">
              {errors.slug && errors.slug.message}
            </Box>
          </FormControl>
        </Box>
        <Stack direction="row" width="full">
          <VStack width="full">
            <FormControl
              isInvalid={errors.content}
              marginBottom={errors.content ? "4px" : "0px"}
            >
              <FormLabel>Content</FormLabel>
              <Textarea
                id='content'
                placeholder="Write content for the block..."
                {...register("content")}
                onChange={(e) => {
                  setValue("content", e.target.value);
                }}
                value={content}
                height={editBoxHeight}
              />
              <Box color="red">
                {errors.content && errors.content.message}
              </Box>
            </FormControl>
            
            <Box height="48px" paddingY="12px" color="red">
              {errors.request && errors.request.message}
            </Box>
          </VStack>
          <Box width="full">
            <FormLabel>Preview</FormLabel>
            <Box height={editBoxHeight} overflow="scroll" backgroundColor="#f5f5f5">
              <ReactMarkdown className={styles.reactMarkDown} remarkPlugins={[remarkGfm]}>
              {content}
              </ReactMarkdown>
            </Box>
          </Box>
        </Stack>
      </Stack>
      <HStack
        width="100%"
        bg="white"
      >
        <Button
          onClick={() => { if (findMissingField(getValues())) submit(getValues()) }}
        >
          {id ? "Update" : "Submit"}
        </Button>
        <Button onClick={cancel}>
          Cancel
        </Button>
        <Spacer/>
        {
          id ? (
            <Button bg="red.400" color="white" onClick={del}>
              Delete
            </Button>
          ) : null
        }
      </HStack>
    </form>
  )
}

export default BlockFormInput;