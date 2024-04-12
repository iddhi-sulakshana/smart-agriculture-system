import { Box, Sheet, Stack } from "@mui/joy";
import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useGetMessages from "../../hooks/useGetMessages";
import useGetReciever from "../../hooks/useGetReciever";

function MessagesPane({ selectedChat, setSelectedChat }) {
    const { messages, setMessages } = useGetMessages(selectedChat);
    const { reciever, error } = useGetReciever(selectedChat);

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
            />
        </Sheet>
    );
}

export default MessagesPane;
