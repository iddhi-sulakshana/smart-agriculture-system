import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getURL } from "../Utils/Url";
import { toast } from "react-toastify";

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
        if (!token) return;
        axios
            .request({
                method: "post",
                url: getURL("users/verify"),
                headers: {
                    "x-auth-token": token,
                },
            })
            .then((res) => {
                setToken(token);
            })
            .catch((err) => {
                localStorage.removeItem("token");
                setToken(null);
                toast.warn("Session expired. Please login again.");
            });
    }, []);
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default () => useContext(UserContext);
