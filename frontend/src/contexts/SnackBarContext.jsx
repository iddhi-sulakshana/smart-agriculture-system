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
        const newColor = state === "success" ? "success" : "danger";
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
