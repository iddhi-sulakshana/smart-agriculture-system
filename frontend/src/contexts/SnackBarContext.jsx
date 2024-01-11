import React, { createContext, useContext, useEffect, useState } from "react";

const SnackBar = createContext();

// Create a provider component to wrap the app
export function SnackBarProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({
        state: false,
        message: "",
    });
    const showMessage = (state = false, message = "") => {
        // switch case to change the color of the snackbar
        let newColor;
        switch (state) {
            case "success":
                newColor = "success";
                break;
            case "error":
                newColor = "danger";
                break;
            case "warning":
                newColor = "warning";
                break;
            default:
                newColor = "neutral";
        }
        setMessage({ color: newColor, message });
        setOpen(true);
    };
    return (
        <SnackBar.Provider value={{ open, message, showMessage, setOpen }}>
            {children}
        </SnackBar.Provider>
    );
}

export default () => useContext(SnackBar);
