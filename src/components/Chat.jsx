import React from "react";
import ChatHeader from "./ChatHeader";
import InputMessage from "./InputMessage";
import MessageList from "./MessageList";

const Chat = () => {
  return (
    <div className="chat">
      <ChatHeader />
      <MessageList />
      <InputMessage />
    </div>
  );
};

export default Chat;
