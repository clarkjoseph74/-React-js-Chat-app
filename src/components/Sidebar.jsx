import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { ChatsContainer } from "./ChatsContainer";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

const Sidebar = () => {
  return (
    <>
      <div className="sideBar">
        <Navbar />
        <Searchbar />
        <ChatsContainer />
      </div>
    </>
  );
};

export default Sidebar;
