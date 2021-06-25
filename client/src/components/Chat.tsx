import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import {getUser} from '../services/cmsService'
import useChat from './ChatSocket';
import Messages from './Messages';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';

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
        if (newMessage.length > 0) {
            sendMessage(newMessage, name, userID);
            setNewMessage("");
        }
    };

    return (
        <div className="chatWindow">
            <Messages messages={messages} userID={userID}/>
            <div className="TextEntry">
                <TextField
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    className="chatEntry"
                    label="Write a message..."
                />
                <Button onClick={handleSendMessage} 
                        color="primary"
                        variant="contained"
                        className="send-message-button"
                        endIcon={<CloudUploadIcon />}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Chat;
