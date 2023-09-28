import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./ContextProvider/SocketProvider";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./Slices/ProductsSclice";

const store = configureStore({
  reducer: {
    products: ProductsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);
