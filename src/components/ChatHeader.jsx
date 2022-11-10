import React from "react";
import { FcVideoCall, FcCallback } from "react-icons/fc";
import { CgMoreVertical } from "react-icons/cg";
import { useSelector } from "react-redux";
const ChatHeader = () => {
  const user = useSelector((state) => state.home.secUser);
  return (
    <>
      <div className="chatHeader">
        <div className="user">
          <img src={user.image} alt="avatar" />
          <span className="nameStyle">{user.name}</span>
        </div>
        <div className="icons">
          <FcVideoCall size={27} />
          <FcCallback size={21} />
          <CgMoreVertical />
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
