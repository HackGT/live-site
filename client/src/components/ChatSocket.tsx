import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:3000";

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState(Array); // Sent and received messages
  let socket = socketIOClient(SOCKET_SERVER_URL, { // Creates a WebSocket connection
    query: { roomId },
  });

  useEffect(() => {
    
    // Listens for incoming messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
        setMessages((messages) => [...messages, message]);
    });
    
    // Destroys the socket reference when the connection is closed
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody: string, fullName: string, userID: string) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: userID,
      name: fullName
    });
  };

  return { messages, sendMessage };
};

export default useChat;
