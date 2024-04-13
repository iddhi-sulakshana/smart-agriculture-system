import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { io } from "socket.io-client";
import { getRootURL } from "../Utils/Url";

const SocketContext = createContext();

// create a provider component to wrap the Chat component
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const { token } = UserContext();

    useEffect(() => {
        if (!token) return;
        if (socket) return;

        const newSocket = connectSocket(token);
        setSocket(newSocket);
        newSocket.on("connect", () => {
            console.log("Socket connected");
            setIsConnected(true);
        });
        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default () => useContext(SocketContext);

const connectSocket = (token) => {
    const socket = io(getRootURL(""), {
        transports: ["websocket", "polling"],
        auth: {
            "x-auth-token": token,
        },
        reconnectionDelay: 500,
    }).on("connect_error", (err) => {
        console.log(`Socket connection error: ${err.message}`);
        console.log(err);
    });
    return socket;
};
