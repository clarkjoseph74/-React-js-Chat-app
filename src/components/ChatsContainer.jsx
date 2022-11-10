import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveSecUser } from "../stores/homeSlice";
import ChatBanner from "../components/ChatBanner";
export const ChatsContainer = () => {
  const currentUserState = useSelector((state) => state.home.currentUser);

  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      try {
        const docRef = doc(db, "usersChats", currentUser.uid);
        onSnapshot(docRef, (doc) => {
          setChats(Object.entries(doc.data()));
        });
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, [currentUser, currentUser.uid, dispatch, currentUserState]);
  const fetchChats = chats.map((el) => {
    console.log();
    return (
      <div
        key={el[0]}
        onClick={() => {
          const combinedId =
            currentUser.uid > el[1].userInfo.uid
              ? currentUser.uid + el[1].userInfo.uid
              : el[1].userInfo.uid + currentUser.uid;
          dispatch(
            saveSecUser({ user: el[1].userInfo, combinedId: combinedId })
          );
        }}
      >
        {" "}
        <ChatBanner user={el[1]} />
      </div>
    );
  });
  return <div>{fetchChats}</div>;
};
