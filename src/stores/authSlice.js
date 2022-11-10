/* eslint-disable default-case */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../Firebase";
import { toast } from "react-toastify";

export const registerWithFirebase = createAsyncThunk(
  "auth/registerWithFirebase",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    return createUserWithEmailAndPassword(
      auth,
      args.user.email,
      args.user.password
    )
      .then(async (userCredential) => {
        const user = userCredential.user;
        const storageRef = ref(
          storage,
          `/users/${user.uid}${args.user.file.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, args.user.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            toast(percent, { progress: percent });
          },
          (error) => {
            // const errorCode = error.code;
            console.log(error);
            const errorMessage = error.code;
            return rejectWithValue(errorMessage);
          },
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              updateProfile(user, {
                displayName: args.user.name,
                photoURL: downloadURL,
              });
              //add to firebase
              setDoc(doc(db, "users", user.uid), {
                name: args.user.name,
                email: args.user.email,
                image: downloadURL,
                uid: user.uid,
              });
              setDoc(doc(db, "usersChats", user.uid), {});
            });
          }
        );
      })
      .catch((error) => {
        // const errorCode = error.code;
        console.log(error);
        const errorMessage = error.code;
        return rejectWithValue(errorMessage);
      });
  }
);

export const loginWithFirebase = createAsyncThunk(
  "auth/loginWithFirebase",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const userCredential = await res.user;
      return userCredential;
    } catch (error) {
      const errorMessage = error.code;
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  extraReducers: {
    // Registration
    [registerWithFirebase.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerWithFirebase.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      toast.success("Register Completed Please Login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(action);
    },
    [registerWithFirebase.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error(state.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    //   LoGIN
    [loginWithFirebase.pending]: (state, action) => {
      console.log(action);
      state.loading = true;
      state.error = null;
    },

    [loginWithFirebase.fulfilled]: (state, action) => {
      toast.success("Login success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    [loginWithFirebase.rejected]: (state, action) => {
      toast.error(state.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
