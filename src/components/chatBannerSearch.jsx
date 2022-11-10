import React from "react";

const ChatBannerSearch = ({ user }) => {
  console.log(user);
  return (
    <div className="chatsContainer">
      <img src={user.image} alt="avatar" />
      <div className="details">
        <span className="nameStyle">{user.name}</span>
        <span className="msgStyle">{user.email}</span>
      </div>
    </div>
  );
};

export default ChatBannerSearch;
