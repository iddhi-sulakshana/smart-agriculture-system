import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import theme from "./Utils/Theme.js";
import { CssVarsProvider } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssVarsProvider theme={theme}>
            <BrowserRouter>
                <UserProvider>
                    <App />
                </UserProvider>
            </BrowserRouter>
        </CssVarsProvider>
    </React.StrictMode>
);
