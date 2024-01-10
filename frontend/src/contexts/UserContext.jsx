import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

// Create a provider component to wrap the app
export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.error) {
            localStorage.removeItem("token");
            setToken(null);
        }
        if (token) {
            setToken(token);
        }
    }, []);
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default () => useContext(UserContext);
