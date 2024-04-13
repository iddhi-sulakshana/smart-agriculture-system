import { Box, Sheet, Stack } from "@mui/joy";
import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useGetMessages from "../../hooks/useGetMessages";
import useGetReciever from "../../hooks/useGetReciever";
import SocketContext from "../../contexts/SocketContext";

function MessagesPane({ selectedChat, setSelectedChat, setChats, chats }) {
    const { messages, setMessages } = useGetMessages(selectedChat);
    const { reciever, setReciever, error } = useGetReciever(selectedChat);
    const { socket, isConnected } = SocketContext();

    const handleDelete = () => {
        let newChats = chats.filter((chat) => chat._id !== selectedChat);
        setChats(newChats);
        setSelectedChat("");
    };

    useEffect(() => {
        if (!isConnected) return;
        socket.on("new_message", (message) => {
            if (message.chatId === selectedChat) {
                setMessages([...messages, message]);
            }
        });
    }, [selectedChat, isConnected, messages]);

    if (!selectedChat || error) {
        return (
            <Sheet
                sx={{
                    maxHeight: {
                        xs: "80dvh",
                        md: "85dvh",
                    },
                    flexDirection: "column",
                    backgroundColor: "background.level1",
                    display: {
                        xs: selectedChat ? "flex" : "none",
                        md: "flex",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                    }}
                >
                    Select a chat to start messaging
                </Box>
            </Sheet>
        );
    }
    return (
        <Sheet
            sx={{
                maxHeight: {
                    xs: "80dvh",
                    md: "85dvh",
                },
                height: {
                    xs: "80dvh",
                    md: "85dvh",
                },
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            {/* Selected Chat User Details */}
            <ChatHeader
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                reciever={reciever}
                deleteFunc={handleDelete}
                setReciever={setReciever}
            />
            {/* Display Chat Messages */}
            <MessageList
                loading={false}
                messages={messages}
                reciever={reciever}
            />
            {/* Message Input */}
            <MessageInput
                setMessages={setMessages}
                selectedChat={selectedChat}
                messages={messages}
                setChats={setChats}
            />
        </Sheet>
    );
}

export default MessagesPane;
