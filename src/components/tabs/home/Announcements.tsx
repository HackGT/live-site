import React, { useState, useEffect } from "react";
import { Box, Flex, Stack, Heading } from "@chakra-ui/react";
import { Header, HeaderItem, useLogin, LoadingScreen, AuthProvider, useAuth, Service, apiUrl, Footer, ErrorScreen } from "@hex-labs/core";
import { WebClient } from "@slack/web-api";
import axios from "axios";

const Announcements: React.FC = () => {
  const SLACK_BOT_TOKEN = String(process.env.REACT_APP_SLACK_API_BOT_TOKEN)
  const CHANNEL_ID = String(process.env.REACT_APP_SLACK_API_CHANNEL_ID)


  const client = new WebClient(SLACK_BOT_TOKEN);
  
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
//     Something else that I tried, but it gave an error about accessing it from the client-side
//     fetch(`https://slack.com/api/conversations.history?channel=${CHANNEL_ID}`, {
//   headers: {
//     Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

    const fetchMessages = async () => {
      try {
        const response = await client.conversations.history({
          channel: CHANNEL_ID,
        });
        const messageText = response?.messages?.map(message => message.text);
        const announcements = messageText?.filter(message => !(message?.includes("has joined the channel")) && !(message?.includes("has renamed the channel")));
        if (announcements) {
          setMessages(announcements as string[]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);
  
  return (
    <Flex
      flexDir="column"
      padding={{ base: "0 0 8px 0", md: "32px 48px" }}
      margin="auto"
      maxWidth="1000px"
    >
          <Heading size="lg" marginBottom="9px">
            Announcements
          </Heading>
          {messages}
    </Flex>
  );
}

export default Announcements;