import React, { useState } from "react";
import axios from "axios";
import { apiUrl, Service } from "@hex-labs/core";
import {
  Box,
  Button,
  Code,
  Flex,
  Heading,
  HStack,
  Text,
  Link,
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
    <Box width="100%" bg="rgba(66, 153, 225, 0.08)" paddingY="20px">
      <Box width={{ base: "90%", md: "75%", lg: "65%" }} margin="auto">
        <Flex justifyContent="space-between" alignItems="flex-start" gap="20px">
          <Box>
            <Heading size="md" marginBottom="5px">
              OpenAI API Key
            </Heading>
            <Text>
              Claim your personal OpenAI API key for the hackathon. Keep it secret and do not
              commit it to your repo.
            </Text>
          </Box>
          <Link href="http://platform.openai.com/p/7QLLBMM2V4AMU2VC" isExternal>
            <Button isLoading={loading} colorScheme="blue" flexShrink={0}>
              Get my API key
            </Button>
          </Link>
        </Flex>
        {apiKey && (
          <HStack marginTop="10px">
            <Code padding="8px" rounded="md" wordBreak="break-all" bg="white">
              {apiKey}
            </Code>
            <Button onClick={onCopy} colorScheme="blue" size="sm" flexShrink={0}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default OpenAIKeyButton;
