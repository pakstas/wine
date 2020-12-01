import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import "normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
