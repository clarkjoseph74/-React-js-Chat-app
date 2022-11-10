import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./stores/index.js";

import App from "./App";
import { AuthContextProvider } from "./context/authContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
