import { Box, Sheet } from "@mui/joy";
import React, { useEffect, useState } from "react";
import ConversationList from "../components/messages/ConversationList";
import MessagesPane from "../components/messages/MessagesPane";
import { useParams } from "react-router-dom";
import useGetChats from "../hooks/useGetChats";
import SocketContext from "../contexts/SocketContext";

function Chat() {
    const { chats, setChats } = useGetChats();
    const [selectedChat, setSelectedChat] = useState("");
    const { id } = useParams();
    const { socket, isConnected } = SocketContext();
    useEffect(() => {
        if (!isConnected) return;
        socket.on("new_chat", (chat) => {
            let newChats = [...chats, chat];
            newChats.sort((a, b) => {
                if (a.lastMessage.timestamp < b.lastMessage.timestamp)
                    return -1;
                return 1;
            });
            setChats(newChats);
        });
        socket.on("new_message_update_chat_list", (chat) => {
            // replace the chat with the new chat
            let newChats = chats.map((c) => {
                if (c._id === chat._id) return chat;
                return c;
            });
            newChats.sort((a, b) => {
                if (a.lastMessage.timestamp > b.lastMessage.timestamp)
                    return -1;
                return 1;
            });
            setChats(newChats);
        });
        socket.on("delete_chat", (chatId) => {
            let newChats = chats.filter((c) => c._id !== chatId);
            setChats(newChats);
            selectedChat === chatId && setSelectedChat("");
        });
        socket.on("online", (chatId) => {
            let newChats = chats.map((c) => {
                if (c._id === chatId) {
                    c.online = true;
                }
                return c;
            });
            setChats(newChats);
        });
        socket.on("offline", (chatId) => {
            let newChats = chats.map((c) => {
                if (c._id === chatId) {
                    c.online = false;
                }
                return c;
            });
            setChats(newChats);
        });
        return () => {
            socket.off("new_message_update_chat_list");
            socket.off("new_message");
            socket.off("delete_chat");
            socket.off("online");
            socket.off("offline");
        };
    }, [isConnected, chats, selectedChat]);

    useEffect(() => {
        if (id) setSelectedChat(id);
    }, [id]);
    return (
        <Box
            sx={{
                width: "100%",
                justifyContent: "space-between",
                my: 2,
                px: {
                    xs: 0,
                    md: 10,
                },
            }}
        >
            <Sheet
                sx={{
                    flex: 1,
                    width: "100%",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 3fr",
                    },
                    boxShadow: 1,
                }}
            >
                <ConversationList
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    chats={chats}
                />
                <MessagesPane
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    setChats={setChats}
                    chats={chats}
                />
            </Sheet>
        </Box>
    );
}

export default Chat;
