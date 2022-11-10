import React, { useState, useEffect } from "react";

import Message from "./Message.jsx";
import { db } from "../Firebase";

import { useSelector } from "react-redux";

import { onSnapshot, doc } from "firebase/firestore";
const MessageList = () => {
  const state = useSelector((state) => state.home);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const docRef = doc(db, "chats", state.combinedId);
      onSnapshot(docRef, (doc) => {
        setMessages(doc.data().message);
      });
    } catch (error) {
      console.log(error);
    }
  }, [state.combinedId]);

  return (
    <div className="messageList">
      {messages.map((el) => {
        console.log(el);
        return (
          <div key={el.id}>
            <Message message={el} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
