import React, { useState, useContext } from "react";
import { FcAddImage } from "react-icons/fc";
import { GrSend } from "react-icons/gr";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";

import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/authContext";

const InputMessage = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useSelector((state) => state.home);
  const [message, setMessage] = useState("");
  const handleSend = async (e) => {
    e.target.value = "";
    await updateDoc(doc(db, "chats", state.combinedId), {
      message: arrayUnion({
        id: uuid(),
        message,
        senderId: currentUser.uid,
        time: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [state.combinedId + ".lastMessage"]: {
        message,
      },
      [state.combinedId + ".date"]: serverTimestamp(),
    }).then(async (res) => {
      await updateDoc(doc(db, "usersChats", state.secUser.uid), {
        [state.combinedId + ".lastMessage"]: {
          message,
        },
        [state.combinedId + ".date"]: serverTimestamp(),
      });
    });

    setMessage("");
  };
  return (
    <div className="inputMessage">
      <input
        type="text"
        className="textField"
        placeholder="Send a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <FcAddImage />
      <div className="sendIcon" onClick={(e) => handleSend(e)}>
        <GrSend className="icon" />
      </div>
    </div>
  );
};

export default InputMessage;
