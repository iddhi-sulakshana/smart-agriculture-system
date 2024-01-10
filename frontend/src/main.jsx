import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { SnackBarProvider } from "./contexts/SnackBarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* providers goes here */}
        <BrowserRouter>
            <UserProvider>
                <SnackBarProvider>
                    <App />
                </SnackBarProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>
);
