import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {getUser} from '../services/cmsService'
import useChat from './ChatSocket';
import ChatTile from './ChatTile'

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

    return (
        <div className="chatWindow">
            <div className="chatWindow">
                {messages.map((message: any, _) => (
                    <li>
                        <ChatTile name={message.name} content={message.body} selfOrigin={message.senderId===userID}/>
                    </li>
                ))}
            </div>
            <div className="TextEntry">
                <textarea
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    placeholder="Write a message..."
                    className="chatEntry"
                />
                <button onClick={handleSendMessage} className="send-message-button">
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat;
