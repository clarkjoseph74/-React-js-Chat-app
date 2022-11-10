import React from "react";

const ChatBanner = ({ user }) => {
  console.log(user);
  return (
    <div className="chatsContainer">
      <img src={user.userInfo.image} alt="avatar" />
      <div className="details">
        <span className="nameStyle">{user.userInfo.name}</span>
        {user.lastMessage && (
          <span className="msgStyle">{user.lastMessage.message}</span>
        )}
      </div>
    </div>
  );
};

export default ChatBanner;
