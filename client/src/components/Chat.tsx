import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {getUser} from '../services/cmsService'
import useChat from './ChatSocket';

const Chat: React.FC = () => {
    let params: any = useParams();
    let eventID: string = params.id;

    const { messages, sendMessage } = useChat(eventID);
    const [newMessage, setNewMessage] = React.useState("");
    const [name, setName] = useState<string>("");
    const [userID, setID] = useState<string>("");

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                let user = await getUser();
                setID(user.uuid);
                setName(user.name);
            } catch (e) {
                console.log(e);
            }
        }
        fetchFullName();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleNewMessageChange = (event: any) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage, name, userID);
        setNewMessage("");
    };

    console.log(messages);

    return (
      <div> 
        <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write a message..."
        />
        <button onClick={handleSendMessage} className="send-message-button">
            Send
        </button>
      </div>
    )
}

export default Chat;
