import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/app.scss";
import "bootstrap/dist/css/bootstrap.css";
import UserProvider from "./providers/UserProvider";
import TeamProvider from "./providers/TeamProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
