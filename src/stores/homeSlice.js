import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../Firebase";
export const searchUser = createAsyncThunk(
  "home/searchUser",
  async (data, thunkAPI) => {
    const users = [];
    try {
      const q = query(collection(db, "users"), where("name", "==", data));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      return users;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createChat = createAsyncThunk(
  "home/createChat",
  async (users, thunkAPI) => {
    const userUid = users.user.uid;
    const currentUid = users.currentUser.uid;

    const combinedId =
      currentUid > userUid ? currentUid + userUid : userUid + currentUid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //open chat
        await setDoc(doc(db, "chats", combinedId), { message: [] });

        //create user chat
        await updateDoc(doc(db, "usersChats", currentUid), {
          [combinedId + ".userInfo"]: {
            uid: userUid,
            name: users.user.name,
            image: users.user.image,
          },
          [combinedId + ".date"]: serverTimestamp(),
        }).then(async (res) => {
          await updateDoc(doc(db, "usersChats", userUid), {
            [combinedId + ".userInfo"]: {
              uid: currentUid,
              name: users.currentUser.displayName,
              image: users.currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        });
      }
      console.log(combinedId);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
    return combinedId;
  }
);
export const getUserChats = createAsyncThunk(
  "home/getUserChats",
  async (uid, thunkAPI) => {}
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    searchedUsers: [],
    searchErr: null,
    searchLoading: false,
    secUser: null,
    combinedId: null,
    currentUid: null,
  },
  reducers: {
    saveCurrent: (state, action) => {
      state.currentUid = action.payload;
    },
    saveSecUser: (state, action) => {
      state.secUser = action.payload.user;
      state.combinedId = action.payload.combinedId;
    },
  },
  extraReducers: {
    [searchUser.pending]: (state, action) => {
      state.searchLoading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      state.searchedUsers = action.payload;
      state.searchLoading = false;

      console.log(state.searchedUsers);
    },
    [searchUser.rejected]: (state, action) => {
      state.searchLoading = false;

      state.searchErr = action.payload;
    },
    [createChat.pending]: (state, action) => {
      console.log(action);
    },
    [createChat.fulfilled]: (state, action) => {
      state.combinedId = action.payload;
      console.log(action);
    },
    [createChat.rejected]: (state, action) => {
      console.log(action);
    },
    [getUserChats.pending]: (state, action) => {
      console.log(action);
    },
    [getUserChats.fulfilled]: (state, action) => {
      console.log(action);
    },
    [getUserChats.rejected]: (state, action) => {
      console.log(action);
    },
  },
});
export const { saveCurrent, saveSecUser } = homeSlice.actions;

export default homeSlice.reducer;
