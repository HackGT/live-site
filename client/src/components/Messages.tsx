import React, { useEffect, createRef } from 'react';
import ChatTile from './ChatTile'

import '../App.css';

type Props = {
  messages: Array<any>
  userID: any
};

const Messages: React.FC<Props> = (props: Props) => {
    const messagesEndRef = createRef<HTMLDivElement>()

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [props.messages]);

    if (props.messages) {
        return (
            <div className="messages">
              {props.messages.slice(-250).map(message => (
                <ChatTile name={message.name} content={message.body} selfOrigin={message.senderId===props.userID}/>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          );
    }
    return (
        <div/>
    )
}

export default Messages;
