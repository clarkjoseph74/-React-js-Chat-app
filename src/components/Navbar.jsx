import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navBar">
      <img src={currentUser.photoURL} alt="avatar" />
      <span className="nameStyle">{currentUser.displayName}</span>
      <button onClick={() => signOut(auth)}>LOGOUT</button>
    </div>
  );
};

export default Navbar;
