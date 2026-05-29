import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="381608385386-j0565f28nstpef10mcivqk464tes19ef.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
