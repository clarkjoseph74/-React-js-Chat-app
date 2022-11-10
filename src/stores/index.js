import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import home from "./homeSlice";
const store = configureStore({
  reducer: { auth, home },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
