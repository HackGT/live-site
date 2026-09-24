import React, { useState } from "react";
import axios from "axios";
import { apiUrl, Service } from "@hex-labs/core";
import {
  Box,
  Button,
  Code,
  Heading,
  HStack,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

const OpenAIKeyButton: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { hasCopied, onCopy } = useClipboard(apiKey);
  const toast = useToast();

  const claimKey = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(apiUrl(Service.HEXATHONS, "/api-keys/claim"), {
        hexathon: String(process.env.REACT_APP_HEXATHON_ID),
      });
      setApiKey(data.key);
    } catch (err: any) {
      toast({
        title: "Unable to get an API key",
        description: err?.response?.data?.message ?? "Please try again or contact an organizer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="100%" bg="#F5F6FA" paddingY="20px">
      <Box width={{ base: "90%", md: "75%", lg: "65%" }} margin="auto">
        <Heading size="md" marginBottom="5px">
          OpenAI API Key
        </Heading>
        <Text marginBottom="10px">
          Claim your personal OpenAI API key for the hackathon. Keep it secret and do not commit it
          to your repo.
        </Text>
        {apiKey ? (
          <HStack>
            <Code padding="8px" rounded="md" wordBreak="break-all" bg="white">
              {apiKey}
            </Code>
            <Button onClick={onCopy} colorScheme="blue" size="sm" flexShrink={0}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </HStack>
        ) : (
          <Button onClick={claimKey} isLoading={loading} colorScheme="blue">
            Get my API key
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OpenAIKeyButton;
