import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const state = useSelector((state) => state.home);
  console.log(currentUser);

  console.log(message);
  return currentUser.uid === message.senderId ? (
    <div className="messageRow ownerRow">
      {" "}
      <div className="message owner">
        {" "}
        <img src={currentUser.photoURL} alt="avatar" />
        <div className="messageText">
          <span className="time">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(message.time)}
          </span>
          <span className="messageStyle">{message.message}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="messageRow">
      {" "}
      <div className="message">
        {" "}
        <img src={state.secUser.image} alt="avatar" />
        <div className="messageText">
          <span className="time">
            {" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(message.time)}
          </span>
          <span className="messageStyle">{message.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
